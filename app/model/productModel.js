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

const findProductById = (id, cb) => {
  productDAO.findById(id, (result) => {
    cb(result);
  });
};

module.exports = {
  findProducts,
  saveProduct,
  findProductById,
};
