var mysql = require('mysql');
function con(){
        var connection = mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'',
            port:3306,
            database:'blog'
        });
        connection.connect(function (err) {
            if(err){
                console.log(err)
            }
        });
        return connection;
    };

    
var connection=con();

//增加
function  add(connection,name,psd,email) {
    connection.query('insert into reg value(?,?,?)', [name,psd, email], function(err, rows, fields){
        console.log(rows);
    });
};
// add(connection,444,444,"444@qq.com")
//删除
function del(connection,fname) {
    connection.query('DELETE FROM reg WHERE name = ?',[fname], function(err, rows, fields){
        console.log(rows);
    });
};
// del(connection,"444");
//修改
function change(connection,newname,newpsd,fname) {
    connection.query('UPDATE reg SET name = ?,psd = ? WHERE name = ?',[newname,newpsd,fname], function(err, result){
        console.log("changeddd");
    });
};
// change(connection,"333","333",444)
//查找
function find(connection,fname) {
    connection.query('select * from reg where name=?',[fname] ,function(err,result){
        console.log(result)
    });
};
// find(connection,333);
// connection.query('select * from reg' ,function(err,result){
//     console.log(result);
// });

module.exports ={
    con:con,
    add:add,
    del:del,
    change:change,
    find:find
};