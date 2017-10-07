const categoryDAO = require('../infra/CategoryDAO');

const findCategories = (name, cb) => {
  categoryDAO.findAll(name, (result) => {
    cb(result);
  });
};

const saveCategory = (category, cb) => {
  categoryDAO.save(category, (result) => {
    cb(result);
  });
};

const findCategoryById = (id, cb) => {
  categoryDAO.findById(id, (result) => {
    cb(result);
  });
};

const deleteCategoryById = (id, cb) => {
  categoryDAO.deleteById(id, (result) => {
    cb(result);
  });
};

module.exports = {
  findCategories,
  saveCategory,
  findCategoryById,
  deleteCategoryById,
};
