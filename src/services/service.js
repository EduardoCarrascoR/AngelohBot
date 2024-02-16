const RedditImageFetcher = require("reddit-image-fetcher");
const { chromium } = require("playwright");

const memeJaidefinichon = async () => {
  let meme,
    random = Math.floor(Math.random() * 10);
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto("https://jaidefinichon.com/");
  await page.waitForSelector("div.repeat__post");
  const listResult = await page.evaluate(() => {
    let result = [];
    document
      .querySelectorAll("div.repeat__post div.post_inner")
      .forEach((value, index) => {
        if (index > 0) {
          const image = value.querySelector("div.image_post figure img");
          const postLink = value.querySelector(
            "div.post_header div.post_comments_counter a"
          );

          result.push({
            image: image.src,
            index: index,
            author: "jaidefinichon.com",
            postLink: postLink.href,
          });
        }
      });
    return result;
  });

  meme = listResult[random];
  await browser.close();
  return meme;
};
const memeReddit = async () => {
  let meme;
  await RedditImageFetcher.fetch({
    type: "custom",
    total: 1,
    subreddit: [
      "DylanteroYT",
      "dankmemes",
      "Memes_Of_The_Dank",
      "memes",
      "okbuddyretard",
    ],
  }).then(async (data) => {
    if (
      data[0] !== undefined &&
      data[0].image !== Array.isArray(data[0].image) &&
      data[0].postLink !== null &&
      data[0].NSFW !== true
    ) {
      meme = data[0];
    } else {
      console.log("error en data", meme);
    }
  });
  return meme;
};
module.exports = {
  memeReddit,
  memeJaidefinichon,
};
