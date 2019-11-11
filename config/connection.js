var mysql = require("mysql");
var keys = require('./keys.js');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: keys.mySQL.userName,
  password: key.mySQL.password,
  database: "burgers_db"
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

module.exports = connection;
