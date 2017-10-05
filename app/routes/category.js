// save category
// list categories

module.exports = function category(app) {
  app.get('/category', (request, response) => {
    const connection = app.infra.connectionFactory();
    const categoryDAO = new app.infra.CategoryDAO(connection);
    categoryDAO.findAll((error, result) => {
      response.status(200).json(result);
    });
    connection.end();
  });

  app.post('/category', (request, response) => {
    // save category
  });

  app.get('/category/:id', (request, response) => {
    const connection = app.infra.connectionFactory();
    const categoryDAO = new app.infra.CategoryDAO(connection);
    categoryDAO.findById(request.params.id, (error, result) => {
      if (error) {
        response.status(500).send(error);
      } else {
        response.status(200).json(result);
      }
    });
    connection.end();
  });
};
