const scriptFolder = "../uploads/script/";
const fs = require("fs");

exports.getFiles = async () => {
  const list = await fs.promises.readdir(scriptFolder);
  return list;
};
