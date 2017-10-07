const sequelize = require('../infra/sequelize');

const findAll = (cb) => {
  sequelize.connection.sync().then(() => {
    sequelize.Product.findAll({
      attributes: ['id', 'name'],
      include: [{ model: sequelize.Category, attributes: ['id', 'name'] }],
    }).then((products) => {
      cb(JSON.parse(JSON.stringify(products)));
    });
  });
};

const findByParam = (name, cb) => {
  sequelize.connection.sync().then(() => {
    sequelize.Product.findAll({
      attributes: ['id', 'name'],
      where: {
        name,
      },
    }).then((products) => {
      cb(JSON.parse(JSON.stringify(products)));
    });
  });
};

const save = (product, cb) => {
  sequelize.Product.findOne({
    where: {
      id: product.id,
    },
  }).then((products) => {
    if (products) {
      sequelize.connection.sync().then(() => sequelize.Product.update({
        name: product.name,
        description: product.description,
      }, {
        where: {
          id: product.id,
        },
      }).then(() => {
        products.setCategories(product.categories);
        cb('Product updated');
      }));
    } else {
      sequelize.connection.sync().then(() => sequelize.Product.create({
        name: product.name,
        description: product.description,
      }).then((savedProduct) => {
        savedProduct.setCategories(product.categories);
        cb('Product saved');
      }));
    }
  });
};

const findById = (id, cb) => {
  sequelize.connection.sync().then(() => {
    sequelize.Product.findOne({
      where: {
        id,
      },
      attributes: ['id', 'name'],
      include: [{ model: sequelize.Category, attributes: ['id', 'name'] }],
    }).then((product) => {
      cb(JSON.parse(JSON.stringify(product)));
    });
  });
};

const deleteById = (id, cb) => {
  sequelize.connection.sync().then(() => {
    sequelize.Product.destroy({
      where: {
        id,
      },
    }).then(() => {
      cb('Product deleted');
    });
  });
};

module.exports = {
  save,
  findAll,
  findById,
  deleteById,
  findByParam,
};
