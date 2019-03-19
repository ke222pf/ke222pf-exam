const User = require("../models/user")
module.exports = async (io, user) => {
    let findMail = await User.findOne({username: user})
    io.to(findMail.socketId).emit('AlreadyHaveMail', findMail.mail)
}