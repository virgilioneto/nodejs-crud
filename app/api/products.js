const jwt = require('jsonwebtoken');

const sequelize = require('../infra/sequelize');

const productService = require('../service/productService');

const config = require('../../config/config');

const authenticate = (req, res) => {
  sequelize.User.findOne({
    where: {
      username: req.body.username,
      password: req.body.password,
    },
  }).then((result) => {
    if (result) {
      const token = jwt.sign({ login: req.body.username }, 'atsecret', {
        expiresIn: config.jwt.expiresIn,
      });
      res.set('x-access-token', token);
      res.send('ok');
    } else {
      res.status(401).send('Invalid user/password');
    }
  });
};

const filter = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, config.jwt.secret, (error, decoded) => {
      if (error) {
        return res.sendStatus(401);
      }
      req.username = decoded;
      next();
    });
  } else {
    return res.sendStatus(401);
  }
};

const findProducts = (req, res) => {
  productService.findProducts(req.query.name, (result) => {
    res.status(200).json(result);
  });
};

module.exports = (app) => {
  app.post('/api/auth', authenticate);
  app.use('/api/*', filter);
  app.get('/api/product', findProducts);
};
