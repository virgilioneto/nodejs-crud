const categoryModel = require('../model/categoryModel');

const findAllCategories = (req, res) => {
  categoryModel.findAllCategories((result) => {
    res.status(200).json(result);
  });
};

const saveCategory = (req, res) => {
  const category = {
    id: req.params.id,
    name: req.body.name,
  };
  categoryModel.saveCategory(category, (result) => {
    res.json(result);
  });
};

module.exports = (app) => {
  app.get('/category', findAllCategories);
  app.post('/category', saveCategory);
  app.post('/category/:id', saveCategory);

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
