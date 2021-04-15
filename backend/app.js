const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require('path');
const app = express();

const MongoClient = require('mongodb').MongoClient


app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, "file-" + Date.now() + path.extname(file.originalname));
  },
});

var upload = multer({ storage: storage });

app.post("/uploadfile", upload.single("myFiles"), (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }
  res.send(file);
});

//Uploading multiple files
app.post("/uploadmultiple", upload.array("files", 12), (req, res, next) => {
  const files = req.files;
  if (!files) {
    const error = new Error("Please choose files");
    error.httpStatusCode = 400;
    return next(error);
  }
  res.send(files);
});

app.listen(3000, () => console.log("Server started on port 3000"));
