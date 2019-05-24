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

    router.post("/mrg", (req,res) => {
        res.status(200).send("OK");
    });
    
    return router;
};