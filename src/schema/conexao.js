const mysql = require('mysql2');

const conexao = mysql.createConnection({
  host: 'localhost',
  port: 3307,
  user: "root",
  password: "123123",
  database: "agenda_petshop"
})

module.exports = conexao