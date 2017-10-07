const productDAO = require('../infra/ProductDAO');

const findProducts = (name, cb) => {
  if (name) {
    productDAO.findByParam(name, (result) => {
      cb(result);
    });
  } else {
    productDAO.findAll((result) => {
      cb(result);
    });
  }
};

const saveProduct = (product, cb) => {
  productDAO.save(product, (result) => {
    cb(result);
  });
};


// const findAllProducts = (cb) => {
//   const connection = connectionFactory();
//   const productDAO = new ProductDAO(connection);
//   productDAO.findAll((error, result) => {
//     cb(result);
//   });
//   connection.end();
// };

module.exports = {
  findProducts,
  saveProduct,
};
