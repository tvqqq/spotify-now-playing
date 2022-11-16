require("dotenv").config();
const serverless = require("serverless-http");
const express = require("express");
const app = express();

// api json
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// cors
const cors = require("cors");
app.use(cors());

// lodash
const _ = require("lodash");
global._ = _;

// routes
const routes = require("./routes");
app.use("/", routes);

const slsHandler = serverless(app);

module.exports = {
  serverless: slsHandler,
  default: app,
};
