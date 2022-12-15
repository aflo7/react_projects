const mongoose = require("mongoose");
const { Schema } = mongoose;

const ItemSchema = new Schema({
  name: String,
  desc: String,
  price: String
})

ItemSchema.virtual('id').get(function () {
  return this._id
})

// Compile model from schema
module.exports = mongoose.model("Item", ItemSchema)
