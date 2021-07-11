const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");
const xss = require("xss-clean");
const helmet = require("helmet");
const path = require("path");
const rateLimit = require("express-rate-limit");
const expressMongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");

const app = express();

const globalErrHandler = require("./controllers/errorController");
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");
const commentRoutes = require("./routes/commentRoutes");
const pageRoutes = require("./routes/pageRoutes");
const crawlRoutes = require("./routes/crawlRoutes");
const instructorRoutes = require("./routes/instructorRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const chatbotRoutes = require("./routes/chatbotRoutes");

const AppError = require("./utils/appError");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Allow Cross-Origin requests
app.use(cors());

// Set security HTTP headers
app.use(helmet());

// const limiter = rateLimit({
//   max: 150,
//   windowMs: 60 * 60 * 1000,
//   message: "Too Many Request from this IP, please try again in an hour",
// });
//app.use("/api", limiter);

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
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, "file-" + Date.now() + path.extname(file.originalname));
  },
});

var upload = multer({ storage: storage });

app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/pages", pageRoutes);
app.use("/api/crawl", crawlRoutes);
app.use("/api/instructors", instructorRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/chatbot", chatbotRoutes);

app.post("/api/uploadfile", upload.single("file"), (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }
  res.json({ filename: file.filename });
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

app.use("/cdn", express.static("uploads"));

// handle undefined Routes
app.use("*", (req, res, next) => {
  const err = new AppError(404, "fail", "undefined route");
  next(err, req, res, next);
});
app.on("uncaughtException", (err) => {
  console.log(`Uncaught Exception: ${err.message}`);
  process.exit(1);
});
app.use(globalErrHandler);

module.exports = app;
