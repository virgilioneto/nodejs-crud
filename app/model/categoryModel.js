const categoryDAO = require('../infra/CategoryDAO');

const findAllCategories = (cb) => {
  categoryDAO.findAll((result) => {
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

module.exports = {
  findAllCategories,
  saveCategory,
  findCategoryById,
};
