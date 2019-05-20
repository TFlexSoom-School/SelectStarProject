/*
 * Gary Luong
 * Tristan Hilbert
 *
 * 5/3/2019
 *
 * Module representing functionality
 * for all possible read functionality.
 *
 */


module.exports = (db) => {
    var express = require("express");
    var router = express.Router();
    
    router.get("/mrg", (req,res) => {
        db.pool.query(
        "SELECT g.play_date as \"date\", g.location as location, a.name as home, b.name as visit " +
        " from ssp_games g " +
        " INNER JOIN ssp_games_teams gta on g.id = gta.gid " +
        " INNER JOIN ssp_games_teams gtb on g.id = gtb.gid " +
        " Inner join ssp_teams a on a.id = gta.tid  " +
        " Inner join ssp_teams b on b.id = gtb.tid " +
        " WHERE gta.home_team = 1 AND gtb.home_team = 0 " +
        " ORDER BY g.play_date DESC " +
        " LIMIT 1; ", 
        (err, results, fields) =>{
            if(err){
                console.log("== Query ERROR");
                console.log(err);
                res.status(500).end();
            }else{
                res.status(200).send(JSON.stringify(results[0]));
            }
        });
    });

    return router;
};