const Course = require("./models/course.model");
const Instructor = require("./models/instructorModel");
const connectDB = require("./utils/connectDB");
const courses = require("./data/unica_lap_trinh.json");
const fs = require("fs");

(async () => {
  await connectDB();
  const info = await Promise.all(
    courses.map(async (course) => {
      console.log(course.instructor);
      const ins = await Instructor.findOne({ url: course.instructor });
      //console.log(ins);
      if (ins)
        return {
          ...course,
          instructor: ins._id,
        };
      else return;
    })
  );

  fs.writeFileSync(
    "./data/unica_lap_trinh.json",
    JSON.stringify(info),
    (err) => {
      if (err) console.log(err);
    }
  );
  process.exit(1);
})();

// const importData = async () => {
//   try {
//     await connectDB();
//     const info = await Promise.all(
//       courses.map(async (course) => {
//         console.log(course.instructor);
//         const ins = await Instructor.find({ url: course.instructor });
//         if (ins)
//           return {
//             ...course,
//             instructor: ins._id,
//           };
//         else return;
//       })
//     );
//     console.log(info);
//     console.log("Data imported!");
//     process.exit(1);
//   } catch (error) {
//     console.error(error);
//     process.exit(1);
//   }
// };

// importData();
