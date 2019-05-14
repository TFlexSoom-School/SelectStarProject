-- insert into teams

INSERT INTO ssp_teams (name, location, color, coach)  
VALUES ('Golden State Warriors', 'Oakland, CA', 'FFF00', 'Steve Kerr');

INSERT INTO ssp_teams (name, location, color, coach)  
VALUES ('Portland Trailblazers', 'Portland, OR', 'FF0000', 'Terry Stotts');

INSERT INTO ssp_teams (name, location, color, coach)  
VALUES ('Milwaukee Bucks', 'Milwaukee, WI', '008000', 'Mike Budenholzer');

INSERT INTO ssp_teams (name, location, color, coach)  
VALUES ('Toronto Raptors', 'Toronto, ON', 'FF0000', 'Nick Nurse');


-- insert a player

INSERT INTO ssp_players(team_id, jersey, fname, lname, nickname, games, points)
VALUES ((select id from ssp_teams where name = 'Golden State Warriors'), 30, 'Stephen', 'Curry', 'Human Torch', 1, 33);

INSERT INTO ssp_players(team_id, jersey, fname, lname, nickname, games, points)
VALUES ((select id from ssp_teams where name = 'Golden State Warriors'), 11, 'Klay', 'Thompson', null, 1, 20);

INSERT INTO ssp_players(team_id, jersey, fname, lname, nickname, games, points)
VALUES ((select id from ssp_teams where name = 'Golden State Warriors'), 23, 'Draymond', 'Green', 'Dray', 1, 10);

INSERT INTO ssp_players(team_id, jersey, fname, lname, nickname, games, points)
VALUES ((select id from ssp_teams where name = 'Portland Trailblazers'), 0, 'Damian', 'Lillard', 'Dame', 1, 30);

INSERT INTO ssp_players(team_id, jersey, fname, lname, nickname, games, points)
VALUES ((select id from ssp_teams where name = 'Portland Trailblazers'), 3, 'CJ', 'McCollum', null, 1, 25);

INSERT INTO ssp_players(team_id, jersey, fname, lname, nickname, games, points)
VALUES ((select id from ssp_teams where name = 'Portland Trailblazers'), 31, 'Seth', 'Curry', null, 1, 5);

INSERT INTO ssp_players(team_id, jersey, fname, lname, nickname, games, points)
VALUES ((select id from ssp_teams where name = 'Milwaukee Bucks'), 34, 'Giannis', 'Antetokounmpo', 'The Greek Alphabet', 1, 40);

INSERT INTO ssp_players(team_id, jersey, fname, lname, nickname, games, points)
VALUES ((select id from ssp_teams where name = 'Milwaukee Bucks'), 22, 'Khris', 'Middleton', null, 1, 20);

INSERT INTO ssp_players(team_id, jersey, fname, lname, nickname, games, points)
VALUES ((select id from ssp_teams where name = 'Milwaukee Bucks'), 11, 'Brook', 'Lopez', null, 1, 15);

INSERT INTO ssp_players(team_id, jersey, fname, lname, nickname, games, points)
VALUES ((select id from ssp_teams where name = 'Toronto Raptors'), 2, 'Kawhi', 'Leonard', 'The Claw', 1, 32);

INSERT INTO ssp_players(team_id, jersey, fname, lname, nickname, games, points)
VALUES ((select id from ssp_teams where name = 'Toronto Raptors'), 7, 'Kyle', 'Lowry', null , 1, 17);

INSERT INTO ssp_players(team_id, jersey, fname, lname, nickname, games, points)
VALUES ((select id from ssp_teams where name = 'Toronto Raptors'), 33, 'Marc', 'Gasol', null, 1, 12);

-- insert the position names
INSERT INTO ssp_positions(id, name) VALUES (1, 'Point Guard');

INSERT INTO ssp_positions(id, name) VALUES (2, 'Shooting Guard');

INSERT INTO ssp_positions(id, name) VALUES (3, 'Small Forward');

INSERT INTO ssp_positions(id, name) VALUES (4, 'Power Forward');

INSERT INTO ssp_positions(id, name) VALUES (5, 'Center');

-- insert into the player-position table using the players name and the position name'

INSERT INTO ssp_players_positions (player_id, position_id)
VALUES ((select id from ssp_players WHERE fname = 'Stephen' and lname = "Curry"), (select id from ssp_positions where name = 'Point Guard'));

INSERT INTO ssp_players_positions (player_id, position_id)
VALUES ((select id from ssp_players WHERE fname = 'Damian' and lname = "Lillard"), (select id from ssp_positions where name = 'Point Guard'));


INSERT INTO ssp_players_positions (player_id, position_id)
VALUES ((select id from ssp_players WHERE fname = 'Klay' and lname = "Thompson"), (select id from ssp_positions where name = 'Shooting Guard'));


INSERT INTO ssp_players_positions (player_id, position_id)
VALUES ((select id from ssp_players WHERE fname = 'CJ' and lname = "McCollum"), (select id from ssp_positions where name = 'Shooting Guard'));

INSERT INTO ssp_players_positions (player_id, position_id)
VALUES ((select id from ssp_players WHERE fname = 'Seth' and lname = "Curry"), (select id from ssp_positions where name = 'Point Guard'));

INSERT INTO ssp_players_positions (player_id, position_id)
VALUES ((select id from ssp_players WHERE fname = 'Draymond' and lname = "Green"), (select id from ssp_positions where name = 'Power Forward'));

-- insert the mascot info using the team's name

INSERT INTO ssp_mascots (name, animal, team_id) VALUES ('Gary', ':Thunder', (SELECT id FROM ssp_teams WHERE name = "Golden State Warriors"));

INSERT INTO ssp_mascots (name, animal, team_id) VALUES ('Tristan', 'Blaze the Trail Cat', (SELECT id FROM ssp_teams WHERE name = "Portland Trailblazers"));

-- insert game info.  mvp by name

INSERT INTO ssp_games (play_date, locaction, winning_team, mvp, score_home, score_visit)
VALUES ('2019-05-12', 'Portland', 0,  (SELECT id FROM ssp_players where fname = 'CJ' and lname = 'McCollum' ), 100, 80);

INSERT INTO ssp_games (play_date, locaction, winning_team, mvp, score_home, score_visit)
VALUES ('2019-05-10', 'Houston', 1,  (SELECT id FROM ssp_players where fname = 'Stephen' and lname = 'Curry' ), 90, 85);