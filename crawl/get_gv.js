const puppeteer = require("puppeteer");
const fs = require("fs");
const links = require("./unica_kinh_doanh.json");
const getUrl = "https://unica.vn/course/sales-ban-hang";

const pageUrl = "https://unica.vn";
(async () => {
  const browser = await puppeteer.launch();

  console.log(links.length);
  const info = await Promise.all(
    links.map(async (link) => {
      const page = await browser.newPage();
      await page.setDefaultNavigationTimeout(0);
      await page.goto(link.url, {
        waitUntil: "networkidle2",
      });

      let url = await page.evaluate(() => {
        const link = document.querySelector(".uct-name-gv>a").href;

        return link;
      });

      await page.close();
      return { ...link, instructor: url };
    })
  );
  // let rawdata = fs.readFileSync("unica1.json");
  // let data = JSON.parse(rawdata);
  // const newData = [...data, ...info];
  fs.writeFileSync("unica_kinh_doanh_2.json", JSON.stringify(info), (err) => {
    if (err) console.log(err);
  });

  await browser.close();
})();
console.log(links.length);
