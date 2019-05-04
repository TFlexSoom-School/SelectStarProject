-- Grant and Tristan's Initial SQL queries
-- Use these to create the tables

-- Drop any existing tables :P
DROP TABLE IF EXISTS ssp_players;
DROP TABLE IF EXISTS ssp_teams;

-- TEAMS -> Has to be created First
--          ... OR you can use ALTER
CREATE TABLE ssp_teams(
    id int NOT NULL,
    name varchar(50) NOT NULL,
    location varchar(50) NOT NULL,
    color varchar(6) DEFAULT "FFFFFF",
    coach varchar(50) NOT NULL,
    PRIMARY KEY(id)
) ENGINE=INNODB;

-- PLAYERS -> Dependent on teams
CREATE TABLE ssp_players (
    id int NOT NULL,
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
