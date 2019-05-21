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


    /* Query Functions */

    function getGames(name, context, res, next){
        db.pool.query(
            "SELECT g.play_date as \"date\", g.location as location, a.name as home, b.name as visit " +
            "from ssp_games g " +
            "INNER JOIN ( " +
            "    SELECT * FROM ssp_games_teams gt " +
            "    WHERE gt.home_team = 1 " +
            "    ) AS gth on g.id = gth.gid " +
            "INNER JOIN ( " +
            "    SELECT * FROM ssp_games_teams gt " +
            "    WHERE gt.home_team = 0 " +
            "    ) AS gtv on g.id = gtv.gid " +
            "INNER JOIN ssp_teams a on a.id = gth.tid " +
            "INNER JOIN ssp_teams b on b.id = gtv.tid " +
            "WHERE a.name = \"" + name + "\" OR b.name = \"" + name + "\" " +
            "ORDER BY g.play_date DESC;",
            (err, results, fields) => {
                if(err){
                    console.log("== Query ERROR");
                    console.log(err);
                    res.status(500).end();
                }else {
                    results.forEach((element) => {
                        element.game = true;
                        context.push(element);
                    });
                    next();
                }
            });

    }

    function getTeamsName(name, context, res, next){
        db.pool.query(
            "SELECT t.name, t.location AS loc, t.color, t.coach FROM ssp_teams t " +
            "WHERE t.name = \"" + name + "\"",
            (err, results, fields) => {
                if(err){
                    console.log("== Query ERROR");
                    console.log(err);
                    res.status(500).end();
                }else {
                    results.forEach((element) => {
                        element.team = true;
                        context.push(element);
                        
                    });
                    next();
                }
            });

    }
    /* GET Rules */

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

    router.get("/gt-:name", (req, res) => {
        /* SO THIS IS WHERE SANITIZATION BECOMES IMPORTANT */
        /* either
        * Run through a structured protocol so sql injections aren't possible (TODO)
        * or
        * Check for bad characters (';' especially) */
       var name = req.params.name == null ? "" : req.params.name;
       var context = { results:[] };
       /* INITIATE SANITIZATION */
        var i = name.indexOf(";");
        if(i != -1){
            name = name.substring(0, i);
        }
        
        /* Also want to verify no subqueries... that would suck */
        i = name.indexOf("(");
        if(i != -1){
            name = name.substring(0, i);
        }
           
        if(name != ""){
            /* Sanitization complete -- Feel free to add on! */
            var queries = 0;
            function next(){
                console.log("== Query Finished!");
                queries ++;
                if(queries >= 2){
                    console.log("== Sending Rendered HTML!");

                    /* override layout */
                    context.layout = null;

                    res.status(200).render("game_team_result", context);
                }
            }
            getTeamsName(name, context.results, res, next);
            getGames(name, context.results, res, next);
            
        }else{
            res.status(404).end();
        }
    });

    return router;
};