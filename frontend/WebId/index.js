import * as ecCrypto from 'eccrypto';

const webSocketUrl = 'ws://192.168.51.154:8080/websocket/msg';

class WebID {

  constructor() {
    this.webSocket = new WebSocket(webSocketUrl);
    this.setListeners();
    this.handshakeData = null;
    this.message = null;
    this.signature = null;
    this.handshakeCallback = null;
    this.getDataCallback = null;
    this.statusChangeCallback = null;
    this.getPossibleDataCallback = null;
  }

  login(cb) {
    if (this.webSocket.readyState === 1) {
      const wsMessage = { cmd: 'handshake', msg: {} };
      this.webSocket.send(JSON.stringify({ ...wsMessage }));
      this.handshakeCallback = cb;
    } else {
      cb({ msg: 'connection error', readyState: this.webSocket.readyState }, null, null);
    }
  }

  getData(cb) {
    if (this.webSocket.readyState === 1) {
      this.getPossible((err, msg /* signature */) => {
        if (err) {
          console.log(err);
          cb({ msg: 'connection error', readyState: this.webSocket.readyState }, null, null);
        }
        const wsMessage = { cmd: 'getData', msg };
        this.webSocket.send(JSON.stringify({ ...wsMessage }));
        this.getDataCallback = cb;
      });
    } else {
      cb({ msg: 'connection error', readyState: this.webSocket.readyState }, null, null);
    }
  }

  getPossible(cb) {
    if (this.webSocket.readyState === 1) {
      const wsMessage = { cmd: 'viewAvailableData', msg: null };
      this.webSocket.send(JSON.stringify({ ...wsMessage }));
      this.getPossibleDataCallback = cb;
    } else {
      cb({ msg: 'connection error', readyState: this.webSocket.readyState }, null, null);
    }
  }

  validate(message, signature, cb) {
    this.validateMessage(message, signature)
      .then(() => cb !== null && cb(null, message, signature))
      .catch((err) => cb !== null && cb(err, null, null));
  }

  confirmMessage(message, signature, cb) {
    if (cb) {
      cb(null, message, signature);
    } else {
      // cb(new Error('callback error'), null, null);
    }
  }

  isCardPresentListener(cb) {
    this.statusChangeCallback = cb;
  }

  parseEventData(event) {
    return JSON.parse(event.data);
  }

  setListeners() {
    this.webSocket.onmessage = (event) => {
      const data = this.parseEventData(event);
      console.log(data);
      switch (data.cmd) {
        case 'handshake':
          this.confirmMessage(data.msg, data.signature, this.handshakeCallback);
          break;
        case 'data':
          this.validate(data.msg, data.signature, this.getDataCallback);
          break;
        case 'viewAvailableData':
          this.confirmMessage(data.msg, data.signature, this.getPossibleDataCallback);
          break;
        case 'cardPresentStatus':
          this.statusChangeCallback && this.statusChangeCallback(data.msg); // eslint-disable-line
          break;
        default:
          console.log('unknown cmd');
      }
    };
    this.webSocket.onclose = (event) => {
      console.log(event);
      setTimeout(() => {
        this.webSocket = new WebSocket(webSocketUrl);
      }, 5000);
    };
  }

  validateMessage(message, signature) {
    return new Promise((resolve, reject) => {
      const publicKey = message.publicKey;// eslint-disable-line
      const signedMessage = JSON.stringify(message);
      const bufferedMessage = Buffer.from(signedMessage, 'utf8');
      ecCrypto.verify(publicKey, bufferedMessage, signature)
        .then(() => resolve(true))
        .catch(() => reject(new Error('Can not verify message')));// eslint-disable-line
    });
  }

}

export default WebID;
