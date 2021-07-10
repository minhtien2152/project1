const Course = require("./models/course.model");
const Instructor = require("./models/instructorModel");
const connectDB = require("./utils/connectDB");
const courses = require("./data/unica_lap_trinh.json");
const ins = require("./data/gv_lt.json");
connectDB();

const importData = async () => {
  try {
    //await Course.deleteMany();
    await Course.insertMany(courses);
    //await Instructor.deleteMany();
    //await Instructor.insertMany(ins);
    console.log("Data imported!");
    process.exit(1);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();
