

-- Team TABLE -------------------------------------------------------------------------------------------

-- Show entire table
SELECT * FROM ssp_teams;

-- Show table with the proper team name
SELECT t.id, t.name, t.location AS loc, t.color, t.coach FROM ssp_teams t
WHERE t.name = ":name";


-- insert team info into table. color will be added from backend code using css (ex. FFF00 for yellow)
INSERT INTO ssp_teams (name, location, color, coach)  
VALUES (':teamName', ':teamLocation', ':teamColor', ':coachName');

-- Update an entry.   Usually used for coach since coaches tend to change teams. 
UPDATE ssp_teams
SET coach = ':new_coachName'
WHERE ssp_teams.id = ':id'

-- Delete from all tables which have the Team_ID
DELETE FROM ssp_teams
WHERE id = ':teamID';


-- Player TABLE-------------------------------------------------------------------------------------------

-- EDIT 5/12: made the team name changed from int to entering the team name. 
INSERT INTO ssp_players(team_id, jersey, fname, lname, nickname, games, points)
VALUES ((select id from ssp_teams where name = ':teamName'), :insertJersey, ':insertFName', ':insertLName', ':insertNickname', :numGames, :numPoints);

-- edit 5/12 delete a player's info using first and last name
DELETE FROM ssp_players
WHERE fname = ":insertFname" and lname = 'insertLName';

-- Also Delete a player by ID, cause we got that too.
DELETE FROM ssp_players
WHERE id = ":playerId";

-- show all info for all players
SELECT * FROM ssp_players;

-- display the First Name of a player, Last Name of a player, the team they play for, and the coach name

SELECT ssp_players.fname, ssp_players.lname, ssp_teams.name, ssp_teams.coach
FROM ssp_players
INNER JOIN ssp_teams on ssp_players.team_id = ssp_teams.id;

-- Display all the fields except for id.
SELECT pl.fname AS "first_name", pl.lname AS "last_name", pl.nickname AS "nickname",
pl.games, pl.points, pl.jersey AS "jersey_num", t.name AS team FROM ssp_players pl
LEFT JOIN ssp_teams t ON pl.team_id = t.id;

-- Display all fields with fname or lname matching the player
SELECT pl.fname AS "first_name", pl.lname AS "last_name", pl.nickname AS "nickname",
pl.games, pl.points, pl.jersey AS "jersey_num", t.name AS teamName FROM ssp_players pl
LEFT JOIN ssp_teams t ON pl.team_id = t.id
WHERE pl.fname = ":val" OR pl.lname = ":val";

-- POSITION TABLE -------------------------------------------------------------------------------------------

-- show all names within positions.
SELECT pos.name FROM ssp_positions pos;

-- insert a position into the table
INSERT INTO ssp_positions(name) VALUES (':positionName');



-- Player-Position TABLE -------------------------------------------------------------------------------------------

-- edit 5/12 insert the player id and position id using the player's name and position name

-- insert a player into the table 
INSERT INTO ssp_players_positions (player_id, position_id)
VALUES (
    (SELECT p.id FROM ssp_players p 
    WHERE p.fname = ":fname" AND p.lname = ":lname" 
    ORDER BY p.id DESC 
    LIMIT 1
    ),
    (SELECT pos.id FROM ssp_positions pos WHERE pos.name = ?)
)

-- display the number of positions for a player and their respective first/last name
SELECT COUNT(ssp_positions.name), ssp_players.fname, ssp_players.lname
FROM ssp_players
INNER JOIN ssp_players_positions on ssp_players.id = ssp_players_positions.player_id
INNER JOIN ssp_positions on ssp_positions.id = ssp_players_positions.position_id
GROUP BY ssp_players.id;

SELECT ssp_positions.name
FROM ssp_positions
INNER JOIN ssp_players_positions ON ssp_positions.id = ssp_players_positions.position_id
INNER JOIN ssp_players ON ssp_players.id = ssp_players_positions.player_id
WHERE ssp_players.fname = ":insertFName" AND ssp_players.lname = ":insertLName";

