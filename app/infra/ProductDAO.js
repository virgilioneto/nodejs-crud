const sequelize = require('../infra/sequelize');

const findAll = (cb) => {
  sequelize.connection.sync().then(() => {
    sequelize.Product.findAll({
      attributes: ['id', 'name'],
      include: [{ model: sequelize.Category, attributes: ['id', 'name'] }],
    }).then((products) => {
      cb(JSON.parse(JSON.stringify(products)));
    });
  });
};

const save = (product, cb) => {
  sequelize.Product.findOne({
    where: {
      id: product.id,
    },
  }).then((products) => {
    if (products) {
      sequelize.connection.sync().then(() => sequelize.Product.update({
        name: product.name,
        description: product.description,
      }, {
        where: {
          id: product.id,
        },
      }).then(() => {
        products.setCategories(product.categories);
        cb('Product updated');
      }));
    } else {
      sequelize.connection.sync().then(() => sequelize.Product.create({
        name: product.name,
        description: product.description,
      }).then((savedProduct) => {
        savedProduct.setCategories(product.categories);
        cb('Product saved');
      }));
    }
  });
};

const findById = (id, cb) => {
  sequelize.connection.sync().then(() => {
    sequelize.Product.findOne({
      where: {
        id,
      },
      attributes: ['id', 'name'],
      include: [{ model: sequelize.Category, attributes: ['id', 'name'] }],
    }).then((product) => {
      cb(JSON.parse(JSON.stringify(product)));
    });
  });
};

module.exports = {
  save,
  findAll,
  findById,
};

// sequelize.sync()
//   .then(() => Product.create({
//     name: 'product2',
//     description: 'this is the second product'
//   }).then(function(product2) {
//       product2.setCategories([1, 2]);
//   }));

// function ProductDAO(connection) {
//   this.connection = connection;
// }
//
// ProductDAO.prototype.findAll = function findAll(callback) {
//   const sql = 'SELECT p.id, p.name as product, p.description, ' +
//     'GROUP_CONCAT(c.name SEPARATOR ", ") as categories ' +
//     'FROM products p JOIN product_category pc ON p.id = pc.product_id ' +
//     'JOIN categories c ON c.id = pc.category_id GROUP BY p.name ORDER BY p.name';
//   this.connection.query(sql, callback);
// };
//
// ProductDAO.prototype.findById = function findById(id, callback) {
//   this.connection.query('SELECT * FROM products WHERE id = ?', [id], callback);
// };
//
// ProductDAO.prototype.findByName = function findByName(name, callback) {
//   this.connection.query('SELECT * FROM products WHERE name LIKE ?', `%${[name]}%`, callback);
// };
//
// module.exports = function getProductDAO() {
//   return ProductDAO;
// };


// const findAll = (cb) => {
//   sequelize.sequelizeConnection.sync().then(() => {
//     sequelize.Product.findAll({
//       include: [sequelize.Category],
//     }).then((products) => {
//       console.log(JSON.parse(JSON.stringify(products)));
//       //console.log(products[0].get('name'));
//       //console.log(products[0].get('categories')[0].get('name'));
//       cb(JSON.parse(JSON.stringify(products)));
//     });
//   });
// };
