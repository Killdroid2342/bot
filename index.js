const puppeteer = require('puppeteer');

const rand_url = 'https://uk.supreme.com/products/rkl3uya6k-z-wyta';

async function initBrowser() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(rand_url, { waitUntil: 'networkidle2' });
  return page;
}

async function addToCart(page) {
  try {
    await page.$eval(
      'input[type="submit"].button.button--default.fontWeight-bold.bpS-button--s.width-100.bg-red--aa.c-white',
      (e) => e.click()
    );
    console.log('Clicked');
    await page.evaluate(() => {
      return new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
    });

    await page.waitForSelector(
      'a.button.button--s.c-white.width-100.display-flex.bg-red--aa'
    );
    await page.evaluate(() => {
      return new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
    });

    await page.$eval(
      'a.button.button--s.c-white.width-100.display-flex.bg-red--aa',
      (e) => e.click()
    );
    console.log('Clicked the proceed to checkout button');
  } catch (error) {
    console.error(`Error in addToCart: ${error.message}`);
  }
}

async function checkout() {
  const page = await initBrowser();
  await addToCart(page);
  // await delivery(page);
  // await payment(page);
}

checkout();
