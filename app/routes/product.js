// save product
// list products

// name, description, picture, category

module.exports = function products(app) {

  app.get('/products', function list(req, res) {
    let connection = app.infra.connectionFactory();
    let productDAO = new app.infra.ProductDAO(connection);
    productDAO.findAll(function callback(error, result) {
      res.json(result);
    });
    connection.end();
  });
  
};
