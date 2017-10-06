const app = require('./config/crud-custom')();

app.listen(3000, () => {
  console.log('Server started (3000).');
});
