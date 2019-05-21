/*
 * Gary Luong
 * Tristan Hilbert
 *
 * 5/19/2019
 *
 * Database config file
 *
 */

 
var mysql = require('mysql');
var pool = mysql.createPool({
 connectionLimit : 10,
 host            : /*hostname*/,
 user            : /*username*/,
 password        : /*password*/,
 database        : /*databasename*/
});

module.exports.pool = pool;