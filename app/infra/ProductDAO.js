function ProductDAO(connection) {
  this.connection = connection;
}

ProductDAO.prototype.findAll = function findAll(callback) {
  let sql = 'SELECT p.id, p.name as product, p.description, ' +
    'GROUP_CONCAT(c.name SEPARATOR ", ") as categories ' +
    'FROM products p JOIN product_category pc ON p.id = pc.product_id ' +
    'JOIN categories c ON c.id = pc.category_id GROUP BY p.name ORDER BY p.name';
  this.connection.query(sql, callback);
};

ProductDAO.prototype.findById = function findById(id, callback) {
  this.connection.query('SELECT * FROM products WHERE id = ?', [id], callback);
};

ProductDAO.prototype.findByName = function findById(name, callback) {
  this.connection.query('SELECT * FROM products WHERE name = ?', [id], callback);
};

module.exports = function getProductDAO() {
  return ProductDAO;
};
