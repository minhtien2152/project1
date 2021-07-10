const ins = require("./info_gv_lt.json");
const fs = require("fs");

const page = "60ade70b729a94002641b7a7";
const newdata = ins.map((x) => {
  return { ...x, page };
});

fs.writeFileSync("info_gv_lt.json", JSON.stringify(newdata), (err) => {
  if (err) console.log(err);
});
