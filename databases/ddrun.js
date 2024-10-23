const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: '122.51.7.85',
    port: 3306,
    user: 'ddrun',
    password: 'MnBNR3f7G77eA6h8',
    database: 'ddrun'
});

module.exports = pool;