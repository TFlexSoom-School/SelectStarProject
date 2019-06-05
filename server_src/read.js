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
    /* Function ->*/ var escape = require("mysql").escape;

    /* Query Functions */

    function getGames(name, context, res, next) {
        db.pool.query(
            "SELECT g.id, g.play_date as \"date\", g.location as location, g.mvp, a.name as home, b.name as visit, " +
            "g.score_home as h_score, g.score_visit as v_score, g.winning_team from ssp_games g " +
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
            "WHERE a.name = "+ escape(name) + " OR b.name =" + escape(name) +
            " ORDER BY g.play_date DESC;",
            (err, results, fields) => {
                if (err) {
                    console.log("== Query ERROR");
                    console.log(err);
                    res.status(500).end();
                } else {
                    var mvps = 0;
                    function finished(){
                        if(mvps == 0){
                            next();
                        }
                    }
                    results.forEach((element) => {
                        element.game = true;

                        if(element.winning_team == 1){
                            element.winner = element.home;
                        }else if(element.winning_team == 0){
                            element.winner = element.visit;
                        }

                        /* I should have just done stored procedures by this point */
                        /* I need some logic in my SQL code... */
                        if(element.mvp != null){
                            mvps ++;
                            var mvpInfo = [];
                            function gotMVP(){
                                element.mvp = {id: element.mvp, name: mvpInfo[0].name};
                                context.push(element);
                                mvps --;
                                finished();
                            }
                            getPlayersId(element.mvp, mvpInfo, res, gotMVP);
                        }else{
                            context.push(element);
                        }
                    });

                    finished();
                }
            });

    }

    function getGamesStar(context, res, next) {
        db.pool.query(
            "SELECT g.id, g.play_date as \"date\", g.location as location, g.mvp, a.name as home, b.name as visit, " +
            "g.score_home as h_score, g.score_visit as v_score, g.winning_team from ssp_games g " +
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
            "ORDER BY g.play_date DESC;",
            (err, results, fields) => {
                if (err) {
                    console.log("== Query ERROR");
                    console.log(err);
                    res.status(500).end();
                } else {
                    var mvps = 0;
                    function finished(){
                        if(mvps == 0){
                            next();
                        }
                    }
                    results.forEach((element) => {
                        element.game = true;

                        if(element.winning_team == 1){
                            element.winner = element.home;
                        }else if(element.winning_team == 0){
                            element.winner = element.visit;
                        }
                        /* I should have just done stored procedures by this point */
                        /* I need some logic in my SQL code... */
                        if(element.mvp != null){
                            mvps ++;
                            var mvpInfo = [];
                            function gotMVP(){
                                element.mvp = {
                                    id: element.mvp, 
                                    name: (mvpInfo[0].first_name + " " + mvpInfo[0].last_name)
                                };
                                context.push(element);
                                mvps --;
                                finished();
                            }
                            getPlayersId(element.mvp, mvpInfo, res, gotMVP);
                        }else{
                            context.push(element);
                        }
                    });

                    finished();
                }
            });

    }

    function getTeamsName(name, context, res, next) {
        db.pool.query(
            "SELECT t.id, t.name, t.location AS loc, t.color, t.coach FROM ssp_teams t " +
            "WHERE t.name =" + escape(name),
            (err, results, fields) => {
                if (err) {
                    console.log("== Query ERROR");
                    console.log(err);
                    res.status(500).end();
                } else {
                    results.forEach((element) => {
                        element.team = true;
                        context.push(element);

                    });
                    next();
                }
            });

    }

    function getTeamsStar(context, res, next) {
        db.pool.query(
            "SELECT t.id, t.name, t.location AS loc, t.color, t.coach FROM ssp_teams t",
            (err, results, fields) => {
                if (err) {
                    console.log("== Query ERROR");
                    console.log(err);
                    res.status(500).end();
                } else {
                    results.forEach((element) => {
                        element.team = true;
                        context.push(element);

                    });
                    next();
                }
            });

    }

    /* TODO Add positions */
    function getPlayersStar(context, res, next) {
        db.pool.query(
            "SELECT pl.fname AS \"first_name\", pl.lname AS \"last_name\", pl.nickname AS \"nickname\", " +
            "pl.games, pl.points, pl.jersey AS \"jersey_num\", pl.id, " +
            "t.name AS teamName FROM ssp_players pl " +
            "LEFT JOIN ssp_teams t ON pl.team_id = t.id;",
            (err, results, fields) => {
                if (err) {
                    console.log("== Query ERROR");
                    console.log(err);
                    res.status(500).end();
                } else {
                    results.forEach((element) => {
                        element.player = true;
                        context.push(element);

                    });
                    next();
                }
            });
    }

    /* TODO Add positions */
    /* TODO make more modular -- # of spaces = number of nexts required */
    function getPlayersName(name, context, res, next) {
        db.pool.query(
            "SELECT pl.fname AS \"first_name\", pl.lname AS \"last_name\", pl.nickname AS \"nickname\", " +
            "pl.games, pl.points, pl.jersey AS \"jersey_num\", pl.id, " +
            "t.name AS teamName FROM ssp_players pl " +
            "LEFT JOIN ssp_teams t ON pl.team_id = t.id " +
            "WHERE pl.fname =" + escape(name) + " OR pl.lname ="  + escape(name),
            (err, results, fields) => {
                if (err) {
                    console.log("== Query ERROR");
                    console.log(err);
                    res.status(500).end();
                } else {
                    results.forEach((element) => {
                        element.player = true;
                        context.push(element);

                    });
                    next();
                }
            });
        
        var index = name.indexOf(" ");
        if(index == -1){
            next();
            next();
            return;
        }

        var fname = name.substring(0, index);
        var lname = name.substring(index + 1, name.length);
        db.pool.query(
            "SELECT pl.fname AS \"first_name\", pl.lname AS \"last_name\", pl.nickname AS \"nickname\", " +
            "pl.games, pl.points, pl.jersey AS \"jersey_num\", pl.id, " +
            "t.name AS teamName FROM ssp_players pl " +
            "LEFT JOIN ssp_teams t ON pl.team_id = t.id " +
            "WHERE pl.fname =" + escape(fname) + "OR pl.lname = " + escape(lname),
            (err, results, fields) => {
                if (err) {
                    console.log("== Query ERROR");
                    console.log(err);
                    res.status(500).end();
                } else {
                    results.forEach((element) => {
                        element.player = true;
                        context.push(element);

                    });
                    next();
                }
            });
        db.pool.query(
            "SELECT pl.fname AS \"first_name\", pl.lname AS \"last_name\", pl.nickname AS \"nickname\", " +
            "pl.games, pl.points, pl.jersey AS \"jersey_num\", pl.id, " +
            "t.name AS teamName FROM ssp_players pl " +
            "LEFT JOIN ssp_teams t ON pl.team_id = t.id " +
            "WHERE pl.fname =" + escape(lname) + " OR pl.lname = " + escape(fname),
            (err, results, fields) => {
                if (err) {
                    console.log("== Query ERROR");
                    console.log(err);
                    res.status(500).end();
                } else {
                    results.forEach((element) => {
                        element.player = true;
                        context.push(element);

                    });
                    next();
                }
            });
    }

    /* TODO make more modular -- # of spaces = number of nexts required */
    function getPlayersId(id, context, res, next) {
        db.pool.query(
            "SELECT pl.fname AS \"first_name\", pl.lname AS \"last_name\", pl.nickname AS \"nickname\", " +
            "pl.games, pl.points, pl.jersey AS \"jersey_num\", pl.id, " +
            "t.name AS teamName FROM ssp_players pl " +
            "LEFT JOIN ssp_teams t ON pl.team_id = t.id " +
            "WHERE pl.id = ? LIMIT 1", 
            [id],
            (err, results, fields) => {
                if (err) {
                    console.log("== Query ERROR");
                    console.log(err);
                    res.status(500).end();
                } else {
                    context.push(results[0]);
                    next();
                }
            });
    }

    function getPositionsPlayerId(id, context, res, next){
        db.pool.query(
            "SELECT ssp_positions.name AS 'position_name'" +
            "FROM ssp_positions " +
            "INNER JOIN ssp_players_positions ON ssp_positions.id = ssp_players_positions.position_id " +
            "INNER JOIN ssp_players ON ssp_players.id = ssp_players_positions.player_id " +
            "WHERE ssp_players.id = ?",
            [id],
            (err, results, fields) =>{
                if(err){
                    console.log("== Query ERROR");
                    console.log(err);
                    res.status(500).end();
                }else{
                    /* Scope of context prevents equal operator */
                    results.forEach((element) => {
                        context.push(element);
                    });
                    next();
                }
            });
    }

    function getFreeAgentsStar(context, res, next){
        db.pool.query(
            "SELECT pl.id, pl.fname, pl.lname, pl.jersey " +
            "FROM ssp_players pl " +
            "WHERE pl.team_id IS NULL;",
            (err, results, fields) => {
                if(err){
                    console.log("== Query ERROR");
                    console.log(err);
                    res.status(500).end();
                }else{
                    results.forEach((element) => {
                        context.push(element);
                    });
                    next();
                }
            });
    }


    /* Other Utility Functions */

    function formatPlayerStrings(playerObjectArray){
        var text = "";
        for(var i = 0; i < playerObjectArray.length; i ++){
            text = playerObjectArray[i].fname + " " + playerObjectArray[i].lname;
            text += " Jersey Number: " + playerObjectArray[i].jersey;
            delete playerObjectArray[i].fname;
            delete playerObjectArray[i].lname;
            delete playerObjectArray[i].jersey;
            playerObjectArray[i].playerDetails = text;
        }
    }

    /* GET Rules */

    router.get("/mrg", (req, res) => {
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
            (err, results, fields) => {
                if (err) {
                    console.log("== Query ERROR");
                    console.log(err);
                    res.status(500).end();
                } else {
                    res.status(200).send(JSON.stringify(results[0]));
                }
            });
    });

    router.get("/gt-:name", (req, res) => {
        var name = req.params.name == null ? "" : req.params.name;
        var context = { results: [] };
        var queries = 0;
        function next() {
            queries++;
            if (queries >= 2) {

                /* override layout */
                context.layout = null;

                res.status(200).render("results", context);
            }
        }
        getTeamsName(name, context.results, res, next);
        getGames(name, context.results, res, next);
    });

    router.get("/pl", (req, res) => {
        var context = { results: [] };
        function next() {
            /* override layout */
            context.layout = null;
            res.status(200).render("results", context);
        }
        getPlayersStar(context.results, res, next);
    });

    router.get("/pl-free-agents", (req, res) => {
        var results = [];
        function next(){
            formatPlayerStrings(results);
            res.status(200).send(JSON.stringify({players: results}));
        }
        getFreeAgentsStar(results, res, next);
    });

    router.get("/pl-:name", (req, res) => {
        var name = req.params.name == null ? "" : req.params.name;
        var context = { results: [] };
        var queries = 0;
        function next() {
            queries++;
            if (queries >= 3) {

                /* override layout */
                context.layout = null;

                res.status(200).render("results", context);
            }
        }
        getPlayersName(name, context.results, res, next);
    });

    router.get("/pos", (req, res) => {
        var context = { positions: [], isPartial: true, layout: null};
        db.pool.query(
            "SELECT pos.name FROM ssp_positions pos;",
            (err, results, fields) => {
                if (err) {
                    console.log("== Query ERROR");
                    console.log(err);
                    res.status(500).end();
                } else {
                    results.forEach((element) => {
                        context.positions.push(element);
                    });
                    res.status(200).render("positions", context);
                }
            });
    });

    router.get("/ga", (req, res) => {
        var context = { results: [] };
        function next() {
            /* override layout */
            context.layout = null;
            res.status(200).render("results", context);
        }
        getGamesStar(context.results, res, next);
    });

    router.get("/ga-:name", (req, res) => {
        var name = req.params.name == null ? "" : req.params.name;
        var context = { results: [] };
        function next() {

            /* override layout */
            context.layout = null;

            res.status(200).render("results", context);
        }
        getGames(name, context.results, res, next);
    });

    router.get("/team", (req, res) => {
        var context = { results: [] };
        function next() {
            /* override layout */
            context.layout = null;
            res.status(200).render("results", context);
        }
        getTeamsStar(context.results, res, next);
    });

    router.get("/team-:name", (req, res) => {
        var name = req.params.name == null ? "" : req.params.name;
        var context = { results: [] };
        function next() {

            /* override layout */
            context.layout = null;

            res.status(200).render("results", context);
        }
        getTeamsName(name, context.results, res, next);
    });

    router.get("/ma", (req, res) => {
        var context = { results: [] };
        db.pool.query(
            "SELECT ssp_mascots.id, ssp_mascots.name, ssp_mascots.animal, ssp_teams.name AS teamName " +
            "FROM ssp_mascots " +
            "INNER JOIN ssp_teams on ssp_mascots.team_id = ssp_teams.id;",
            (err, results, fields) => {
                if (err) {
                    console.log("== Query ERROR");
                    console.log(err);
                    res.status(500).end();
                } else {
                    results.forEach((element) => {
                        element.mascot = true;
                        context.results.push(element);

                    });

                    context.layout = null;

                    res.status(200).render("results", context);
                }
            });
    });

    router.get("/pl-detail/:id", (req, res) => {
        var players = [];
        var positions = [];
        var queries = 0;
        function next(){
            queries ++;
            if(queries == 2){
                var context = players[0];
                if(positions !== []){
                    context.position = positions;
                }
                res.status(200).location("/").render("player-detail", context);
            }
        }
        getPlayersId(req.params.id, players, res, next);
        getPositionsPlayerId(req.params.id, positions, res, next);
    });

    return router;
};