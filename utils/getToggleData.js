const settings = require("../models/hookSettings")
const setUpHook = require("../utils/setUpHook")
const removeHook = require("../utils/removeHook")
module.exports = client => {
  client.on("boolean", async data => {
    let currentRepo = await settings.find({ belongsTo: data.belongs })
    if(currentRepo.length >= 1) {
    
      currentRepo.forEach(async element => {
        if(element.belongsTo === data.belongs) {
          console.log('update')
          await settings.findOneAndUpdate(
            { belongsTo: data.belongs },
            { $set: { bool: data.boolean } }
            )
          }
        })
      } else {
        console.log('add')
          new settings({
            bool: data.boolean,
            belongsTo: data.belongs,
            hook: data.hook,
            currentUser: data.username
          }).save()
      }

    if (data.boolean === true) {
      setUpHook(data)

    } else {
      removeHook(data)
    }
  })
}
