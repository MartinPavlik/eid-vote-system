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
  }

  login(cb) {
    if (this.webSocket.readyState === 1) {
      console.log('try to login');
      const wsMessage = { cmd: 'handshake', msg: {} };
      this.webSocket.send(JSON.stringify({ ...wsMessage }));
      this.handshakeCallback = cb;
    } else {
      console.log('connection error');
      cb({ msg: 'connection error', readyState: this.webSocket.readyState }, null, null);
    }
  }

  getData(data = ['cardID', 'dokState', 'DokTryLimit', 'DokMaxTryLimit', 'iokState', 'IokMaxTryLimit', 'IokTryLimit', 'serialNumber', 'documentNumber', 'CN', 'surName', 'givenName', 'street', 'locality', 'state', 'country'], cb) {
    // testWhichIsNotImplemented
    if (this.webSocket.readyState === 1) {
      console.log('try to get data');
      const wsMessage = { cmd: 'get-date', msg: data };
      this.webSocket.send(JSON.stringify({ ...wsMessage }));
      this.getDataCallback = cb;
    } else {
      console.log('connection error');
      cb({ msg: 'connection error', readyState: this.webSocket.readyState }, null, null);
    }
  }

  handshake(message, signature) {
    this.validateMessage(message, signature)
      .then(() => this.handshakeCallback && this.handshakeCallback(null, message, signature))
      .catch((err) => this.handshakeCallback && this.handshakeCallback(err, null, null));
  }

  data(message, signature) {
    this.validateMessage(message, signature)
      .then(() => this.getDataCallback && this.getDataCallback(null, message, signature))
      .catch((err) => this.getDataCallback && this.getDataCallback(err, null, null));
  }

  listenToStatusChange(cb) {
    this.statusChangeCallback = cb;
  }

  parseEventData(event) {
    console.log(event);
    const data = JSON.parse(event.data);
    return data;
  }

  setListeners() {
    this.webSocket.onmessage = (event) => {
      const data = this.parseEventData(event);
      console.log(data);
      switch (data.cmd) {
        case 'handshake':
          this.handshake(data.msg, data.signature);
          break;
        case 'data':
          // todo
          this.data(data.msg, data.signature);
          break;
        case 'card-present-status':
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
      console.log('validation');
      const publicKey = message.publicKey;// eslint-disable-line
      const signedMessage = JSON.stringify(message);
      const bufferedMessage = Buffer.from(signedMessage, 'utf8');
      ecCrypto.verify(publicKey, bufferedMessage, signature)
        .then(() => resolve(true))
        .catch(() => reject(false));// eslint-disable-line
    });
  }

}

export default WebID;
