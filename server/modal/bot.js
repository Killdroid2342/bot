const puppeteer = require('puppeteer');

async function initBrowser(url) {
  console.log(url, 'inside func');
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });
  return page;
}

async function AddToCart(page) {
  try {
    await page.$eval('button.sc-dmXWDj.bsZIMV', (e) => e.click());
    console.log('Clicked');
    await page.evaluate(() => {
      return new Promise((resolve) => {
        setTimeout(resolve, 50);
      });
    });
    await page.evaluate(() => {
      return new Promise((resolve) => {
        setTimeout(resolve, 50);
      });
    });
    await page.waitForSelector('span.sc-dmXWDj.bFCvEm');

    await page.$eval('span.sc-dmXWDj.bFCvEm', (e) => e.click());

    console.log('Clicked the proceed to checkout button');
  } catch (e) {
    console.log(e);
  }
}

async function DeliveryPayment(page, body) {
  try {
    const {
      Email,
      FirstName,
      SecondName,
      Address,
      City,
      Postcode,
      CardNumber,
      PhoneNumber,
      CVV,
      Expiry,
      Name,
    } = body;

    const navigationPromise = page.waitForNavigation({
      waitUntil: ['load', 'networkidle2'],
    });
    await navigationPromise;

    await page.type("input[id='email']", Email);
    console.log('input typed');

    await page.type("input[id='TextField0']", FirstName);
    console.log('input typed2');

    await page.type("input[id='TextField1']", SecondName);
    console.log('input typed3');

    await page.type("input[id='shipping-address1']", Address);
    console.log('input typed4');

    await page.type("input[id='TextField3']", City);
    console.log('input typed5');

    await page.type("input[id='TextField4']", Postcode);
    console.log('input typed6');

    await page.type("input[id='TextField5']", PhoneNumber);
    console.log('input typed7');

    await page.evaluate(() => {
      return new Promise((resolve) => {
        setTimeout(resolve, 50);
      });
    });
    await page.type('#number', `_${CardNumber}`);

    console.log(CardNumber, 'THIS IS CARD NUMBER');
    await page.evaluate(() => {
      return new Promise((resolve) => {
        setTimeout(resolve, 50);
      });
    });
    await page.type('#expiry', `__${Expiry}`);
    await page.evaluate(() => {
      return new Promise((resolve) => {
        setTimeout(resolve, 50);
      });
    });
    await page.type('#verification_value', `_${CVV}`);

    await page.evaluate(() => {
      return new Promise((resolve) => {
        setTimeout(resolve, 50);
      });
    });
    await page.type('#name', `_${Name}`);

    await page.evaluate(() => {
      return new Promise((resolve) => {
        setTimeout(resolve, 50);
      });
    });

    await page.$eval('input[type="checkbox"]#accept-tos-checkbox', (e) =>
      e.click()
    );
    console.log('clicked checkbox');
    await page.$eval('button#checkout-pay-button', (e) => e.click());
    console.log('process payment');
  } catch (e) {
    console.log(e);
  }
}

async function checkout(body) {
  const { ItemLink } = body;
  const page = await initBrowser(ItemLink);
  await AddToCart(page);
  await DeliveryPayment(page, body);
}

module.exports = { checkout };
