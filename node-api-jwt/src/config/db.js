const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'mysql-jokast38.alwaysdata.net',
    user: 'jokast38_admin',
    password: '7vu.7wciUJ$5Zws',
    database: 'jokast38_bnk',
    timezone: 'UTC'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

module.exports = db;