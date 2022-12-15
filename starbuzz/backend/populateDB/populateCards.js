const Card = require("../models/Card")
const mongoose = require("mongoose")
const async = require("async")

mongoose.set("strictQuery", false)
const devDatabase =
  "mongodb+srv://florand:November123@cluster0.eo8nhct.mongodb.net/starbuzz_dev?retryWrites=true&w=majority"
const mongoDB = devDatabase
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })

function createItems() {
  const a = new Card({
    num: 1234123412341234,
    amt: 15
  })
  const b = new Card({
    num: 1111111111111111,
    amt: 10
  })
  const c = new Card({
    num: 2222222222222222,
    amt: 10
  })

  async.parallel(
    {
      1: function (cb) {
        a.save(cb)
      },
      2: function (cb) {
        b.save(cb)
      },
      3: function (cb) {
        c.save(cb)
      }
    },
    function (err, result) {
      if (err) {
        mongoose.connection.close()
        return console.error(err)
      }

      console.log("success")
      mongoose.connection.close()
    }
  )
}

createItems()
