const courses = require("./data/ngoai_ngu_2.json");
//const gvs = require("./data/gv_nn.json");
const links = require("./data/nn_link.json");
const fs = require("fs");

const ngoai_ngu = "60ae305af3ed0b020e82ac46";
const page = "60ade70b729a94002641b7a7";

const newdata = courses.map((course, i) => {
  return {
    ...course,
    instructor: links[i],
  };
});

// const newdata = gvs.map((gv) => {
//   return {
//     ...gv,
//     page: page,
//     avatar: {
//       type: "link",
//       value: gv.url === gv.avatar ? "" : gv.avatar,
//     },
//   };
// });

// const newdata = courses.map((course) => {
//   let media;
//   if (course.media.type === "video") {
//     media = {
//       type: "video_link",
//       value: course.media.url,
//     };
//   } else {
//     media = {
//       type: "img_link",
//       value: course.media.url,
//     };
//   }
//   let knowledge;
//   knowledge = course.knowledge.split("\n");
//   knowledge = knowledge
//     .map((kn) => {
//       return "✔️ " + kn;
//     })
//     .join("\n");
//   return {
//     ...course,
//     knowledge: knowledge,
//     thumbnail: {
//       type: "link",
//       value: course.thumbnail,
//     },
//     category: ngoai_ngu,
//     page: page,
//     currency: "vnd",
//     media: media,
//   };
// });

fs.writeFileSync("./data/ngoai_ngu_2.json", JSON.stringify(newdata), (err) => {
  if (err) console.log(err);
});
