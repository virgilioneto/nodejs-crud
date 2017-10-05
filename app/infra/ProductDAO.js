function ProductDAO(connection) {
  this.connection = connection;
}

ProductDAO.prototype.findAll = function findAll(callback) {
  this.connection.query('SELECT * FROM products', callback);
};

module.exports = function getProductDAO() {
  return ProductDAO;
};
