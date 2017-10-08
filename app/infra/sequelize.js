const Sequelize = require('sequelize');
const config = require('../../config/config');

const connection = new Sequelize(
  config.db.name,
  config.db.user,
  config.db.pass, {
    host: config.db.host,
    dialect: config.db.dialect,
  },
);

const Product = connection.define('Product', {
  name: Sequelize.STRING,
  description: Sequelize.STRING,
  image: Sequelize.TEXT,
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
