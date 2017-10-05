const mysql = require('mysql');

function createMySQLConnection() {
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'iamroot',
    database: 'nodejs_crud_db',
  });
}

module.exports = function getConnection() {
  return createMySQLConnection;
};
