const express = require("express");
const app = express();
const router = express.Router();
const viewsPath = __dirname + '/views/';
const sassPath = __dirname + '/scss/';
const logger = require('./logger.js');
const sass = require('node-sass');


router.use((req, res, next) => {
  console.log("/" + req.method);
  next();
});

app.use("/", router);

router.use("/api", require("./api.js"));

router.get("/", (req, res) => {
  res.sendFile(viewsPath + "index.html");
});

app.use(express.static('public'));

app.use("*", (req,res) => {
  res.sendFile(viewsPath + "404.html");
});

app.listen(3000, () => {
  logger.info("App listening on port 3000");
});