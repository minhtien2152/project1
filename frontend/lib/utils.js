export const handleMedia = (url) => {
  const str1 = url.split("https://www.youtube.com/embed/")[1];
  const str2 = str1.split("?rel");

  const result = "https://img.youtube.com/vi/" + str2[0] + "/hqdefault.jpg";
  return result;
};
