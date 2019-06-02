/*
 * Gary Luong
 * Tristan Hilbert
 *
 * 5/3/2019
 *
 * Module representing functionality
 * for all possible create functionality.
 *
 */


module.exports = (db) => {
    var express = require("express");
    var router = express.Router();

    /* Queries */

    function checkForPlayer(insertVals, res, next){
        var sql = "SELECT id FROM ssp_players where fname = ? and lname = ? and jersey = ?";
        var inserts = [insertVals["mvp-fname"], insertVals["mvp-lname"], insertVals["mvp-jersey"]];
        db.pool.query(sql, inserts, (error, results, fields) => {
            if(error){
                console.log(JSON.stringify(error));
                res.status(500).end();
            }else if(results.length == 0){ /* Because === [] does not work */
                res.status(409).send("MVP-DNE");
            }else{
                next(results[0].id);
            }
        });
    }

    function newGameWithId(insertVals, pid, res, next){
        if(pid){
            console.log("== This is the player id :" + pid);
        var sql =
                "INSERT INTO ssp_games (play_date, location, winning_team, mvp, score_home, score_visit) " +
                "VALUES (?, ?, ?, ?, ?, ?);";
        var inserts = [insertVals.date, insertVals.loc, insertVals.winning, pid, 
            insertVals["score-h"], insertVals["score-v"]];
        }else{
            var sql =
                "INSERT INTO ssp_games (play_date, location, winning_team, score_home, score_visit) " +
                "VALUES (?, ?, ?, ?, ?);";
            var inserts = [insertVals.date, insertVals.loc, insertVals.winning, 
                insertVals["score-h"], insertVals["score-v"]];
        }
        db.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error));
                res.status(500).end();
            }else{
                next(results.insertId);
            }
        });
    }

    /*
     * So The above code does a good job of adding a new game without knowing if there are teams
     * to match. The problem is that we have a mandatory many to many relationship with at least
     * two teams. This means that we need to drop the entry if it is not so. The function below
     * attempts to pair the teams but will drop the above entry if the query fails. This is assuming
     * that the "result.insertId" value is correct. It should also be noted, that even if the value
     * was not deleted, it would not show up in the site due to INNER JOINS preventing NULL values.
     * 
     * This is a semi-coupling approach, but it is not across modules so I will take this one as
     * a win. :D
     */
    

    function newGamesTeams(insertVals, res){
        var count = 0;
        function last(){
            count ++;
            if (count == 2){
                res.status(200).send();
            }
        }
        db.pool.query(
            "INSERT INTO ssp_games_teams (gid, tid, home_team) VALUES (?, ( " +
            "    SELECT id FROM ssp_teams WHERE name = ? AND location = ? " +
            "), ?);",
            [insertVals.id, insertVals["h-team"], insertVals["loc"], 1],
            (error, results, fields) => {
                if(error){
                    db.pool.query("DELETE FROM ssp_games WHERE ssp_games.id = ?", [insertVals.id], () => {});
                    console.log(JSON.stringify(error));
                    res.status(409).send("TEAM-DNE");
                }else{
                    last();
                }
            });

        db.pool.query(
            "INSERT INTO ssp_games_teams (gid, tid, home_team) VALUES (?, ( " +
            "    SELECT id FROM ssp_teams WHERE name = ? AND location = ? " +
            "), ?);",
            [insertVals.id, insertVals["v-team"], insertVals["v-team-loc"], 0],
            (error, results, fields) => {
                if(error){
                    db.pool.query("DELETE FROM ssp_games WHERE ssp_games.id = ?", [insertVals.id], () => {});
                    console.log(JSON.stringify(error));
                    res.status(409).send("TEAM-DNE");
                }else{
                    last();
                }
            });

    }


    /* Routes */
    
    router.post('/player', function(req, res){
        var sql = "INSERT INTO ssp_players (fname, lname, jersey, games, points) VALUES (?,?,?,?,?)";
        var inserts = [req.body.fname, req.body.lname, req.body.jersey, req.body.games,req.body.points];
        db.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.status(500).end();
            }else{
                
                sql = "INSERT INTO ssp_players_positions (player_id, position_id) " +
                "VALUES ((SELECT p.id FROM ssp_players p WHERE p.fname = ? AND p.lname = ? ORDER BY p.id DESC LIMIT 1), " +
                "(SELECT pos.id FROM ssp_positions pos WHERE pos.name = ?))";
                req.body.positions.forEach((element) => {
                    inserts = [req.body.fname, req.body.lname, element];
                    db.pool.query(sql, inserts, (error, results, fields) => {
                        if(error){
                            console.log(error)
                        }
                        console.log("== Query done!")
                    });
                });
                res.status(200).end();
            }
        });
    });
    
   router.post('/team', function(req, res){
        var sql = "INSERT INTO ssp_teams (name, location, color, coach) VALUES (?,?,?,?)";
        var inserts = [req.body.name, req.body.location, req.body.color, req.body.coach];
        db.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error));
                res.status(500).end();
            }else{
                res.status(200).end();
            }
        });

    });

    router.post('/game', function(req, res){
        if(req.body["score-h"] > req.body["score-v"]){
            req.body.winning = 1;
        }else{
            req.body.winning = 0;
        }

        function second(id){
            req.body["id"] = id;
            newGamesTeams(req.body, res);
        }

        function first(id){
            newGameWithId(req.body, id, res, second);
        }
        
        if(req.body["mvp-fname"] && req.body["mvp-fname"] != null){
            checkForPlayer(req.body, res, first);
        }else{
            first(null);
        }
        
    });

    router.post("/mascot", (req, res) => {
        var sql = 
        "INSERT INTO ssp_mascots (name, animal, team_id) " +
        "VALUES (?, ?, (SELECT id FROM ssp_teams WHERE name = ? AND location = ?));";
        var inserts = [req.body["mascot-name"], req.body["mascot-anim"], req.body["mascot-team"], req.body["mascot-team-loc"]];
        db.pool.query(sql, inserts, (error, results, fields) => {
            if(error){
                if(error.errno == 1062){
                    /* That team already has a mascot. */
                    res.status(409).send("TeamExists");
                }else if(error.errno == 1048){
                    res.status(409).send("TeamDNE");
                }else{
                    console.log("== Query Error!");
                    console.log(JSON.stringify(error));
                    res.status(500).end();
                }
            }else{
                res.status(200).end();
            }
        });
    });

    router.post("/pos", (req, res) => {
        var sql = 
        "INSERT INTO ssp_positions (name) " +
        "VALUES (?);";
        var inserts = [req.body["position-name"]];
        db.pool.query(sql, inserts, (error, results, fields) => {
            if(error){
                if(error.errno == 1062){
                    /* That team already has a mascot. */
                    res.status(409).send("PositionExists");
                }
                console.log("== Query Error!");
                console.log(JSON.stringify(error));
                res.status(500).end();
            }else{
                res.status(200).end();
            }
        });
    });




    return router;
};