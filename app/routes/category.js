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

const findCategoryById = (req, res) => {
  categoryModel.findCategoryById(req.params.id, (result) => {
    res.status(200).json(result);
  });
};

module.exports = (app) => {
  app.get('/category', findAllCategories);
  app.post('/category', saveCategory);
  app.get('/category/:id', findCategoryById);
  app.post('/category/:id', saveCategory);
};
