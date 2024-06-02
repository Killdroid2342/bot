function routes(app, { urlencodedParser }) {
  app.use('/bot', urlencodedParser, require('./bot'));
}
module.exports = routes;
