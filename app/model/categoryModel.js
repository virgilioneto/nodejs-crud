const CategoryDAO = require('../infra/CategoryDAO');
const connectionFactory = require('../infra/connectionFactory');

const findAllCategories = (cb) => {
  const connection = connectionFactory();
  const categoryDAO = new CategoryDAO(connection);
  categoryDAO.findAll((error, result) => {
    cb(result);
  });
  connection.end();
};

module.exports = {
  findAllCategories,
};
