const sequelize = require('../infra/sequelize');

const findAll = (cb) => {
  sequelize.connection.sync().then(() => {
    sequelize.Category.findAll({
      attributes: ['id', 'name'],
    }).then((categories) => {
      cb(categories);
    });
  });
};

const findByParam = (name, cb) => {
  sequelize.connection.sync().then(() => {
    sequelize.Category.findAll({
      attributes: ['id', 'name'],
      where: {
        name,
      },
    }).then((categories) => {
      cb(categories);
    });
  });
};

const save = (category, cb) => {
  sequelize.Category.findOne({
    where: {
      id: category.id,
    },
  }).then((categories) => {
    if (categories) {
      sequelize.connection.sync().then(() => sequelize.Category.update({
        name: category.name,
      }, {
        where: {
          id: category.id,
        },
      }).then(() => {
        cb('Category updated');
      }));
    } else {
      sequelize.connection.sync().then(() => sequelize.Category.create({
        name: category.name,
      }).then(() => {
        cb('Category saved');
      }));
    }
  });
};

const findById = (id, cb) => {
  sequelize.connection.sync().then(() => {
    sequelize.Category.findOne({
      where: {
        id,
      },
      attributes: ['id', 'name'],
    }).then((category) => {
      cb(category);
    });
  });
};

const deleteById = (id, cb) => {
  sequelize.connection.sync().then(() => {
    sequelize.Category.destroy({
      where: {
        id,
      },
    }).then(() => {
      cb('Category deleted');
    });
  });
};

module.exports = {
  findAll,
  save,
  findById,
  deleteById,
  findByParam,
};
