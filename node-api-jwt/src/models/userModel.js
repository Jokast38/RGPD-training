const mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'mysql-jokast38.alwaysdata.net',
    user: 'jokast38_admin',
    password: '7vu.7wciUJ$5Zws',
    database: 'jokast38_bnk',
    timezone: 'UTC'
});

pool.query = util.promisify(pool.query);

class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    static async createUser(username, password) {
        const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
        const result = await pool.query(query, [username, password]);
        return result.insertId;
    }

    static async getUserByUsername(username) {
        const query = 'SELECT * FROM users WHERE username = ?';
        const results = await pool.query(query, [username]);
        return results[0];
    }
}

module.exports = User;