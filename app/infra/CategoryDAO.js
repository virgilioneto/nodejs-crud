const sequelize = require('../infra/sequelize');

const findAll = (cb) => {
  sequelize.Category.findAll({
    attributes: ['id', 'name'],
  }).then((categories) => {
    cb(categories);
  });
};

const findByParam = (name, cb) => {
  sequelize.Category.findAll({
    attributes: ['id', 'name'],
    where: {
      name,
    },
  }).then((categories) => {
    cb(categories);
  });
};

const save = (category, cb) => {
  sequelize.Category.findOne({
    where: {
      id: category.id,
    },
  }).then((categories) => {
    if (categories) {
      sequelize.Category.update({
        name: category.name,
        image: category.image,
      }, {
        where: {
          id: category.id,
        },
      }).then(() => {
        cb('Category updated');
      });
    } else {
      sequelize.Category.create({
        name: category.name,
        image: category.image,
      }).then(() => {
        cb('Category saved');
      });
    }
  });
};

const findById = (id, cb) => {
  sequelize.Category.findOne({
    where: {
      id,
    },
    attributes: ['id', 'name', 'image'],
  }).then((category) => {
    cb(category);
  });
};

const deleteById = (id, cb) => {
  sequelize.Category.destroy({
    where: {
      id,
    },
  }).then(() => {
    cb('Category deleted');
  });
};

module.exports = {
  findAll,
  save,
  findById,
  deleteById,
  findByParam,
};
