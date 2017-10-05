const mysql = require('mysql');

function createMySQLConnection() {
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejs_crud_db',
  });
}

module.exports = function getConnection() {
  return createMySQLConnection;
};
