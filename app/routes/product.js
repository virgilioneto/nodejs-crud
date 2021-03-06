const productService = require('../service/productService');

const findProducts = (req, res) => {
  productService.findProducts(req.query.name, (result) => {
    res.status(200).json(result);
  });
};

const saveProduct = (req, res) => {
  const product = {
    id: req.params.id,
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    categories: req.body.categories.split(',').map(Number),
  };
  productService.saveProduct(product, (result) => {
    res.json(result);
  });
};

const findProductById = (req, res) => {
  productService.findProductById(req.params.id, (result) => {
    res.status(200).json(result);
  });
};

const deleteProductById = (req, res) => {
  productService.deleteProductById(req.params.id, (result) => {
    res.json(result);
  });
};

module.exports = function products(app) {
  app.get('/product', findProducts);
  app.post('/product', saveProduct);
  app.put('/product/:id', saveProduct);
  app.get('/product/:id', findProductById);
  app.delete('/product/:id', deleteProductById);
};
