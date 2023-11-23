const mysql = require('mysql');
let connection;

if (process.env.JAWSDB_URL){
    connection = mysql.createConnection(process.env.JAWSDB_URL);
}
else {
    connection = mysql.createConnection(
        {
            host: 'localhost',
            user: 'root',
            password: '12345',
            database: 'emenu',
            port: 3306
        }
    );
}

connection.connect();

module.exports = connection;