const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');

module.exports = function config() {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  consign({ cwd: 'app' })
    .include('routes')
    .then('model')
    .into(app);

  return app;
};
