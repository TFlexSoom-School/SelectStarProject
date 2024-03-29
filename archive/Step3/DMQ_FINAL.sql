

-- Team TABLE -------------------------------------------------------------------------------------------

-- Show entire table
SELECT * FROM ssp_teams;

-- insert team info into table. color will be added from backend code using css (ex. FFF00 for yellow)
INSERT INTO ssp_teams (name, location, color, coach)  
VALUES (':teamName', ':teamLocation', ':teamColor', ':coachName');

-- Update an entry.   Usually used for coach since coaches tend to change teams. 
UPDATE ssp_teams
SET coach = ':new_coachName'
WHERE coach = ':coachName';

-- Delete from all tables which have the Team_ID
DELETE FROM ssp_teams
WHERE id = ':teamID';


-- Player TABLE-------------------------------------------------------------------------------------------

-- EDIT 5/12: made the team name changed from int to entering the team name. 
INSERT INTO ssp_players(team_id, jersey, fname, lname, nickname, games, points)
VALUES ((select id from ssp_teams where name = ':teamName'), :insertJersey, ':insertFName', ':insertLName', ':insertNickname', :numGames, :numPoints);

-- edit 5/12 delete a player's info using first and last name
DELETE FROM ssp_players
WHERE fname = ":insertFname" and lname = 'insertLName'

-- show all info for all players
SELECT * FROM ssp_players;

-- display the First Name of a player, Last Name of a player, the team they play for, and the coach name

SELECT ssp_players.fname, ssp_players.lname, ssp_teams.name, ssp_teams.coach
FROM ssp_players
INNER JOIN ssp_teams on ssp_players.team_id = ssp_teams.id;

-- POSITION TABLE -------------------------------------------------------------------------------------------

-- show entire table
SELECT * FROM ssp_positions;

-- insert a position into the table
INSERT INTO ssp_positions(id, name) VALUES (:insertPositionInt, ':positionName');



-- Player-Position TABLE -------------------------------------------------------------------------------------------

-- edit 5/12 insert the player id and position id using the player's name and position name

-- insert a player into the table 
INSERT INTO ssp_players_positions (player_id, position_id)
VALUES ((select id from ssp_players WHERE fname = 'insertFName' and lname = "insertLName"), (select id from ssp_positions where name = ':positionName'));

-- display position ID, name of position, first and last name of the player
SELECT ssp_players_positions.position_id, ssp_positions.name, ssp_players.fname, ssp_players.lname
FROM ssp_players_positions
INNER JOIN ssp_positions on ssp_positions.id = ssp_players_positions.position_id
INNER JOIN ssp_players on ssp_players.id = ssp_players_positions.player_id;

-- Mascot TABLE -------------------------------------------------------------------------------------------

-- edit 5/12 insert mascot info using the team's name
-- insert the mascot info
INSERT INTO ssp_mascots (name, animal, team_id) VALUES (':insertActor', ':insertCharacter', (SELECT id FROM ssp_teams WHERE name = "teamName"));

-- delte mascot info
DELETE FROM ssp_mascots
WHERE animal = :insertCharacter;

-- display the mascot's name, character and the team it belongs to 

SELECT ssp_mascots.name, ssp_mascots.animal, ssp_teams.name
FROM ssp_mascots
INNER JOIN ssp_teams on ssp_mascots.team_id = ssp_teams.id;


-- Game TABLE -------------------------------------------------------------------------------------------

-- insert game data.  
INSERT INTO ssp_games (play_date, locaction, winning_team, mvp, score_home, score_visit)
VALUES (':date', ':inputLocation', :insertBoolValue,  (SELECT id FROM ssp_players where fname = 'insertFName' and lname = 'insertLName' ), :insertHome, :insertAway);

-- display the game ID, game date, mvp ID, and first and last name of the player 

SELECT ssp_games.id, ssp_games.play_date, ssp_games.mvp, ssp_players.fname, ssp_players.lname
FROM ssp_players
INNER JOIN ssp_games on ssp_games.mvp = ssp_players.id;


-- Game to Team TABLE -------------------------------------------------------------------------------------------

-- insert matchup information

INSERT INTO ssp_games_teams (gid, tid, home_team) VALUES (:gameID, :awayTeamID, :homeTeamID);


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