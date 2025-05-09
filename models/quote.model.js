const { model, Schema } = require("mongoose");

const QuoteSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: Number, required: true },
  altMobile: { type: Number, required: true },
  gender: { type: String, required: true, enum: ["Mr.", "Mrs.", "other" , "Ms."] },
  company: { type: String, required: true },
  landmark: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  postalCode: { type: String },
  deliveryDate: { type: Date },
  products: { type: Array, default: [] },
});

const QuoteModel = new model("nature-sovagen-quote-model", QuoteSchema);

module.exports = QuoteModel;
