const productModel = require('../model/productModel');

const findAllProducts = (req, res) => {
  productModel.findAllProducts((result) => {
    res.status(200).json(result);
  });
};

module.exports = function products(app) {
  app.get('/product', findAllProducts);

  // app.get('/product', (req, res) => {
  //   const connection = app.infra.connectionFactory();
  //   const productDAO = new app.infra.ProductDAO(connection);
  //   productDAO.findAll((error, result) => {
  //     res.status(200).json(result);
  //   });
  //   connection.end();
  // });

  app.post('/product', (req, res) => {
    // save product
  });

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
