const { Schema, model } = require("mongoose");
const { schema } = require("./user.model");

const ContactSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: Number, required: true },
  subject: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  message: { type: String, required: true, max: 500 },
});

const ContactModel = new model("nature-sovagen-contact-model", ContactSchema);

module.exports = ContactModel;
