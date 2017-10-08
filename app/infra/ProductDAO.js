const sequelize = require('../infra/sequelize');

const findAll = (cb) => {
  sequelize.Product.findAll({
    attributes: ['id', 'name', 'description'],
    include: [{ model: sequelize.Category, attributes: ['id', 'name'] }],
  }).then((products) => {
    cb(products);
  });
};

const findByParam = (name, cb) => {
  sequelize.Product.findAll({
    attributes: ['id', 'name'],
    where: {
      name,
    },
  }).then((products) => {
    cb(products);
  });
};

const save = (product, cb) => {
  sequelize.Product.findOne({
    where: {
      id: product.id,
    },
  }).then((products) => {
    if (products) {
      sequelize.Product.update({
        name: product.name,
        description: product.description,
      }, {
        where: {
          id: product.id,
        },
      }).then(() => {
        products.setCategories(product.categories);
        cb('Product updated');
      });
    } else {
      sequelize.Product.create({
        name: product.name,
        description: product.description,
      }).then((savedProduct) => {
        savedProduct.setCategories(product.categories);
        cb('Product saved');
      });
    }
  });
};

const findById = (id, cb) => {
  sequelize.Product.findOne({
    where: {
      id,
    },
    attributes: ['id', 'name', 'description'],
    include: [{ model: sequelize.Category, attributes: ['id', 'name'] }],
  }).then((product) => {
    cb(product);
  });
};

const deleteById = (id, cb) => {
  sequelize.Product.destroy({
    where: {
      id,
    },
  }).then(() => {
    cb('Product deleted');
  });
};

module.exports = {
  save,
  findAll,
  findById,
  deleteById,
  findByParam,
};
