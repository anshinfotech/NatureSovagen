const { connect } = require("mongoose");
require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;

async function dbConnection() {
  try {
    await connect(`${MONGO_URI}`);
    console.log("Database connected successfully" + MONGO_URI);
  } catch (error) {
    console.log('Error Occred in connecting with database : ' + error.message + MONGO_URI)
  }
}

module.exports = dbConnection;
