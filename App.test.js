const puppeteer = require("puppeteer");

let browser;
let page;
const baseUrl = "http://localhost:3000";

beforeAll(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
});

describe("Generate report", () => {
  beforeAll(async () => {
    await page.goto(baseUrl);
  });

  it("should navigate to /report", async () => {
    await page.waitForSelector("[type='submit']");
    await page.click("[type='submit']");

    expect(page.url()).toBe(`${baseUrl}/report`);
  });
});
