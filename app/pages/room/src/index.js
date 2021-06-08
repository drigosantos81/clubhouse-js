import { constants } from "../../_shared/constants.js"
import SocketBuilder from "../../_shared/socketBuilder.js"

const socketBuilder = new SocketBuilder({
  socketUrl: constants.socketUrl,
  namespace: constants.socketNamespaces.room
});

const socket = socketBuilder
  .setOnUserConnected((user) => console.log('User connected!', user))
  .setOnUserDisconnected((user) => console.log('User disconnected!', user))
  .build();

const room = {
  id: Date.now(),
  topic: 'JS Expert!'
}

const user = {
  img: 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-256.png',
  username: 'Rodrigo Emanuel'
}

socket.emit(constants.events.JOIN_ROOM, { user, room });