const categoryDAO = require('../infra/CategoryDAO');

const findAllCategories = (cb) => {
  categoryDAO.findAll((result) => {
    cb(result);
  });
};

module.exports = {
  findAllCategories,
};
