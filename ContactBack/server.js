const express = require("express");
const cors = require("cors");
const env = require("dotenv").config();
const mongoose = require("mongoose");
const crypto = require("crypto");
const bodyParser = require("body-parser");
const routes = require("./api/routes/contactListRoutes");
Contact = require("./api/models/contactListModel");
User = require("./api/models/userModel");
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

console.log(process.env.MONGODB_URI);
mongoose.connect(
  process.env.MONGODB_URI,
  {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  function (error) {
    if (error) {
      console.error("Error connecting to MongoDB:", error);
    } else {
      console.log(
        "Successfully connected to " + process.env.DB_NAME + " database."
      );
    }
  }
);

routes(app);

app.listen(port, () => {
  console.log("ContactList started on port:", port);
});
