var mysql=require('mysql');
var connection;

exports.connect = function() {
    connection=mysql.createPool({
        connectionLimit:100,
        host:'localhost',
        user:'back',
        password:'pass',
        database:'backdb'
    });
}

exports.get = function() {
    return connection;
};