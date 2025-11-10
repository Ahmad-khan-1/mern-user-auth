const mongoose = require("mongoose");

const mongo_url = process.env.MONGO_URI;

mongoose
  .connect(mongo_url)
  .then(() => {
    console.log("Mongodb is connected ");
  })
  .catch((err) => {
    console.log("Mongodb is not connected", err);
  });
