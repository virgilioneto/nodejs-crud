const Sequelize = require('sequelize');

const connection = new Sequelize('nodejs_crud_db', 'root', 'iamroot', {
  host: 'localhost',
  dialect: 'mysql',
});

const Product = connection.define('Product', {
  name: Sequelize.STRING,
  description: Sequelize.STRING,
});

const Category = connection.define('Category', {
  name: Sequelize.STRING,
});

Product.belongsToMany(Category, { through: 'ProductCategory' });
Category.belongsToMany(Product, { through: 'ProductCategory' });

const User = connection.define('User', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
});

connection.sync().then(() => {
  User.findOne({
    where: {
      username: 'adm',
    },
  }).then((user) => {
    if (!user) {
      User.create({
        username: 'adm',
        password: 'adm',
      });
    }
  });
});

module.exports = {
  connection,
  Product,
  Category,
  User,
};
