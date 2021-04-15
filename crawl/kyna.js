const puppeteer = require("puppeteer");
const fs = require("fs");

const getUrl =
  "https://kyna.vn/khoa-hoc-thuc-hanh-ke-toan-thue-tong-hop-tren-phan-mem-misa";

const pageUrl = "https://unica.vn";
(async () => {
  const browser = await puppeteer.launch();
  const get = await (async () => {
    const page = await browser.newPage();
    await page.goto(getUrl, {
      waitUntil: "networkidle2",
    });
    const data = await page.evaluate(() => {
      const title = document.querySelector(".cd-title").innerText;
      let content = document.querySelector("#courseDetailIntro");
      if (content.querySelectorAll(".course-general")[2])
        content.removeChild(content.querySelectorAll(".course-general")[2]);
      const price = document.querySelector(".crs-price--after").innerText;
      const rating = document.querySelector(".course-rating__number").innerText;
      const duration = document
        .querySelector(".crs-sticky-info-content")
        .querySelectorAll("li")[1].innerText;

      return { title, description: content.innerText, price, rating, duration };
    });
    await page.close();
    return data;
  })();

  fs.writeFileSync("kyna.json", JSON.stringify(get), (err) => {
    if (err) console.log(err);
  });

  await browser.close();
})();
