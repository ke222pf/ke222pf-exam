export const checkMail = (socket, cb) => {
    socket.on('AlreadyHaveMail', cb)
  }