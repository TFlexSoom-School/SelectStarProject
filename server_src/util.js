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
    var r_exports = {};
    
    /* Utility Queries */
    r_exports.playersTeamHasCollateral = function playersTeamHasCollateral(id, true_func, false_func){
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

    
    return r_exports;

};