const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 8080;
const dbConnection = require("./config/db");
const productRouter = require("./routes/product.route");
const authROuter = require("./routes/auth.route");
const ContactRouter = require("./routes/contact.route");
const QuoteRouter = require("./routes/quote.route");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api", productRouter);
app.use("/api/auth", authROuter);
app.use("/api/contact", ContactRouter);
app.use("/api/quotes", QuoteRouter);


//Database calling
dbConnection();

//pages rendering routes

app.get("/", (req, res) => {
  // res.render("index");
  res.render("home");
});
app.get("/naturesovagen/v1/about", (req, res) => {
  res.render("about");
});
app.get("/naturesovagen/v1/contact", (req, res) => {
  res.render("contact");
});
app.get("/naturesovagen/v1/get-a-quote", (req, res) => {
  res.render("GetQuote");
});

app.listen(port, () => {
  console.log(`NatureSovagen Server is running at http://localhost:${port}`);
  dbConnection();
});
