const sequelize = require('../infra/sequelize');

const findAll = (cb) => {
  sequelize.connection.sync().then(() => {
    sequelize.Category.findAll({
      attributes: ['id', 'name'],
    }).then((categories) => {
      cb(JSON.parse(JSON.stringify(categories)));
    });
  });
};

const findById = (connection, id, cb) => {
  connection.query('SELECT * FROM categories WHERE id = ?', [id], cb);
};

const save = (connection, category, cb) => {
  connection.query('INSERT INTO categories SET ?', category, cb);
};

module.exports = {
  findAll,
  findById,
  save,
};
