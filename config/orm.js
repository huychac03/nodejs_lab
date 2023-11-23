const connection = require('./connection');

const orm = {
    viewAllMenu: function(cb) {
        connection.query("SELECT * FROM dish", function (err,data){
            if (err) cb(err,null);
            cb(null,data);
        });
    },
};
module.exports = orm;