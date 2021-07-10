const withThumb = require("./unica_tin_hoc_van_phong.json");
const noThumb = require("./unica_tin_hoc_van_phong_2.json");
const fs = require("fs");
const newdata = noThumb.map((course) => {
  for (let i = 0; i < withThumb.length; i++)
    if (course.url === withThumb[i].url)
      return { ...course, thumbnail: withThumb[i].thumbnail };
});

fs.writeFileSync(
  "unica_tin_hoc_van_phong_3.json",
  JSON.stringify(newdata),
  (err) => {
    if (err) console.log(err);
  }
);
