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


    /* Routes */

    router.post("/mascot/:id", (req, res) => {
        db.pool.query(
            "DELETE FROM ssp_mascots WHERE ssp_mascots.id = ?",
            [req.params.id],
            (error, results, fields) =>{
                if(error){
                    console.log("== Query Error");
                    res.status(500).end();
                }else{
                    res.status(200).end();
                }
            });
    });


    return router;
};