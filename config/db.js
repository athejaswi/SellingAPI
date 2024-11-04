const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '323849',
    database: 'SellingSetup',
    port: 3307
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed: ', err);
    } else {
        console.log('MySQL connected.');};
});

module.exports = db;
