const mysql = require(`mysql`);

// create connection
const db = mysql.createConnection(
    {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE
    }
);

// connect to mysql
db.connect((err) => {
    if (err) return console.error(err);
    return console.log("Connection to MySQL established!");
});

module.exports = db;