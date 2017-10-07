const jwt = require('jsonwebtoken');

const sequelize = require('../../infra/sequelize');

//const userDAO = require('../../infra/UserDAO');

const authenticate = (req, res) => {
  sequelize.User.findOne({
    where: {
      username: req.body.username,
      password: req.body.password,
    },
  }).then((result) => {
    if (result) {
      const token = jwt.sign({ login: req.body.username }, 'atsecret', {
        expiresIn: 86400,
      });
      res.set('x-access-token', token);
      res.send('ok');
    } else {
      res.status(401).send('Invalid user/password');
    }
  });
};

module.exports = (app) => {
  app.post('/api/v1/auth', authenticate);
};
