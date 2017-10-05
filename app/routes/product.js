// save product
// list products

// name, description, picture, category

module.exports = function products(app) {

  app.get('/product/list', function list(req, res) {
    let connection = app.infra.connectionFactory();
    let productDAO = new app.infra.ProductDAO(connection);
    productDAO.findAll(function callback(error, result) {
      res.status(200).json(result);
    });
    connection.end();
  });

  app.get('/product/:id', function findById(req, res) {
    console.log(req.param.id);
    let connection = app.infra.connectionFactory();
    let productDAO = new app.infra.ProductDAO(connection);
    productDAO.findById(req.param.id, function callback(error, result) {
      if(error) {
        console.log("error");
        res.status(500).send(error);
      } else {
        console.log(result);
        res.status(200).json(result);
      }
    });
    connection.end();
  });

};
