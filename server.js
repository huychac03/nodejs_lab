const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const orm = require("./config/orm"); //cannot import package, finding a way to import package

app.engine('hbs', exphbs.engine({ extname: 'hbs', defaultLayout: false, layoutsDir: "views/layouts/"}));
app.set('view engine', 'hbs');

app.get('/', function (req,res) {
    orm.viewAllMenu(
        function (error,result){
            if (error){
                return res.render('layouts/error');
            }
            console.log(result);
            res.render("layouts/dishes_list", {result: result});})
});

app.get('/searchcategories', (req,res)=> {
    res.render('layouts/search_by_categories');
});

app.get('/searchorigin', (req,res)=> {
    res.render('layouts/search_by_origin');
});

app.get('/searchdishes', (req,res)=> {
    res.render('layouts/search_by_dishes');
});

app.listen(5000,() => {
    console.log('Server is starting at port ', 5000);
    console.log('localhost:',5000);
});