const app = require('./config/crud-custom')();

const sequelize = require('./app/infra/sequelize');

app.listen(3000, () => {
  sequelize.connection.sync();
  console.log('Server started (3000).');
});
