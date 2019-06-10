-- Gary and Tristan"s Initial SQL queries
-- Use these to create the tables
--
--
-- These are User Created

-- Drop any existing tables :P
DROP TABLE IF EXISTS ssp_players_positions;
DROP TABLE IF EXISTS ssp_games_teams;
DROP TABLE IF EXISTS ssp_positions;
DROP TABLE IF EXISTS ssp_games;
DROP TABLE IF EXISTS ssp_mascots;
DROP TABLE IF EXISTS ssp_players;
DROP TABLE IF EXISTS ssp_teams;

-- TEAMS -> Has to be created First
--          ... OR you can use ALTER
CREATE TABLE ssp_teams(
    id int(7) NOT NULL AUTO_INCREMENT,
    name varchar(50) NOT NULL,
    location varchar(50) NOT NULL,
    color varchar(6) DEFAULT "FFFFFF",
    coach varchar(50) NOT NULL,
    PRIMARY KEY(id)
) ENGINE=INNODB;

-- PLAYERS -> Dependent on teams
CREATE TABLE ssp_players (
    id int(7) NOT NULL AUTO_INCREMENT,
    team_id int(7),
    jersey int(3),
    fname varchar(50) NOT NULL,
    lname varchar(50) NOT NULL,
    nickname varchar(50),
    games int(7) DEFAULT 0,
    points int(7) DEFAULT 0,
    PRIMARY KEY (id)
) ENGINE=INNODB;

-- POSITIONS -> Independent

CREATE TABLE ssp_positions (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(20) NOT NULL UNIQUE,
    PRIMARY KEY (id)
) ENGINE=INNODB;

-- PLAYERS_POSITIONS -> Dependent on players an positions

CREATE TABLE ssp_players_positions (
    player_id int(7) NOT NULL,
    position_id int(7) NOT NULL,
    PRIMARY KEY(player_id, position_id)
) ENGINE=INNODB;


-- GAME -> DEPENDENT ON PLAYER

CREATE TABLE ssp_games (
    id int NOT NULL AUTO_INCREMENT,
    play_date DATE NOT NULL,
    location varchar(50) NOT NULL,
    winning_team BOOLEAN,
    mvp int(7),
    score_home int(4) DEFAULT 0,
    score_visit int(4) DEFAULT 0,
    PRIMARY KEY (id)
) ENGINE=INNODB;

-- GAME TO TEAMS -> Dependent on games and teams

CREATE TABLE ssp_games_teams (
    gid int(7) NOT NULL,
    tid int(7) NOT NULL,
    home_team BOOLEAN DEFAULT 1,
    PRIMARY KEY(gid, tid)
) ENGINE=INNODB;

-- MASCOT -> DEPENDENT ON TEAMS

CREATE TABLE ssp_mascots (
    id int(7) NOT NULL AUTO_INCREMENT,
    name varchar(50) NOT NULL,
    animal varchar(50),
    team_id int(7) NOT NULL UNIQUE,
    PRIMARY KEY (id)
) ENGINE=INNODB;


-- KEY DECLARATIONS --
ALTER TABLE ssp_teams
    ADD KEY (name, location),
    ADD KEY (name, coach),
    ADD KEY (name, color),
    ADD KEY (location, color),
    ADD CONSTRAINT U_teams_name_loc UNIQUE (name, location),
    ADD CONSTRAINT U_teams_name_coa UNIQUE (name, coach),
    ADD CONSTRAINT U_teams_name_col UNIQUE (name, color),
    ADD CONSTRAINT U_teams_loc_col UNIQUE (location, color);

ALTER TABLE ssp_players
    ADD CONSTRAINT FK_PersonTeam
            FOREIGN KEY (team_id)
                REFERENCES ssp_teams(id)
                ON DELETE SET NULL
                ON UPDATE CASCADE,
    ADD KEY (fname, lname, nickname),
    ADD KEY (team_id, jersey),
    ADD CONSTRAINT U_players_names UNIQUE (fname, lname, nickname),
    ADD CONSTRAINT U_players_team_jers UNIQUE (team_id, jersey);

