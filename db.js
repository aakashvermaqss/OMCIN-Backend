const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'aakash@qss',
    database: 'OMCIN'
});

connection.connect(err => {
    if (err) throw err;
    console.log('Connected to the MySQL database');
});

module.exports = connection;
