import { Mongoose } from "mongoose";

const URL = "https://avatars.dicebear.com/api/avataaars/";

const generateRandomAvatar = async (sex) => {
  mongoose.Types.ObjectId();
  let hair = "";
  if (sex === "male") hair = "top[]=shortHair";
  else if (sex === "female") hair = "top[]=longHair";
  const genUrl = URL + "?" + hair;

  return downloadImage(genUrl);
};

async function downloadImage(url) {
  const response = await fetch(url);
  const buffer = await response.buffer();
  const fileName = `../uploads/file-${Date.now()}.svg`;
  fs.writeFile(fileName, buffer, () => console.log("finished downloading!"));
  return fileName;
}

export default generateRandomAvatar;
