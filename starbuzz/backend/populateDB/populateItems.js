const Item = require("../models/Item")
const mongoose = require("mongoose")
const async = require("async")

mongoose.set('strictQuery', false)
const devDatabase = devDB
const mongoDB = devDatabase;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

function createItems() {
  const x = new Item({
    name: "House Blend",
    desc: "A smooth, mild blend of coffee",
    price: 1.49
  })

  const y = new Item({
    name:"Mocha Caffe Latte",
    desc: "Espresso, steamed with milk and chocolate syrup",
    price: 2.35
  })

  const z = new Item({
    name:"Cappucino",
    desc: "A mixture of espresso, steamed milk, and milk foam",
    price: 1.89
  })

  const a = new Item({
    name: "Chai Tea",
    desc: "A drink made with black tea, milk, and honey",
    price: 1.85
  })


  async.parallel(
    {
      1: function (cb) {
        x.save(cb)
      },
      2: function (cb) {
        y.save(cb)
      },
      3: function (cb) {
        z.save(cb)
      },
      4: function (cb) {
        a.save(cb)
      }
    },
    function (err, result) {
      if (err) {
        return console.error(err)
      }

      console.log("success")
    }
  )
}

createItems()