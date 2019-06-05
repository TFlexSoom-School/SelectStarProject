/*
 * Gary Luong
 * Tristan Hilbert
 *
 * 5/26/2019
 *
 * Module representing all Update Functionality
 *
 */


module.exports = (db) => {
    var express = require("express");
    var router = express.Router();
    var util = require("./util.js")(db);

    function deletePos(id, pid, res){
        db.pool.query(
            "DELETE FROM ssp_players_positions " + 
            "WHERE ssp_players_positions.player_id = ? " +
            "AND ssp_players_positions.position_id = ?",
            [id, pid],
            (error, results, fields) => {
                if(error){
                    console.log(error);
                    res.status(500).end();
                }else{
                    res.status(200).end();
                }
            });
    }

    function addPos(id, pid, res){
        db.pool.query(
            "INSERT ssp_players_positions (player_id, position_id) " +
            "VALUES (?,?)",
            [id, pid],
            (error, results, fields) => {
                if(error){
                    console.log(error);
                    res.status(500).end();
                }else{
                    res.status(200).end();
                }
            });
    }

    function updatePos(id, posName, res){
        function branch(pid){
            db.pool.query(
                "SELECT ppos.player_id FROM ssp_players_positions ppos " +
                "WHERE ppos.player_id = ? AND ppos.position_id = ? LIMIT 1",
                [id, pid],
                (error, results, fields) => {
                    if(error){
                        console.log(error);
                        res.status(500).end();
                    }else{
                        if(results.length){
                            deletePos(id, pid, res);
                        }else{
                            addPos(id, pid, res);
                        }
                    }
                });
        }
        db.pool.query(
            "SELECT pos.id FROM ssp_positions pos WHERE pos.name = ?",
            [posName],
            (error, results, fields) => {
                if(error){
                    console.log(error);
                    res.status(500).end();
                }else{
                    if(results.length){
                        var pid = results[0].id;
                        branch(pid);
                    }else{
                        res.status(500).end();
                    }
                }
            });
    }

    function updateTeamCoach(id, name, res){
        db.pool.query(
            "UPDATE ssp_teams " +
            "SET coach = ?" +
            "WHERE ssp_teams.id = ?",
            [name, id],
            (error, results, fields) => {
                if(error){
                    res.status(500).end();
                }else{
                    res.status(200).end();
                }
            });
    }

    function removeTeamId(id, res, next){
        util.playersTeamHasCollateral(id, 
            () =>{
                db.pool.query(
                    "UPDATE ssp_players pl SET pl.team_id = NULL WHERE pl.id = ?;",
                    [id],
                    (error, results, fields)=>{
                        if(error){
                            console.log("== Query Error!");
                            console.log(JSON.stringify(error));
                            res.status(500).end();
                        }else{
                            next();
                        }
                    });
            },
            () => {
                res.status(409).send("TeamMand");
            })
    }

    function updateTeamId(context, res, next){
        var sql = 
        "UPDATE ssp_players pl " +
        "SET pl.team_id = " +
        "(SELECT t.id FROM ssp_teams t WHERE t.name = ? AND t.location = ? LIMIT 1) " +
        "WHERE pl.id = ?;";
        util.playersTeamHasCollateral(context.id,
            () => {
                db.pool.query(sql, [context["team-name"], context["team-loc"], context.id],
                (error, results, fields) => {
                    if(error){
                        console.log("== Query Error!");
                        console.log(JSON.stringify(error));
                        res.status(500).end();
                    }else{
                        next();
                    }
                });
            },
            () => {
                res.status(409).send("TeamMand");
            })
    }

    /* Post Routes */

    router.post("/pos-up", (req, res) => {
        var id = req.body.id;
        var posName = req.body.posName;
        updatePos(id, posName, res);
    });

    router.post("/team-coach", (req, res) => {
        updateTeamCoach(req.body.id, req.body.name, res);
    });

    router.post("/pl-team-up", (req, res) => {
        function success(){
            res.status(200).end();
        }
        if(req.body.None){
            removeTeamId(req.body.id, res, success);
        }else{
            updateTeamId(req.body, res, success);
        }
    });
    
    return router;
};