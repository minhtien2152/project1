const courses = require("./data/ngoai_ngu_2.json");
const fs = require("fs");

// const newdata = courses.map((course) => {
//   return course.url;
// });

// fs.writeFileSync(
//   "./data/ngoai_ngu_ins_link.json",
//   JSON.stringify(newdata),
//   (err) => {
//     if (err) console.log(err);
//   }
// );
console.log(courses.length);
