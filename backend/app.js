const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors")
const xss = require('xss-clean');
const helmet = require("helmet")
const path = require('path');
const rateLimit = require("express-rate-limit");
const expressMongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");

const app = express();

const globalErrHandler = require('./controllers/errorController');
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
const AppError = require('./utils/appError');



app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));



// Allow Cross-Origin requests
app.use(cors());

// Set security HTTP headers
app.use(helmet());

const limiter = rateLimit({
  max: 150,
  windowMs: 60 * 60 * 1000,
  message: 'Too Many Request from this IP, please try again in an hour'
});
app.use('/api', limiter);

// Data sanitization against Nosql query injection
app.use(expressMongoSanitize());

// Data sanitization against XSS(clean user input from malicious HTML code)
app.use(xss());

// Prevent parameter pollution
app.use(hpp());

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

app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);

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

// handle undefined Routes
app.use('*', (req, res, next) => {
  const err = new AppError(404, 'fail', 'undefined route');
  next(err, req, res, next);
});

app.use(globalErrHandler);

module.exports = app;
