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

    /* Utility Queries */
    function teamHasCollateral(id, true_func, false_func){
        db.pool.query(
            "SELECT pl.team_id FROM ssp_players pl WHERE pl.id = ?;",
            [id],
            (error, results, fields) => {
                if(error){
                    false_func();
                }else if(results[0].team_id == null){
                    true_func();
                }else{
                    db.pool.query(
                                "SELECT pl.id FROM ssp_players pl WHERE pl.team_id = ?;",
                                [results[0].team_id],
                                (error, results, fields) => {
                                    if(error){
                                        false_func();
                                    }else if(results.length > 1){
                                        true_func();
                                    }else{
                                        false_func();
                                    }
                                });
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
        teamHasCollateral(req.params.id, 
        () => {
            var sql = "DELETE FROM ssp_players WHERE id = ?;";
            simpleQuery(sql, [req.params.id], res);
        }, 
        () =>{
            res.status(409).send("TeamMand");
        });
    });

    router.post("/game-:id", (req, res) =>{
        var sql = "DELETE FROM ssp_games WHERE ssp_games.id = ?;";
        simpleQuery(sql, [req.params.id], res);
    });

    return router;
};