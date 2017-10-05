// save category
// list categories

module.exports = function category(app) {

  app.get('/category/list', function list(req, res) {
    let connection = app.infra.connectionFactory();
    let categoryDAO = new app.infra.CategoryDAO(connection);
    categoryDAO.findAll(function callback(error, result) {
      res.status(200).json(result);
    });
    connection.end();
  });

  app.get('/category/:id', function findById(req, res) {
    console.log(req.param.id);
    let connection = app.infra.connectionFactory();
    let categoryDAO = new app.infra.CategoryDAO(connection);
    categoryDAO.findById(req.param.id, function callback(error, result) {
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
