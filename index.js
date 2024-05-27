const puppeteer = require('puppeteer');

const rand_url = 'https://uk.supreme.com/products/rkl3uya6k-z-wyta';

async function initBrowser() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(rand_url, { waitUntil: 'networkidle2' });
  return page;
}

async function AddToCart(page) {
  try {
    await page.$eval(
      'input[type="submit"].button.button--default.fontWeight-bold.bpS-button--s.width-100.bg-red--aa.c-white',
      (e) => e.click()
    );
    console.log('Clicked');
    await page.evaluate(() => {
      return new Promise((resolve) => {
        setTimeout(resolve, 100);
      });
    });

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
async function DeliveryPayment(page) {
  try {
    const navigationPromise = page.waitForNavigation({
      waitUntil: ['load', 'networkidle2'],
    });
    await navigationPromise;
    await page.evaluate(() => {
      return new Promise((resolve) => {
        setTimeout(resolve, 300);
      });
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
    await page.$eval(
      'input[type="checkbox"]#accept-tos-checkbox._1mmswk96._1fragemr1._1fragemqz._1fragemr3._1fragemqx._1fragemrx._1fragemrt._1fragems1._1fragemrp._1fragemby._1fragemb9._1fragemcn._1fragemak._1fragempr._1fragem2i._1fragemqm._1fragem2d._1fragemv9._1fragemv3._1fragemvf._1fragempi._1fragemvq',
      (e) => e.click()
    );
    console.log('clicked checkbox');
    await page.$eval(
      'input[type="checkbox"]#save_shipping_information._1mmswk96._1fragemr1._1fragemqz._1fragemr3._1fragemqx._1fragemrx._1fragemrt._1fragems1._1fragemrp._1fragemby._1fragemb9._1fragemcn._1fragemak._1fragempr._1fragem2i._1fragemqm._1fragem2d._1fragemv9._1fragemv3._1fragemvf._1fragempi._1fragemvq',
      (e) => e.click()
    );
    console.log('clicked checkbox');

    await page.type('#number', '5662760010000013');
    await page.type('#expiry', '0126');
    await page.type('#verification_value', '0333');
    await page.type('#name', '0MR THING BOB');

    await page.$eval(
      'button#checkout-pay-button.QT4by._1fragempl.rqC98._1m2hr9gc._1m2hr9ga._7QHNJ.VDIfJ.j6D1f.janiy',
      (e) => e.click()
    );
  } catch (e) {
    console.log(e);
  }
}

async function checkout() {
  const page = await initBrowser();
  await AddToCart(page);
  await DeliveryPayment(page);
}

checkout();
