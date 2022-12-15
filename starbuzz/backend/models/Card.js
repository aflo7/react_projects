const mongoose = require("mongoose");
const { Schema } = mongoose;

const CardSchema = new Schema({
  num: {type: Number, unique: true, dropDups: true, required: true},
  amt: {type: Number, required: true}
})

CardSchema.virtual('id').get(function () {
  return this._id
})

// Compile model from schema
module.exports = mongoose.model("Card", CardSchema)
