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
                        res.status(500).send();
                    }else{
                        res.status(200).send();
                    }
                }
            }
        )
    }


    return router;
};