ALTER TABLE ssp_players_positions
    ADD CONSTRAINT FK_PlayerPos
        FOREIGN KEY (player_id)
            REFERENCES ssp_players(id)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
    ADD CONSTRAINT FK_PositionPlay
        FOREIGN KEY (position_id)
            REFERENCES ssp_positions(id)
            ON DELETE CASCADE
            ON UPDATE CASCADE;

ALTER TABLE ssp_games 
    ADD CONSTRAINT FK_mvPlayer
        FOREIGN KEY (mvp)
            REFERENCES ssp_players(id)
            ON DELETE SET NULL
            ON UPDATE CASCADE,
    ADD KEY (play_date, location),
    ADD CONSTRAINT U_play_loc UNIQUE (play_date, location);


ALTER TABLE ssp_games_teams
    ADD CONSTRAINT FK_GameTeams
        FOREIGN KEY (gid)
            REFERENCES ssp_games(id)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
    ADD CONSTRAINT FK_teamGame
        FOREIGN KEY (tid)
            REFERENCES ssp_teams(id)
            ON DELETE CASCADE
            ON UPDATE CASCADE;

ALTER TABLE ssp_mascots
    ADD CONSTRAINT FK_mascotTeam
        FOREIGN KEY (team_id)
            REFERENCES ssp_teams(id)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
    ADD KEY (team_id),
    ADD UNIQUE (team_id);


-- EXAMPLE INFO --

-- TEAMS --

INSERT INTO ssp_teams (name, location, color, coach)
VALUES 
("Los Angelos Lakers", "Los Angelos, CA", "552084", "Luke Walton"),
("Boston Celtics", "Boston, MA", "008853", "Brad Stevens"),
("Cleveland Cavaliers", "Cleveland, OH", "860038", "Tyronn Lue"),
("Philadelphia 76ers", "Philadelphia, PA", "006BB6", "Brett Brown"),
("Golden State Warriors", "Oakland, CA", "FDB927", "Steve Kerr"),
("Portland Trailblazers", "Portland, OR", "FF0000", "Terry Stotts"),
("Milwaukee Bucks", "Milwaukee, WI", "008000", "Mike Budenholzer"),
("Toronto Raptors", "Toronto, ON", "FF0000", "Nick Nurse");

-- PLAYERS -- 

INSERT INTO ssp_players (team_id, jersey, fname, lname, nickname, games, points)
VALUES
(NULL, 34, "Shaquille", "O'Neal", "Shaq", 1207, 28606),
((select id from ssp_teams where name = "Los Angelos Lakers"), 4, "Alex", "Caruso", NULL, 62, 365),
((select id from ssp_teams where name = "Boston Celtics"), 4, "Tony", "Battie", NULL, 837, 5106),
((select id from ssp_teams where name = "Boston Celtics"), 44, "Danny", "Ainge", NULL, 1024, 11983),
((select id from ssp_teams where name = "Cleveland Cavaliers"), 32, "Deng", "Adel", NULL, 19, 32),
((select id from ssp_teams where name = "Philadelphia 76ers"), 22, "Wilson", "Chandler", NULL, 641, 8269),
((select id from ssp_teams where name = "Philadelphia 76ers"), 12, "Timothy", "McConnell", "T.J.", 314, 2010),
((select id from ssp_teams where name = "Golden State Warriors"), 30, "Stephen", "Curry", "Human Torch", 1, 33),
((select id from ssp_teams where name = "Golden State Warriors"), 11, "Klay", "Thompson", null, 1, 20),
((select id from ssp_teams where name = "Golden State Warriors"), 23, "Draymond", "Green", "Dray", 1, 10),
((select id from ssp_teams where name = "Portland Trailblazers"), 0, "Damian", "Lillard", "Dame", 1, 30),
((select id from ssp_teams where name = "Portland Trailblazers"), 3, "CJ", "McCollum", null, 1, 25),
((select id from ssp_teams where name = "Portland Trailblazers"), 31, "Seth", "Curry", null, 1, 5),
((select id from ssp_teams where name = "Milwaukee Bucks"), 34, "Giannis", "Antetokounmpo", "The Greek Alphabet", 1, 40),
((select id from ssp_teams where name = "Milwaukee Bucks"), 22, "Khris", "Middleton", null, 1, 20),
((select id from ssp_teams where name = "Milwaukee Bucks"), 11, "Brook", "Lopez", null, 1, 15),
((select id from ssp_teams where name = "Toronto Raptors"), 2, "Kawhi", "Leonard", "The Claw", 1, 32),
((select id from ssp_teams where name = "Toronto Raptors"), 7, "Kyle", "Lowry", null , 1, 17),
((select id from ssp_teams where name = "Toronto Raptors"), 33, "Marc", "Gasol", null, 1, 12);
-- POSITIONS -- 
INSERT INTO ssp_positions (name)
VALUES
("Right"),
("Point Guard"),
("Shooting Guard"),
("Small Forward"),
("Power Forward"),
("Center");

