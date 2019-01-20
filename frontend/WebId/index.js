import * as ecCrypto from 'eccrypto';

const REQUEST_TYPE = {
  HANDSHAKE: 'handshake',
  CARD_PRESENT_STATUS: 'cardPresentStatus',
  READER_PRESENT_STATUS: 'readerPresentStatus',
  VIEW_AVAILABLE_DATA: 'viewAvailableData',
  DATA: 'data',
};

class WebID {

  constructor(webSocketUrl = 'ws://192.168.51.154:6969/websocket/msg') {
    this.webSocketUrl = webSocketUrl;
    this.webSocket = new WebSocket(webSocketUrl);
    this.setListeners();
    this.activeRequest = false;
    this.requests = { cmd: null, resolve: null, reject: null };
    this.isCardPresent = { callback: null };
    this.isReaderPresent = { callback: null };
    this.isCardPresentBoolean = false;
    this.isReaderPresentBoolean = false;
  }

  parseEventData(event) {
    return JSON.parse(event.data);
  }

  isCardPresentListener(cb) {
    this.isCardPresent.callback = cb;
  }

  isReaderPresentListener(cb) {
    this.isReaderPresent.callback = cb;
  }

  setListeners() {
    this.webSocket.onmessage = (event) => {
      const data = this.parseEventData(event);
      if (data.cmd === REQUEST_TYPE.CARD_PRESENT_STATUS) {
        this.isCardPresent.callback !== null && this.isCardPresent.callback(data.msg); // eslint-disable-line
      } else if (data.cmd === REQUEST_TYPE.READER_PRESENT_STATUS) {
          this.isReaderPresent.callback !== null && this.isReaderPresent.callback(data.msg); // eslint-disable-line
      } else {
        this.getResponse(data.cmd, data.msg, data.signature);
      }
      this.webSocket.onclose = () => {
        setTimeout(() => {
          this.webSocket = new WebSocket(this.webSocketUrl);
        }, 5000);
      };
    };
  }

  sign(cb) {
    // todo on java library
    return this.login(cb);
  }

  login(cb) {
    this.sendRequest(REQUEST_TYPE.HANDSHAKE, null).then((handshakeDataResponse) => {
      const signData = handshakeDataResponse.message;
      const { signature } = handshakeDataResponse;
      const signCertificate = handshakeDataResponse.message.shortCertBase64;
      cb(null, { signData, signature, signCertificate });
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

  sendRequest(cmd, msg, activeRequest = true) {
    return new Promise((resolve, reject) => {
      if (this.activeRequest) {
        reject(new Error('Other pending request...'));
      }
      if (activeRequest) {
        this.activeRequest = true;
      }
      this.request = { cmd, resolve, reject };
      this.webSocket.send(JSON.stringify({ cmd, msg }));
      this.setTimeout(resolve, reject, 60000);
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
