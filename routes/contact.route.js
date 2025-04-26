const {
  contactMessage,
  viewAllContacts,
  viewSingleContacts,
} = require("../controllers/contact.controller");
const isAuthenticated = require("../middlewares/isAuthenticated");

const ContactRouter = require("express").Router();

ContactRouter.post("/send_message", contactMessage);
ContactRouter.get("/all_messages", viewAllContacts);
ContactRouter.get("/single_message/:id", viewSingleContacts);
ContactRouter.get("/contacts-data", isAuthenticated, (req, res) => {
  res.render("ContactData");
});
ContactRouter.get("/single-contact", isAuthenticated, (req, res) => {
  res.render("SingleContact");
});

module.exports = ContactRouter;