INSERT INTO ssp_players_positions (player_id, position_id)
VALUES
((select id from ssp_players WHERE fname = "Timothy" and lname = "McConnell"),
    (select id from ssp_positions where name = "Point Guard")), 
    
((select id from ssp_players WHERE fname = "Shaquille" and lname = "O'Neal"),
    (select id from ssp_positions where name = "Center")),
    
((select id from ssp_players WHERE fname = "Alex" and lname = "Caruso"),
    (select id from ssp_positions where name = "Point Guard")),
    
((select id from ssp_players WHERE fname = "Tony" and lname = "Battie"),
    (select id from ssp_positions where name = "Power Forward")),
    
((select id from ssp_players WHERE fname = "Tony" and lname = "Battie"),
    (select id from ssp_positions where name = "Center")),
    
((select id from ssp_players WHERE fname = "Danny" and lname = "Ainge"),
    (select id from ssp_positions where name = "Shooting Guard")),
    
((select id from ssp_players WHERE fname = "Danny" and lname = "Ainge"),
    (select id from ssp_positions where name = "Point Guard")),
    
((select id from ssp_players WHERE fname = "Deng" and lname = "Adel"),
    (select id from ssp_positions where name = "Small Forward")),
    
((select id from ssp_players WHERE fname = "Wilson" and lname = "Chandler"),
    (select id from ssp_positions where name = "Power Forward")),
    
((select id from ssp_players WHERE fname = "Wilson" and lname = "Chandler"),
    (select id from ssp_positions where name = "Shooting Guard")),
    
((select id from ssp_players WHERE fname = "Wilson" and lname = "Chandler"),
    (select id from ssp_positions where name = "Small Forward")),
    
((select id from ssp_players WHERE fname = "Stephen" and lname = "Curry"),
    (select id from ssp_positions where name = "Point Guard")),
    
((select id from ssp_players WHERE fname = "Damian" and lname = "Lillard"),
    (select id from ssp_positions where name = "Point Guard")),
    
((select id from ssp_players WHERE fname = "Klay" and lname = "Thompson"),
    (select id from ssp_positions where name = "Shooting Guard")),
    
((select id from ssp_players WHERE fname = "CJ" and lname = "McCollum"),
    (select id from ssp_positions where name = "Shooting Guard")),
    
((select id from ssp_players WHERE fname = "Seth" and lname = "Curry"),
    (select id from ssp_positions where name = "Point Guard")),
    
((select id from ssp_players WHERE fname = "Draymond" and lname = "Green"),
    (select id from ssp_positions where name = "Power Forward"));

