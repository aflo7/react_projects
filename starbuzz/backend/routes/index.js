var express = require("express")
var router = express.Router()
const Item = require("../models/Item")
const Card = require("../models/Card")

// everything here starts with /
/* GET home page. */
// router.get("/", function (req, res, next) {
//   res.send("i am backend")
// })

// get all items available for purchase, from the database
router.get("/all_items", function (req, res, next) {
  Item.find({}, function (err, items) {
    res.send(items)
  })
})

router.post("/place_order", function (req, res) {
  const card_num = req.body.card_number
  const total_order_cost = req.body.total_order_cost
  console.log(card_num)
  console.log(total_order_cost)

  Card.findOne({num: card_num}, 'num amt', function(err,result) {
    if (err) {
      return res.send({card_exists: false, msg: "Card does not exist"})
    }

    // if total_order_cost is greater than the amt on the card, return
    if (result.amt < total_order_cost) {
      return res.send({card_exists: true, insufficient_funds: true, msg:"Sorry, insufficient funds"})
    }

    // actually place the order
    result.amt -= total_order_cost
    result.save()
    res.send({card_exists: true, new_card_amt: result.amt, insufficient_funds: false, msg:"Order placed successfully"})
  })

})

module.exports = router
