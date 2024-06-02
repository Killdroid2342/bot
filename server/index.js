const app = require('express')();
const port = 4001;
const cors = require('cors');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const routes = require('./api/index');

const corsOptions = {
  origin: ['http://localhost:4001', 'http://127.0.0.1:5500'],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

routes(app, { urlencodedParser });
app.get('/', function (req, res) {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`listning on ${port}`);
});
