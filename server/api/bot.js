const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const { checkout } = require('../modal/bot');
router.use(bodyParser.json());

router.post('/checkout', async (req, res) => {
  await checkout(req.body);
  res.send('Checkout process completed');
});

module.exports = router;
