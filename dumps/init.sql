-- Gary and Tristan's Initial SQL queries
-- Use these to create the tables

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
    name varchar(20) NOT NULL,
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

ALTER TABLE ssp_players
    ADD CONSTRAINT FK_PersonTeam
            FOREIGN KEY (team_id)
                REFERENCES ssp_teams(id)
                ON DELETE SET NULL
                ON UPDATE CASCADE,
    ADD KEY (fname, lname, nickname),
    ADD KEY (team_id, jersey);

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
    ADD KEY (play_date, location);


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
    ADD KEY (team_id);


-- EXAMPLE INFO --

INSERT INTO ssp_teams (name, location, color, coach)
VALUES 
("Lakers", "Los Angelos", "552084", "Luke Walton"),
("Celtics", "Boston", "008853", "Brad Stevens"),
("Cavaliers", "Cleveland", "860038", "Tyronn Lue"),
("76ers", "Philadelphia", "006BB6", "Brett Brown");

INSERT INTO ssp_players (team_id, jersey, fname, lname, nickname, games, points)
VALUES
(1, 34, "Shaquille", "O'Neal", "Shaq", 1207, 28606),
(1, 4, "Alex", "Caruso", NULL, 62, 365),
(2, 4, "Tony", "Battie", NULL, 837, 5106),
(2, 44, "Danny", "Ainge", NULL, 1024, 11983),
(3, 32, "Deng", "Adel", NULL, 19, 32),
(4, 22, "Wilson", "Chandler", NULL, 641, 8269),
(4, 12, "Timothy", "McConnell", "T.J.", 314, 2010);

INSERT INTO ssp_positions (name)
VALUES
("Point Guard"),
("Center"),
("Right"),
("Power Forward"),
("Shooting Guard"),
("Small Forward");

INSERT INTO ssp_players_positions (player_id, position_id)
VALUES
(7, 1), (1, 2), (2, 1),
(3, 4), (3, 2), (4, 5),
(4, 1), (5, 6), (6, 4),
(6, 5), (6, 6);

INSERT INTO ssp_games (play_date, location, winning_team, mvp, score_home, score_visit)
VALUES
("2019-03-09", "Los Angelos", 0, NULL, 107, 120),
("2019-02-10", "Philadelphia", 1, 6, 143, 120),
("2019-01-23", "Boston", 1, NULL, 123, 103),
("2018-12-16", "Cleveland", 0, 7, 105, 128);

INSERT INTO ssp_games_teams (gid, tid)
VALUES
(1, 1), (1, 2),
(2, 1), (2, 4),
(3, 2), (3, 3),
(4, 3), (4, 4);

INSERT INTO ssp_mascots (name, animal, team_id)
VALUES
("Franklin", "dog", 4),
("Kristofer Ackermann", "leprechan", 2),
("Gus", "Sir C. C.", 3);




