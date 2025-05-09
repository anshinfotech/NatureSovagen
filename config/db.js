const { connect } = require("mongoose");
require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;

async function dbConnection() {
  try {
    await connect(`${MONGO_URI}`);
    console.log("Database connected successfully");
  } catch (error) {
    console.log('Error Occred in connecting with database : ' + error.message)
  }
}

module.exports = dbConnection;
