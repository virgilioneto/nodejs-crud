function ProductDAO(connection) {
  this.connection = connection;
}

ProductDAO.prototype.findAll = function findAll(callback) {
  this.connection.query('SELECT * FROM products', callback);
};

ProductDAO.prototype.findById = function findById(id, callback) {
  this.connection.query('SELECT * FROM products WHERE id = ?', [id], callback);
};

module.exports = function getProductDAO() {
  return ProductDAO;
};
