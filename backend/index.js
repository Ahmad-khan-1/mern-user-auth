const express = require("express");
const ProductRouter = require("./Routes/ProductRouter");
const AuthRouter = require("./Routes/AuthRouter");
const cors = require("cors");
const app = express();

require("dotenv").config();
require("./Models/db");
const PORT = process.env.PORT || 8080;

app.get("/ping", (req, res) => {
  res.send("sever is ok");
});

app.use(express.json());
app.use(cors());
app.use("/auth", AuthRouter);
app.use("/products", ProductRouter);

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
