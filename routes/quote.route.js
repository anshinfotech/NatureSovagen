const {
  newQuoteController,
  getAllQuotes,
  getSingleQuote,
} = require("../controllers/quote.controller");
const isAuthenticated = require("../middlewares/isAuthenticated");

const QuoteRouter = require("express").Router();

QuoteRouter.post("/new_quote", newQuoteController);
QuoteRouter.get("/all_quotes", getAllQuotes);
QuoteRouter.get("/get_single_quote/:id", getSingleQuote);
QuoteRouter.get("/single-quote/", isAuthenticated, (req, res) => {
  res.render("SingleQuote");
});
QuoteRouter.get("/bookings-data", isAuthenticated, (req, res) => {
  res.render("AllBookings");
});

module.exports = QuoteRouter;
