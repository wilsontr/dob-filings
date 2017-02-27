const express = require("express");
const app = express();
const router = express.Router();
const viewsPath = __dirname + '/views/';
const sassPath = __dirname + '/scss/';
const logger = require('./logger.js');
const sass = require('node-sass');


router.use(function (req, res, next) {
  console.log("/" + req.method);
  next();
});

router.get("/", function (req, res) {
  res.sendFile(viewsPath + "index.html");
});

app.use("/", router);

app.use(express.static('public'));

app.use("*",function (req,res) {
  res.sendFile(viewsPath + "404.html");
});

app.listen(3000, function () {
  logger.info("App listening on port 3000");
});