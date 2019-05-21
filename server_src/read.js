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

    /* Util Functions */
    function sanitize(field) {
        /* INITIATE SANITIZATION */
        var i = field.indexOf(";");
        if (i != -1) {
            field = field.substring(0, i);
        }

        /* Also want to verify no subqueries... that would suck */
        i = field.indexOf("(");
        if (i != -1) {
            field = field.substring(0, i);
        }
        return field;
    }

    /* Query Functions */

    function getGames(name, context, res, next) {
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
                if (err) {
                    console.log("== Query ERROR");
                    console.log(err);
                    res.status(500).end();
                } else {
                    results.forEach((element) => {
                        element.game = true;
                        context.push(element);
                    });
                    next();
                }
            });

    }

    function getGamesStar( context, res, next) {
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
            "ORDER BY g.play_date DESC;",
            (err, results, fields) => {
                if (err) {
                    console.log("== Query ERROR");
                    console.log(err);
                    res.status(500).end();
                } else {
                    results.forEach((element) => {
                        element.game = true;
                        context.push(element);
                    });
                    next();
                }
            });

    }

    function getTeamsName(name, context, res, next) {
        db.pool.query(
            "SELECT t.name, t.location AS loc, t.color, t.coach FROM ssp_teams t " +
            "WHERE t.name = \"" + name + "\"",
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
            "SELECT t.name, t.location AS loc, t.color, t.coach FROM ssp_teams t",
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
            "pl.games, pl.points, pl.jersey AS \"jersey_num\", t.name AS teamName FROM ssp_players pl " +
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
            "pl.games, pl.points, pl.jersey AS \"jersey_num\", t.name AS teamName FROM ssp_players pl " +
            "LEFT JOIN ssp_teams t ON pl.team_id = t.id " +
            "WHERE pl.fname = \"" + name + "\" OR pl.lname = \"" + name + "\";",
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
            "pl.games, pl.points, pl.jersey AS \"jersey_num\", t.name AS teamName FROM ssp_players pl " +
            "LEFT JOIN ssp_teams t ON pl.team_id = t.id " +
            "WHERE pl.fname = \"" + fname + "\" OR pl.lname = \"" + lname + "\";",
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
            "pl.games, pl.points, pl.jersey AS \"jersey_num\", t.name AS teamName FROM ssp_players pl " +
            "LEFT JOIN ssp_teams t ON pl.team_id = t.id " +
            "WHERE pl.fname = \"" + lname + "\" OR pl.lname = \"" + fname + "\";",
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
        /* SO THIS IS WHERE SANITIZATION BECOMES IMPORTANT */
        /* either
        * Run through a structured protocol so sql injections aren't possible (TODO)
        * or
        * Check for bad characters (';' especially) */
        var name = req.params.name == null ? "" : req.params.name;
        var context = { results: [] };

        name = sanitize(name);

        if (name != "") {
            /* Sanitization complete -- Feel free to add on! */
            var queries = 0;
            function next() {
                console.log("== Query Finished!");
                queries++;
                if (queries >= 2) {
                    console.log("== Sending Rendered HTML!");

                    /* override layout */
                    context.layout = null;

                    res.status(200).render("results", context);
                }
            }
            getTeamsName(name, context.results, res, next);
            getGames(name, context.results, res, next);

        } else {
            res.status(404).end();
        }
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

    router.get("/pl-:name", (req, res) => {
        var name = req.params.name == null ? "" : req.params.name;
        var context = { results: [] };
        
        name = sanitize(name);

        if (name != "") {
            var queries = 0;
            function next() {
                console.log("== Query Finished!");
                queries++;
                if (queries >= 3) {
                    console.log("== Sending Rendered HTML!");

                    /* override layout */
                    context.layout = null;

                    res.status(200).render("results", context);
                }
            }
            getPlayersName(name, context.results, res, next);

        } else {
            res.status(404).end();
        }
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
        
        name = sanitize(name);

        if (name != "") {
            function next() {
                console.log("== Query Finished!");
                console.log("== Sending Rendered HTML!");

                /* override layout */
                context.layout = null;

                res.status(200).render("results", context);
            }
            getGames(name, context.results, res, next);

        } else {
            res.status(404).end();
        }
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
        
        name = sanitize(name);

        if (name != "") {
            function next() {
                console.log("== Query Finished!");
                console.log("== Sending Rendered HTML!");

                /* override layout */
                context.layout = null;

                res.status(200).render("results", context);
            }
            getTeamsName(name, context.results, res, next);

        } else {
            res.status(404).end();
        }
    });

    router.get("/ma", (req, res) => {
        var context = { results: [] };
        db.pool.query(
            "SELECT ssp_mascots.name, ssp_mascots.animal, ssp_teams.name AS teamName " +
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



    return router;
};