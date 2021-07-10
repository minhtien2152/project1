const courses = require("./unica_lt_2.json");
const fs = require("fs");

const newdata = courses.map((course) => {
  return course.instructor;
});

fs.writeFileSync("gv_lt_link.json", JSON.stringify(newdata), (err) => {
  if (err) console.log(err);
});
console.log(courses.length);
