const ProductDAO = require('../infra/ProductDAO');
const connectionFactory = require('../infra/connectionFactory');

const findAllProducts = (cb) => {
  const connection = connectionFactory();
  const productDAO = new ProductDAO(connection);
  productDAO.findAll((error, result) => {
    cb(result);
  });
  connection.end();
};

module.exports = {
  findAllProducts,
};
