const express = require('express');
const consign = require('consign');

module.exports = function config() {
  const app = express();
  consign({ cwd: 'app' })
    .include('routes')
    .then('infra')
    .into(app);
  return app;
};
