export const toggelData = (socket, username, cb) => {
  socket.emit("sendData",  username)
  socket.on("setSettings", cb)
}