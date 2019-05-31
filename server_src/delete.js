/*
 * Gary Luong
 * Tristan Hilbert
 *
 * 5/3/2019
 *
 * DELETE module for SportsStatsPlus
 *
 */

module.exports = (db) => {
    var express = require("express");
    var router = express.Router();

    /* Function Definitions */
    function deleteGameById(id, res){
        db.pool.query(
            "DELETE FROM ssp_games " +
            "WHERE ssp_games.id = ?",
            [id],
            (error, results, fields) => {
                if(res){
                    if(error){
                        console.log("== Query Error");
                        res.status(500).end();
                    }else{
                        res.status(200).end();
                    }
                }
            }
        )
    }

    function simpleQuery(query, inserts, res){
        db.pool.query(query, inserts, (error, results, fields) =>{
                if(error){
                    console.log("== Query Error");
                    res.status(500).end();
                }else{
                    res.status(200).end();
                }
            });
    }

    /* Routes */

    router.post("/mascot-:id", (req, res) => {
        var sql = "DELETE FROM ssp_mascots WHERE ssp_mascots.id = ?;";
        simpleQuery(sql, [req.params.id], res);
    });

    router.post("/team-:id", (req, res) =>{
        var sql = "DELETE FROM ssp_teams WHERE id = ?;";
        simpleQuery(sql, [req.params.id], res);
    });

    router.post("/player-:id", (req, res) =>{
        console.log(req.url);
        console.log(req.params);
        var sql = "DELETE FROM ssp_players WHERE id = ?;";
        simpleQuery(sql, [req.params.id], res);
    });

    router.post("/game-:id", (req, res) =>{
        var sql = "DELETE FROM ssp_games WHERE ssp_games.id = ?;";
        simpleQuery(sql, [req.params.id], res);
    });

    return router;
};