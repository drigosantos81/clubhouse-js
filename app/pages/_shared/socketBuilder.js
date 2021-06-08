import { constants } from "./constants";

export default class SocketBuilder {
  constructor({ socketUrl, namespace }) {
    this.socketUrl = `${socketUrl}/${namespace}`;
    
    this.onUserConnected = () => {}
    this.onUserDisconnected = () => {}
  }

  setOnUserConnected(fn) {
    this.onUserConnected = fn;

    return this;
  }

  setOnUserDisconnected(fn) {
    this.onUserDisconnected(fn);

    return this;
  }

  build() {
    const socket = globalThis.importScripts.connect(this.socketUrl, {
      withCredentials: false
    });

    socket.on('connection', () => console.log('Conectei!'));

    socket.on(constants.events.USER_CONNECTED, this.onUserConnected);
    socket.on(constants.events.USER_DISCONNECTED, this.onUserDisconnected);

    return socket;
  }
}