-- GAMES -- 
INSERT INTO ssp_games (play_date, location, winning_team, mvp, score_home, score_visit)
VALUES
("2019-03-09", "Los Angelos, CA", 0, NULL, 107, 120),
("2019-02-10", "Philadelphia, PA", 1, (SELECT id FROM ssp_players where fname = "Wilson" and lname = "Chandler" ), 143, 120),
("2019-01-23", "Boston, MA", 1, NULL, 123, 103),
("2018-12-16", "Cleveland, OH", 0, (SELECT id FROM ssp_players where fname = "Timothy" and lname = "McConnell" ), 105, 128),
("2019-05-12", "Portland, OR", 1,  (SELECT id FROM ssp_players where fname = "CJ" and lname = "McCollum" ), 100, 80),
("2019-05-10", "Houston, TX", 1,  (SELECT id FROM ssp_players where fname = "Stephen" and lname = "Curry" ), 90, 85);

INSERT INTO ssp_games_teams (gid, tid, home_team)
VALUES
((SELECT id FROM ssp_games WHERE play_date = "2019-03-09" AND location = "Los Angelos, CA"), 
    (SELECT id FROM ssp_teams WHERE name = "Los Angelos Lakers" AND location = "Los Angelos, CA"), 1), 

((SELECT id FROM ssp_games WHERE play_date = "2019-03-09" AND location = "Los Angelos, CA"), 
    (SELECT id FROM ssp_teams WHERE name = "Boston Celtics" AND location = "Boston, MA"), 0),

((SELECT id FROM ssp_games WHERE play_date = "2019-02-10" AND location = "Philadelphia, PA"), 
    (SELECT id FROM ssp_teams WHERE name = "Los Angelos Lakers" AND location = "Los Angelos, CA"), 0),

((SELECT id FROM ssp_games WHERE play_date = "2019-02-10" AND location = "Philadelphia, PA"), 
    (SELECT id FROM ssp_teams WHERE name = "Philadelphia 76ers" AND location = "Philadelphia, PA"), 1),

((SELECT id FROM ssp_games WHERE play_date = "2019-01-23" AND location = "Boston, MA"), 
    (SELECT id FROM ssp_teams WHERE name = "Boston Celtics" AND location = "Boston, MA"), 1),

((SELECT id FROM ssp_games WHERE play_date = "2019-01-23" AND location = "Boston, MA"), 
    (SELECT id FROM ssp_teams WHERE name = "Cleveland Cavaliers" AND location = "Cleveland, OH"), 0),

((SELECT id FROM ssp_games WHERE play_date = "2018-12-16" AND location = "Cleveland, OH"), 
    (SELECT id FROM ssp_teams WHERE name = "Cleveland Cavaliers" AND location = "Cleveland, OH"), 1),

((SELECT id FROM ssp_games WHERE play_date = "2018-12-16" AND location = "Cleveland, OH"), 
    (SELECT id FROM ssp_teams WHERE name = "Philadelphia 76ers" AND location = "Philadelphia, PA"), 0);


-- MASCOTS -- 
INSERT INTO ssp_mascots (name, animal, team_id)
VALUES
("Franklin", "dog", (SELECT id FROM ssp_teams WHERE name = "Philadelphia 76ers" AND location = "Philadelphia, PA")),
("Kristofer Ackermann", "leprechan", (SELECT id FROM ssp_teams WHERE name = "Boston Celtics" AND location = "Boston, MA")),
("Gus", "Sir C. C.", (SELECT id FROM ssp_teams WHERE name = "Cleveland Cavaliers" AND location = "Cleveland, OH")),
("Gary", "Thunder", (SELECT id FROM ssp_teams WHERE name = "Golden State Warriors" AND location = "Oakland, CA")),
("Tristan", "Blaze the Trail Cat", (SELECT id FROM ssp_teams WHERE name = "Portland Trailblazers" AND location = "Portland, OR"));


