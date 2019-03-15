const User = require("../models/user")
module.exports = async (io, user) => {
    console.log(user)
    let findMail = await User.findOne({username: user})
    console.log(findMail.mail, 'this is mail')
    io.to(findMail.socketId).emit('AlreadyHaveMail', findMail.mail)
}