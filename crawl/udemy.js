const puppeteer = require("puppeteer");
const fs = require("fs");

const getUrl = "https://www.udemy.com/course/threejs-tutorials/";

(async () => {
  const browser = await puppeteer.launch();
  const get = await (async () => {
    const page = await browser.newPage();
    await page.goto(getUrl, {
      waitUntil: "networkidle2",
    });
    const data = await page.evaluate(() => {
      const title = document.querySelector(".udlite-heading-xl[data-purpose]")
        .innerText;
      let description = document.querySelector(
        `[data-purpose="safely-set-inner-html:description:description"]`
      ).innerText;

      const price = document.querySelector(`[data-purpose="course-price-text"]`)
        .children[1].innerText;
      const rating = document.querySelector(`[data-purpose="average-rating"]`)
        .innerText;
      const duration = document.querySelector(
        `[data-purpose="video-content-length"]`
      ).innerText;

      return { title, description, price, rating, duration };
    });
    await page.close();
    return data;
  })();

  fs.writeFileSync("udemy.json", JSON.stringify(get), (err) => {
    if (err) console.log(err);
  });

  await browser.close();
})();
