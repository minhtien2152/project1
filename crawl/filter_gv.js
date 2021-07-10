const fs = require("fs");
//const links = require("./ngoai_ngu_ins_link.json");
const links = require("./gv_lt_link.json");
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
console.log(links.length);
const unique = links.filter(onlyUnique);
console.log(unique.length);
fs.writeFileSync("gv_lt_link_u.json", JSON.stringify(unique), (err) => {
  if (err) console.log(err);
});
