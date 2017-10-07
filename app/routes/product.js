const productModel = require('../model/productModel');

const findProducts = (req, res) => {
  productModel.findProducts(req.query.name, (result) => {
    res.status(200).json(result);
  });
};

const saveProduct = (req, res) => {
  productModel.saveProduct((result) => {
    // product saved
  });
}

module.exports = function products(app) {
  app.get('/product', findProducts);
  app.post('/product', saveProduct);

  app.get('/product/:id', (request, response) => {
    const connection = app.infra.connectionFactory();
    const productDAO = new app.infra.ProductDAO(connection);
    productDAO.findById(request.params.id, (error, result) => {
      if (error) {
        response.status(500).send(error);
      } else {
        response.status(200).json(result);
      }
    });
    connection.end();
  });
};
