import openSocket from "socket.io-client"
let socket
export const socketConnection = () => {
    if (!socket) {
    socket = openSocket("http://localhost:5000") 
  }
  return socket
}
