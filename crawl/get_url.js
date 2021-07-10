const courses = require("./unica_lap_trinh.json");
const fs = require("fs");

const newdata = courses.map((course) => {
  return course.url;
});

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

const unique = newdata.filter(onlyUnique);

const data = unique.map((course) => {
  for (let i = 0; i < courses.length; i++)
    if (course === courses[i].url) return courses[i];
});

fs.writeFileSync("unica_lt.json", JSON.stringify(data), (err) => {
  if (err) console.log(err);
});
console.log(data.length);
