var express = require('express');
var mysql = require('mysql');
var router = express.Router();
//创建连接
var connection = mysql.createConnection({
    host     : '192.168.2.150',
    user     : 'root',
    password : '123456',
    database : 'qhy'
});
//执行创建连接
connection.connect();
var  sql = 'SELECT * FROM user';
/* GET users listing. */
router.get('/', function(req, res, next) {

    connection.query(sql,function (err, result) {
        if(err){
            console.log('[INSERT ERROR] - ',err.message);
            return;
        }
        console.log(result)
        res.send(result);
    });

});

module.exports = router;
