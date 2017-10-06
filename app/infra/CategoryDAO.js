function CategoryDAO(connection) {
  this.connection = connection;
}

CategoryDAO.prototype.findAll = function findAll(callback) {
  this.connection.query('SELECT * FROM categories', callback);
};

CategoryDAO.prototype.findById = function findById(id, callback) {
  this.connection.query('SELECT * FROM categories WHERE id = ?', [id], callback);
};

CategoryDAO.prototype.save = function save(category, callback) {
  this.connection.query('INSERT INTO categories SET ?', category, callback);
};

module.exports = function getCategoryDAO() {
  return CategoryDAO;
};
