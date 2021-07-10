const courses = require("./unica_lt.json");
const fs = require("fs");
const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const info = await Promise.all(
    courses.map(async (course) => {
      const page = await browser.newPage();
      await page.setDefaultNavigationTimeout(0);
      await page.goto(course.url, {
        waitUntil: "networkidle2",
      });

      let link = await page.evaluate(() => {
        const link = document.querySelector(".uct-name-gv>a").href;

        return link;
      });

      await page.close();
      return { ...course, instructor: link };
    })
  );
  fs.writeFileSync("unica_lt_2.json", JSON.stringify(info), (err) => {
    if (err) console.log(err);
  });

  await browser.close();
})();
