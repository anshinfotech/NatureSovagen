const mongoose = require("mongoose");
function dbConnection() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Db Connected"))
    .catch((err) => console.log(err));
}

module.exports = dbConnection;