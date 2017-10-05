const app = require('./config/crud-custom')();

app.listen(3000, function listen() {
  console.log('Server started (3000).');
});
