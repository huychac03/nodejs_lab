const express = require('express'); // Dùng 'require' function để load 1 module nào đó. ở đây dùng để import Express.js framework in a Node.js application

// 'express' module is a popular web framework for Node.js that simplifies the process of building web applications and APIs.
// Làm như trên sẽ giúp cho các functionality của Express framework đc available trong application của mình thông qua biến 'express'

const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
// Dùng để Parse (phân tích) phần body được gửi tới từ HTTP request
const mysql = require('mysql');


require('dotenv').config(); // Dùng để load và config các biến môi trường từ .env file thông qua 'dotenv' library 
    // The dotenv module is used for loading environment variables from a .env file into the process.env object

const app = express();  // express() là 1 function của Express framework. Khi gọi ra nó nó sẽ tạo ra 1 instance mới của Express application
// biến app sẽ chứa tất cả những thứ đc tạo ra
// mình dùng app để có thể configure and define routes, middleware, and other settings for your web application.

const port = process.env.PORT || 5555;
// thiết lập biến port thông qua process.env.PORT (tức là thiết lập môi trường <thông qua env>) nếu ko có gì thay đổi mình ko config lại thì nó sẽ lấy giá trị mặc định và ở đây là 5555



// Parsing middleware 
// Parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

// Static Files
app.use(express.static('public'));

// Templating Engine
app.engine('hbs', exphbs.engine({extname: '.hbs'})); // Bước này là để Set up Engine cho Express
    // 'hbs' là tên mình đặt
    // exphbs.engine({extname: '.hbs'})  
        // exphbs là instance của Handlebars mình đã define ở trên 
        // {extname: '.hbs'} dùng để chỉ rõ cho Express biết các file có '.hbs' file extension chính là các Handlebars templates

 
app.set('view engine', 'hbs'); // Dùng để set các application settings trong Express
        // 'view engine'  is a special setting that defines the default view engine for rendering views.
        // 'hbs' is the value you're setting for the view engine, indicating that you want to use Handlebars (with the 'hbs' name previously defined) as the template engine for rendering views.
   
// ==> với 2 config trên, khi dùng 'res.render()' trong route handlers để render view, Express sẽ tự động dùng Handlebars templating engine để render view với '.hbs' file extension.




// Connection Pool
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

// Connect to DB
pool.getConnection((err, connection) => {
    if(err) throw err;
    console.log('Connection as ID ' + connection.threadId);
});


const routes = require('./server/routes/menu');
app.use('/', routes);


app.listen(port, () => console.log('Listening on port ' + port))