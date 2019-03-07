const settings = require("../models/hookSettings")

module.exports = io => {

    io.on('connection', client => {
        console.log('websocket is connected')
        client.on("boolean", async data => {
          console.log(data, "från clienten")
          let currentRepo = await settings.findOne({ belongsTo: data.belongs })
          if (!currentRepo) {
            new settings({
              bool: data.boolean,
              belongsTo: data.belongs
            }).save()
          } else {
            await settings.findOneAndUpdate(
              { belongsTo: data.belongs },
              { $set: { bool: data.boolean } }
            )
          }
          // console.log(notificationSetting)
        })
        client.on('sendData', () => {
      
          settings.find({}, (err, result) => {
            if (err) {
              console.log(err)
            } else {
              let arr = []
              result.forEach(element => {
                console.log(element.bool)
                arr.push({bool: element.bool, belongsTo: element.belongsTo})
              })
              console.log(arr)
              client.emit("setSettings", arr)
            }
          })
        })
      })

}
