const puppeteer = require("puppeteer");
const fs = require("fs");

const getUrl = "https://unica.vn/course/ngoai-ngu";

const pageUrl = "https://unica.vn";
(async () => {
  const browser = await puppeteer.launch();
  const getlinks = await (async () => {
    const page = await browser.newPage();
    await page.goto(getUrl, {
      waitUntil: "networkidle2",
    });
    const courseLinks = await page.evaluate(() => {
      let titleLinks = document.querySelectorAll("a.course-box-slider");
      titleLinks = [...titleLinks];
      let courseLinks = titleLinks.map((link) => link.getAttribute("href"));

      return courseLinks;
    });
    await page.close();
    return courseLinks;
  })();

  const links = Array.from(getlinks);

  const info = await Promise.all(
    links.map(async (link) => {
      const combinedLink = pageUrl + link;

      const page = await browser.newPage();
      await page.goto(combinedLink, {
        waitUntil: "networkidle2",
      });

      const course = await page.evaluate(() => {
        const title = document.querySelector("span[itemProp]").innerText;

        const description = document.querySelector(".u-des-course").innerText;
        const price = document.querySelector(".big-price").innerText;
        const duration = document.querySelector("li >p").innerText;
        const rating = document.querySelector(".number-big-rate").innerText;

        return { title, description, price, duration, rating };
      });

      await page.close();
      return course;
    })
  );

  fs.writeFileSync("unica1.json", JSON.stringify(info), (err) => {
    if (err) console.log(err);
  });

  await browser.close();
})();