SELECT ssp_positions.name
FROM ssp_positions
INNER JOIN ssp_players_positions ON ssp_positions.id = ssp_players_positions.position_id
INNER JOIN ssp_players ON ssp_players.id = ssp_players_positions.player_id
WHERE ssp_players.id = ":id";

-- Mascot TABLE -------------------------------------------------------------------------------------------

-- edit 5/12 insert mascot info using the team's name
-- insert the mascot info
INSERT INTO ssp_mascots (name, animal, team_id) VALUES (':insertActor', ':insertCharacter', (SELECT id FROM ssp_teams WHERE name = "teamName" AND location = ":locationName"));

-- delte mascot info
DELETE FROM ssp_mascots
WHERE animal = :insertCharacter;

-- display the mascot's name, character and the team it belongs to 

SELECT ssp_mascots.name, ssp_mascots.animal, ssp_teams.name AS teamName
FROM ssp_mascots
INNER JOIN ssp_teams on ssp_mascots.team_id = ssp_teams.id;


-- Game TABLE -------------------------------------------------------------------------------------------

-- insert game data.  
INSERT INTO ssp_games (play_date, location, winning_team, mvp, score_home, score_visit)
VALUES (':date', ':inputLocation', :insertBoolValue,  (SELECT id FROM ssp_players where fname = 'insertFName' and lname = 'insertLName' ), :insertHome, :insertAway);

-- display the game ID, game date, mvp ID, and first and last name of the player 

SELECT ssp_games.id, ssp_games.play_date, ssp_games.mvp, ssp_players.fname, ssp_players.lname
FROM ssp_players
INNER JOIN ssp_games on ssp_games.mvp = ssp_players.id;

-- delete any game based on ID
DELETE FROM ssp_games
WHERE ssp_games.id = :id;


-- Game to Team TABLE -------------------------------------------------------------------------------------------

-- insert matchup information

INSERT INTO ssp_games_teams (gid, tid, home_team) VALUES (:gameID, (
    SELECT id FROM ssp_teams WHERE team_name = :teamName AND location = :loc
), :isHomeTeam);


-- display the game id, home team name and away team name

SELECT ssp_games_teams.gid a.name as Home_Team, b.name as Away_Team,
from ssp_games_teams
Inner join ssp_teams a on ssp_games_teams.home_team = a.id
Inner join ssp_teams b on ssp_games_teams.tid = b.id; 


-- display the game id, home team name, home team score, away team name, away team score, the winning team (1 for home, 0 for away) and play date. 

SELECT ssp_games_teams.gid, a.name as Home_Team, ssp_games.score_home as Home_Score, b.name as Away_Team, ssp_games.score_visit, ssp_games.winning_team, ssp_games.play_date
from ssp_games_teams
Inner join ssp_teams a on ssp_games_teams.home_team = a.id
Inner join ssp_teams b on ssp_games_teams.tid = b.id
INNER JOIN ssp_games on ssp_games.id = ssp_games_teams.gid;

-- display the most recent game details -> More can be added to this later on!
SELECT g.play_date as "date", g.location as location, a.name as home, b.name as visit
from ssp_games g
INNER JOIN ssp_games_teams gta on g.id = gta.gid
INNER JOIN ssp_games_teams gtb on g.id = gtb.gid
Inner join ssp_teams a on a.id = gta.tid 
Inner join ssp_teams b on b.id = gtb.tid
WHERE gta.home_team = 1 AND gtb.home_team = 0
ORDER BY g.play_date DESC
LIMIT 1;

-- display all game details with the associated team names
SELECT g.play_date as "date", g.location as location, a.name as home, b.name as visit
from ssp_games g
INNER JOIN (
    SELECT * FROM ssp_games_teams gt
    WHERE gt.home_team = 1
    ) AS gth on g.id = gth.gid
INNER JOIN (
    SELECT * FROM ssp_games_teams gt
    WHERE gt.home_team = 0
    ) AS gtv on g.id = gtv.gid
INNER JOIN ssp_teams a on a.id = gth.tid
INNER JOIN ssp_teams b on b.id = gtv.tid
WHERE a.name = "Lakers" OR b.name = "Lakers"
ORDER BY g.play_date DESC;