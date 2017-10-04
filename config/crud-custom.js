const express = require('express');
const consign = require('consign');

module.exports = function config() {
  const app = express();
  consign()
    .include('routes')
    .into(app);
  return app;
};
