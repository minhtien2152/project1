const courses = require("./unica1.json");
const fs = require("fs");

const result = courses.map((course) => {
  let newPrice = course.price.split(",");
  newPrice = newPrice.join("");
  newPrice = newPrice.split("đ")[0];
  newPrice = parseInt(newPrice);
  let { price, ...newCourse } = course;
  return { ...newCourse, price: newPrice };
});

console.log(result);
fs.writeFileSync("unica2.json", JSON.stringify(result), (err) => {
  if (err) console.log(err);
});
