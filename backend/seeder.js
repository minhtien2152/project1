
const Course= require ("./models/course.model");

const connectDB =  require ("./utils/connectDB");
const courses =require ("./data/unica1.json")


connectDB();

const importData = async () => {
  try {
    
    await Course.deleteMany();
    await Course.insertMany(courses);
    console.log("Data imported!");
    process.exit(1);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();
