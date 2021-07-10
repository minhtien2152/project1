const ins = require("./unica_lt_2.json");
const fs = require("fs");

const page = "60ade70b729a94002641b7a7";
const category = "60d9e2185762260033499817";

const newdata = ins.map((x) => {
  return {
    ...x,
    thumbnail: { type: "link", value: x.thumbnail },
    page,
    category,
    currency: "vnd",
    media: {
      type: x.media.type === "video" ? "video_link" : "img_link",
      value: x.media.url,
    },
  };
});

fs.writeFileSync("unica_lt_2.json", JSON.stringify(newdata), (err) => {
  if (err) console.log(err);
});
