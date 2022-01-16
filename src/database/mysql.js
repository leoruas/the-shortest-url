const mysql = require('mysql');

var pool = mysql.createPool({
    "user": process.env.MYSQL_USER,
    "password": process.env.MYSQL_PASSWORD,
    "database": process.env.MYSQL_DATABASE,
    "host": process.env.MYSQL_HOST,
    "port": process.env.MYSQL_PORT
})

// Create urls table if necessary
pool.getConnection(((error, conn) => {
    if (error) {
        return res.status(500).send({ error: error });
    }

    conn.query(`
        CREATE TABLE IF NOT EXISTS urls(
            id int primary key auto_increment,
            url varchar(255) not null
        )
    `, (err, results, fields) => {
        conn.release()
        if (err) {
            console.log(err.message);
        }
    })
}))

exports.pool = pool;