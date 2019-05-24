/*
 * Gary Luong
 * Tristan Hilbert
 *
 * 5/19/2019
 *
 * MySQL connection starter for server startup.
 * 
 * RET: MySQL Object
 */


module.exports = () => {
    var db = require("./dbcon.js");
    if(db){
        db.pool.getConnection((err, connection) => {
            if(err){
                console.log("== Could not get mysql connnection");
                throw err
            }else{
                console.log("== MYSQL CONNECITON SUCCESSFUL!");
            }
        });
        
        return db;
    }else{
        console.log("== 'db' undefined in module 'server_src/mysql.js'");
        throw newError("db invalid");
    }
};
