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
    id int NOT NULL AUTO_INCREMENT,
    name varchar(50) NOT NULL,
    location varchar(50) NOT NULL,
    color varchar(6) DEFAULT "FFFFFF",
    coach varchar(50) NOT NULL,
    PRIMARY KEY(id)
) ENGINE=INNODB;

-- PLAYERS -> Dependent on teams
CREATE TABLE ssp_players (
    id int NOT NULL AUTO_INCREMENT,
    team_id int,
    jersey int(3),
    fname varchar(50) NOT NULL,
    lname varchar(50) NOT NULL,
    nickname varchar(50),
    games int DEFAULT 0,
    points int DEFAULT 0,
    PRIMARY KEY (id),
    CONSTRAINT FK_PersonTeam
        FOREIGN KEY (team_id)
            REFERENCES ssp_teams(id)
            ON DELETE SET NULL
            ON UPDATE CASCADE
) ENGINE=INNODB;

-- POSITIONS -> Independent

CREATE TABLE ssp_positions (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(20) NOT NULL,
    PRIMARY KEY (id)
) ENGINE=INNODB;

-- PLAYERS_POSITIONS -> Dependent on players an positions

CREATE TABLE ssp_players_positions (
    player_id int NOT NULL,
    position_id int NOT NULL,
    PRIMARY KEY(player_id, position_id),
    CONSTRAINT FK_PlayerPos
        FOREIGN KEY (player_id)
            REFERENCES ssp_players(id)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
    CONSTRAINT FK_PositionPlay
        FOREIGN KEY (position_id)
            REFERENCES ssp_positions(id)
            ON DELETE CASCADE
            ON UPDATE CASCADE
) ENGINE=INNODB;


-- GAME -> DEPENDENT ON PLAYER

CREATE TABLE ssp_games (
    id int NOT NULL AUTO_INCREMENT,
    play_date DATE NOT NULL,
    locaction varchar(50) NOT NULL,
    winning_team BOOLEAN,
    mvp int,
    score_home int DEFAULT 0,
    score_visit int DEFAULT 0,
    PRIMARY KEY (id),
    CONSTRAINT FK_mvPlayer
        FOREIGN KEY (mvp)
            REFERENCES ssp_players(id)
            ON DELETE SET NULL
            ON UPDATE CASCADE
) ENGINE=INNODB;

-- GAME TO TEAMS -> Dependent on games and teams

CREATE TABLE ssp_games_teams (
    gid int NOT NULL,
    tid int NOT NULL,
    home_team BOOLEAN DEFAULT 1,
    PRIMARY KEY(gid, tid),
    CONSTRAINT FK_GameTeams
        FOREIGN KEY (gid)
            REFERENCES ssp_games(id)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
    CONSTRAINT FK_teamGame
        FOREIGN KEY (tid)
            REFERENCES ssp_teams(id)
            ON DELETE CASCADE
            ON UPDATE CASCADE
) ENGINE=INNODB;

-- MASCOT -> DEPENDENT ON TEAMS

CREATE TABLE ssp_mascots (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(50) NOT NULL,
    animal varchar(50),
    team_id int NOT NULL UNIQUE,
    PRIMARY KEY (id),
    CONSTRAINT FK_mascotTeam
        FOREIGN KEY (team_id)
            REFERENCES ssp_teams(id)
            ON DELETE CASCADE
            ON UPDATE CASCADE
) ENGINE=INNODB;
