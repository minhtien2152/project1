const puppeteer = require("puppeteer");
const fs = require("fs");

const getUrl = "https://unica.vn/course/cong-nghe-thong-tin";
//const links = require("./course_tin_hoc_u.json");
const isElementVisible = async (page, cssSelector) => {
  let visible = true;
  await page
    .waitForSelector(cssSelector, { visible: true, timeout: 2000 })
    .catch(() => {
      visible = false;
    });
  return visible;
};

const pageUrl = "https://unica.vn";
(async () => {
  const browser = await puppeteer.launch();
  const getlinks = await (async () => {
    const page = await browser.newPage();
    await page.goto(getUrl, {
      waitUntil: "networkidle2",
    });
    let loadMoreVisible = await isElementVisible(page, "a#btn-load-more.btn");
    while (loadMoreVisible) {
      await page.click("a#btn-load-more.btn", 5000).catch(() => {});

      loadMoreVisible = await isElementVisible(page, "a#btn-load-more.btn");
    }
    const courseLinks = await page.evaluate(() => {
      let titleLinks = document.querySelectorAll("a.course-box-slider");
      let thumbnails = document.querySelectorAll(".img-course > img");
      thumbnails = [...thumbnails];
      titleLinks = [...titleLinks];
      let courseLinks = titleLinks.map((link, i) => {
        return {
          url: link.getAttribute("href"),
          thumbnail: thumbnails[i].getAttribute("src"),
        };
      });

      return courseLinks;
    });
    await page.close();
    return courseLinks;
  })();

  const links = Array.from(getlinks);
  console.log(links.length);
  const info = await Promise.all(
    links.map(async (link) => {
      const combinedLink = pageUrl + link.url;

      const page = await browser.newPage();
      await page.setDefaultNavigationTimeout(0);
      await page.goto(combinedLink, {
        waitUntil: "networkidle2",
      });

      let course = await page.evaluate(() => {
        const title = document.querySelector("span[itemProp]").innerText;
        const knowledge = document.querySelector(
          ".u-learn-what > .content"
        ).innerText;

        let description = document.querySelector(".u-des-course").innerText;
        description = description.split("Giới thiệu khóa học\n")[1];
        let price = document.querySelector(".big-price").innerText;
        price = price.split(",").join("").split("đ")[0];
        price = parseInt(price);
        const duration = document.querySelector("li >p").innerText;
        const rating = document.querySelector(".number-big-rate").innerText;
        let media;
        if (document.querySelector(".u-video > img"))
          media = {
            url: document.querySelector(".u-video > img").src,
            type: "img",
          };
        else if (document.querySelector(".embed-responsive-item"))
          media = {
            url: document.querySelector(".embed-responsive-item").src,
            type: "video",
          };
        const lang = document
          .getElementsByTagName("html")[0]
          .getAttribute("xml:lang");

        return {
          title,
          knowledge,
          description,
          price,
          duration,
          rating,
          media,
          lang,
        };
      });
      course = { ...course, url: combinedLink, thumbnail: link.thumbnail };
      await page.close();
      return course;
    })
  );
  // let rawdata = fs.readFileSync("unica1.json");
  // let data = JSON.parse(rawdata);
  // const newData = [...data, ...info];
  fs.writeFileSync("unica_lap_trinh.json", JSON.stringify(info), (err) => {
    if (err) console.log(err);
  });

  await browser.close();
})();
