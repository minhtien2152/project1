const puppeteer = require("puppeteer");
const fs = require("fs");
const links = require("./gv_lt_link_u.json");
const pageUrl = "https://unica.vn";

(async () => {
  const browser = await puppeteer.launch();

  const info = await Promise.all(
    links.map(async (link) => {
      const page = await browser.newPage();

      await page.setDefaultNavigationTimeout(0);
      await page.goto(link, {
        waitUntil: "networkidle2",
      });
      const url = await page.url();
      if (url === "https://unica.vn/404") return;
      const info = await page.evaluate(() => {
        const name = document.querySelector(".u-teacher-info >h1").innerText;
        const avatar = document.querySelector(".u-teacher-avatar >img ").src;
        let description = document.querySelector(".u-teacher-intro ").innerText;
        description = description.split("Giới thiệu\n")[1];
        const url = document.querySelector("head> link ").href;
        return {
          name,
          description,
          avatar: { type: "link", value: avatar },
          url,
        };
      });
      await page.close();
      return info;
    })
  );
  fs.writeFileSync("info_gv_lt.json", JSON.stringify(info), (err) => {
    if (err) console.log(err);
  });
  await browser.close();
})();
