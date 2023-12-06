const mysql = require('mysql');


// Connection Pool
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});






exports.view = (req, res) => {
    // Connect to DB
    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log('Connection as ID ' + connection.threadId);

        // Use the connection
        connection.query('SELECT name, price FROM dish where available = 1',(err, rows) => {
            // When done with the connection, release it 
            connection.release();

            if(!err){
                res.render('home', {rows});
            } else {
                console.log(err);
            }

            console.log('Data: \n', rows);
        });
    });
}


exports.dishDetails = (req, res) => {
    const dishName = req.query.dishName;
    // Connect to DB
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Connection as ID ' + connection.threadId);

        // Use the connection
        const setSqlModeQuery = "SET sql_mode=''";
        connection.query(setSqlModeQuery, (err) => {
            if (err) {
                console.error('Error setting sql_mode: ' + err.message);
                connection.release();
                throw err;
            }

            connection.query('SELECT d.name, d.price, c.name AS category, GROUP_CONCAT(DISTINCT o.name) AS origins, GROUP_CONCAT(DISTINCT i.name) AS ingredients FROM dish AS d INNER JOIN dish_origin AS od ON d.ID = od.dish_ID INNER JOIN origin AS o ON od.origin_ID = o.ID INNER JOIN category AS c ON d.category_ID = c.ID INNER JOIN recipe AS r ON r.dish_ID = d.ID INNER JOIN ingredient AS i ON i.ID = r.ingredient_ID WHERE d.available = 1 AND d.name = ?', [dishName], (err, rows) => {
                // When done with the connection, release it
                connection.release();

                if (!err) {
                    res.render('dishDetails', { rows });
                } else {
                    console.log(err);
                }

                console.log('Data: \n', rows);
            });
        });
    });
};




exports.searchMain = (req, res) => {
    res.render('search');
}


exports.searchByOrigin = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log('Connection as ID ' + connection.threadId);


        let searchTerm = req.body.search;  // ở đây đoạn cuối là .search bới vì trong file HTML mình có cái thẻ tên là search ấy và method của nó là POST 
                                            // thì nó sẽ dùng lệnh này để có thể access đc value của search field đó.

        // Use the connection
        connection.query('SELECT d.name, d.price FROM dish AS d INNER JOIN dish_origin AS od ON d.ID = od.dish_ID INNER JOIN origin AS o ON od.origin_ID = o.ID WHERE d.available = 1 AND o.name =  ?', [searchTerm] ,(err, rows) => {
            // When done with the connection, release it 
            connection.release();

            if(!err){
                res.render('searchByOrigin', {rows, searchTerm});
            } else {
                console.log(err);
            }

            console.log('Data: \n', rows);
        });
    });
}




exports.searchByCategory = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log('Connection as ID ' + connection.threadId);


        let searchTerm = req.body.search;  // ở đây đoạn cuối là .search bới vì trong file HTML mình có cái thẻ tên là search ấy và method của nó là POST 
                                            // thì nó sẽ dùng lệnh này để có thể access đc value của search field đó.

        // Use the connection
        connection.query('SELECT d.name, d.price FROM dish AS d INNER JOIN category AS c ON d.category_ID = c.ID WHERE d.available = 1 AND c.name =  ?', [searchTerm] ,(err, rows) => {
            // When done with the connection, release it 
            connection.release();

            if(!err){
                res.render('searchByCategory', {rows, searchTerm});
            } else {
                console.log(err);
            }

            console.log('Data: \n', rows);
        });
    });
}



exports.searchByName = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log('Connection as ID ' + connection.threadId);


        let searchTerm = req.body.search;  // ở đây đoạn cuối là .search bới vì trong file HTML mình có cái thẻ tên là search ấy và method của nó là POST 
                                            // thì nó sẽ dùng lệnh này để có thể access đc value của search field đó.

        // Use the connection
        connection.query('SELECT name, price FROM dish where available = 1 AND name =  ?', [searchTerm] ,(err, rows) => {
            // When done with the connection, release it 
            connection.release();

            if(!err){
                res.render('home', {rows});
            } else {
                console.log(err);
            }

            console.log('Data: \n', rows);
        });
    });
}



exports.ingredientDetails = (req, res) => {
    // Connect to DB
    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log('Connection as ID ' + connection.threadId);

        // Use the connection
        connection.query('SELECT i.name, i.unit, w.importDate, w.expiredDate, w.quantity FROM ingredient AS i INNER JOIN warehose AS w ON w.ingredient_ID = i.ID',(err, rows) => {
            // When done with the connection, release it 
            connection.release();

            if(!err){
                res.render('ingredientDetails', {rows});
            } else {
                console.log(err);
            }

            console.log('Data: \n', rows);
        });
    });
}