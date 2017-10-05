// save product
// list products

// name, description, picture, category

module.exports = function products(app) {
  app.get('/product', (request, response) => {
    const connection = app.infra.connectionFactory();
    const productDAO = new app.infra.ProductDAO(connection);
    productDAO.findAll((error, result) => {
      response.status(200).json(result);
    });
    connection.end();
  });

  app.post('/product', (request, response) => {
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
