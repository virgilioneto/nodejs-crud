module.exports = (app) => {
  app.get('/category', (req, res) => {
    const connection = app.infra.connectionFactory();
    const categoryDAO = new app.infra.CategoryDAO(connection);
    categoryDAO.findAll((error, result) => {
      res.status(200).json(result);
    });
    connection.end();
  });

  app.post('/category', (req, res) => {
    const connection = app.infra.connectionFactory();
    const categoryDAO = new app.infra.CategoryDAO(connection);
    categoryDAO.save(req.body, (error, result) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.status(200).json(result);
      }
    });
    connection.end();
  });

  app.get('/category/:id', (req, res) => {
    const connection = app.infra.connectionFactory();
    const categoryDAO = new app.infra.CategoryDAO(connection);
    categoryDAO.findById(req.params.id, (error, result) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.status(200).json(result);
      }
    });
    connection.end();
  });
};
