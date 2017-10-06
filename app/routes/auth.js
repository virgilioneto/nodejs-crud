const jwt = require('jsonwebtoken');

module.exports = (app) => {
  app.post('/auth', (req, res) => {
    const connection = app.infra.connectionFactory();
    const UserDAO = new app.infra.UserDAO(connection);
    UserDAO.findUser(req.body.username, req.body.password, (error, result) => {
      if (error) {
        res.status(500).send(error);
        return;
      }
      if (!result) {
        res.status(401).send('Invalid user/password');
      } else {
        const token = jwt.sign({ login: req.body.username }, app.get('secret'), {
          expiresIn: 86400,
        });
        res.set('x-access-token', token);
      }
    });
    connection.end();
  });
};
