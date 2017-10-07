const productModel = require('../model/productModel');

const findProducts = (req, res) => {
  productModel.findProducts(req.query.name, (result) => {
    res.status(200).json(result);
  });
};

const saveProduct = (req, res) => {
  const product = {
    id: req.params.id,
    name: req.body.name,
    description: req.body.description,
    categories: req.body.categories.split(',').map(Number),
  };
  productModel.saveProduct(product, (result) => {
    res.json(result);
  });
};

const findProductById = (req, res) => {
  productModel.findProductById(req.params.id, (result) => {
    res.status(200).json(result);
  });
};

const deleteProductById = (req, res) => {
  productModel.deleteProductById(req.params.id, (result) => {
    res.json(result);
  });
};

module.exports = function products(app) {
  app.get('/product', findProducts);
  app.post('/product', saveProduct);
  app.post('/product/:id', saveProduct);
  app.get('/product/:id', findProductById);
  app.delete('/product/:id', deleteProductById);
};
