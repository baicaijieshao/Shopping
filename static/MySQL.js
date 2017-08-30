// 连接MySQL数据库

var mysql = require('mysql');

var connection = mysql.createConnection({
	host 	 : 'localhost' ,
	user 	 : 'root' ,
	password : '#inxssafety' ,
	database : 'test'
});

connection.connect();
// 方法一
/*
connection.query('select * from person',function(error,results){
	if(error) throw error ;
	console.log('the solution is :' ,results)
});
*/

// 方法二
var username = '贾书杰' ;
var password = '123456' ;
var sql = "select * from person where name = ? and password = ?" ;
var sqlParams = [username,password];

connection.query(sql,sqlParams,function (error ,result){
	if(error){
		console.log('[select error] - ',error.message);
		return ;
	}
	console.log(result)
});


connection.end();









