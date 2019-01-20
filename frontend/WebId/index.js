import * as ecCrypto from 'eccrypto';

const REQUEST_TYPE = {
  HANDSHAKE: 'handshake',
  CARD_PRESENT_STATUS: 'cardPresentStatus',
  VIEW_AVAILABLE_DATA: 'viewAvailableData',
  DATA: 'data',
};

class WebID {

  constructor(webSocketUrl = 'ws://192.168.51.154:6969/websocket/msg') {

    this.webSocketUrl = webSocketUrl;
    this.webSocket = new WebSocket(webSocketUrl);
    this.setListeners();
    this.activeRequest = false;
    this.request = { cmd: null, resolve: null, reject: null };
    this.isCardPresent = { callback: null };

  }

  parseEventData(event) {
    return JSON.parse(event.data);
  }

  isCardPresentListener(cb) {
    this.isCardPresent.callback = cb;
  }

  setListeners() {
    this.webSocket.onmessage = (event) => {
      const data = this.parseEventData(event);
      if (event.cmd === REQUEST_TYPE.CARD_PRESENT_STATUS) {
        this.isCardPresent.callback !== null && this.isCardPresent.callback(event.msg); // eslint-disable-line
      } else {
        this.getResponse(data.cmd, data.msg, data.signature);
      }
    };
    this.webSocket.onclose = () => {
      setTimeout(() => {
        this.webSocket = new WebSocket(this.webSocketUrl);
      }, 5000);
    };
  }

  sign(cb) {
    // todo on java library
    return this.login(cb);
  }

  login(cb) {
    this.sendRequest(REQUEST_TYPE.HANDSHAKE, null).then((handshakeDataResponse) => {
      console.log(handshakeDataResponse);
      const signData = handshakeDataResponse.message;
      const signSignature = handshakeDataResponse.signature;
      const signCertificate = handshakeDataResponse.message.shortCert;
      cb(null, { signData, signSignature, signCertificate });
    }).catch((err) => {
      cb(err, null);
    });
  }

  /*
  async register() {
    try {
      // todo verification long certificate
      const handshakeDataResponse = await this.sendRequest(REQUEST_TYPE.HANDSHAKE, null);
      const loginData = handshakeDataResponse.message;
      const loginSignature = handshakeDataResponse.signature;
      const loginCertificate = handshakeDataResponse.message.shortCert;
      const availableDataResponse = await this.sendRequest(REQUEST_TYPE.VIEW_AVAILABLE_DATA, null);
      console.log(availableDataResponse);
      const availableData = availableDataResponse.message;
      const receivedDataResponse = await this.sendRequest(REQUEST_TYPE.DATA, availableData);
      const receivedData = receivedDataResponse.message;
      return Promise.resolve({
        loginData, loginSignature, loginCertificate, receivedData,
      });
    } catch (err) {
      return Promise.reject(err);
    }
  }
*/
  getResponse(command, message, signature) {
    this.activeRequest = false;
    const { cmd, resolve, reject } = this.request;
    if (cmd === command) {
      resolve && resolve({ message, signature }); // eslint-disable-line
    } else {
      reject && reject(new Error('invalid command')); // eslint-disable-line
    }
  }

  sendRequest(cmd, msg) {
    return new Promise((resolve, reject) => {
      if (this.activeRequest) {
        reject(new Error('Other pending request...'));
      }
      this.activeRequest = true;
      this.request = { cmd, resolve, reject };
      this.webSocket.send(JSON.stringify({ cmd, msg }));
      this.setTimeout(resolve, reject, 1000);
    });
  }

  setTimeout(resolve, reject, timeout) {
    setTimeout(() => {
      this.activeRequest = false;
      this.request.resolve = null;
      this.request.reject = null;
      this.request.cmd = null;
      resolve({ msg: null, signature: null });
      // todo reject
    }, timeout);
  }

  validateMessage(message, signature) {
    // todo signing on java client
    return new Promise((resolve, reject) => {
      const publicKey = message.publicKey;// eslint-disable-line
      const signedMessage = JSON.stringify(message);
      const bufferedMessage = Buffer.from(signedMessage, 'utf8');
      ecCrypto.verify(publicKey, bufferedMessage, signature)
        .then(() => resolve())
        .catch(() => reject(new Error('Can not verify message')));// eslint-disable-line
    });
  }

}

export default WebID;
