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

    await page.waitForSelector(
      'a.button.button--s.c-white.width-100.display-flex.bg-red--aa'
    );
    await page.evaluate(() => {
      return new Promise((resolve) => {
        setTimeout(resolve, 200);
      });
    });

    await page.$eval(
      'a.button.button--s.c-white.width-100.display-flex.bg-red--aa',
      (e) => e.click()
    );
    console.log('Clicked the proceed to checkout button');
  } catch (e) {
    console.log(e);
  }
}
async function delivery(page) {
  try {
    const navigationPromise = page.waitForNavigation({
      waitUntil: ['load', 'networkidle2'],
    });
    await navigationPromise;
    await page.$eval('input[type="checkbox"]', (e) => e.click());

    await page.evaluate(() => {
      document.querySelector('#accept-tos-checkbox').parentElement.click();
    });
    await page.type("input[id='email']", 'testUser123@gmail.com');
    console.log('input typed');

    await page.type("input[id='TextField0']", 'John oneil');
    console.log('input typed2');

    await page.type("input[id='TextField1']", 'Connor');
    console.log('input typed3');

    await page.type("input[id='shipping-address1']", '265 stoke road');
    console.log('input typed4');

    await page.type("input[id='TextField3']", 'slough');
    console.log('input typed5');

    await page.type("input[id='TextField4']", 'sl2 5ax');
    console.log('input typed6');

    await page.type("input[id='TextField5']", '07377 735412');
    console.log('input typed7');
  } catch (e) {
    console.log(e);
  }
}
async function checkout() {
  const page = await initBrowser();
  await addToCart(page);
  await delivery(page);
  // await payment(page);
}

checkout();
