const categoryService = require('../service/categoryService');

const findCategories = (req, res) => {
  categoryService.findCategories(req.query.name, (result) => {
    res.status(200).json(result);
  });
};

const saveCategory = (req, res) => {
  const category = {
    id: req.params.id,
    name: req.body.name,
  };
  categoryService.saveCategory(category, (result) => {
    res.json(result);
  });
};

const findCategoryById = (req, res) => {
  categoryService.findCategoryById(req.params.id, (result) => {
    res.status(200).json(result);
  });
};

const deleteCategoryById = (req, res) => {
  categoryService.deleteCategoryById(req.params.id, (result) => {
    res.json(result);
  });
};

module.exports = (app) => {
  app.get('/category', findCategories);
  app.post('/category', saveCategory);
  app.get('/category/:id', findCategoryById);
  app.put('/category/:id', saveCategory);
  app.delete('/category/:id', deleteCategoryById);
};
