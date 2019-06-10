-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: classmysql.engr.oregonstate.edu:3306
-- Generation Time: Jun 10, 2019 at 03:28 PM
-- Server version: 10.3.13-MariaDB-log
-- PHP Version: 7.0.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs340_hilbertt`
--

-- --------------------------------------------------------

--
-- Table structure for table `ssp_games`
--

CREATE TABLE `ssp_games` (
  `id` int(11) NOT NULL,
  `play_date` date NOT NULL,
  `location` varchar(50) NOT NULL,
  `winning_team` tinyint(1) DEFAULT NULL,
  `mvp` int(7) DEFAULT NULL,
  `score_home` int(4) DEFAULT 0,
  `score_visit` int(4) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ssp_games`
--

INSERT INTO `ssp_games` (`id`, `play_date`, `location`, `winning_team`, `mvp`, `score_home`, `score_visit`) VALUES
(1, '2019-03-09', 'Los Angelos, CA', 0, NULL, 107, 120),
(2, '2019-02-10', 'Philadelphia, PA', 1, 6, 143, 120),
(3, '2019-01-23', 'Boston, MA', 1, NULL, 123, 103),
(4, '2018-12-16', 'Cleveland, OH', 0, 7, 105, 128),
(5, '2019-05-12', 'Portland, OR', 1, 12, 100, 80),
(6, '2019-05-10', 'Houston, TX', 1, 8, 90, 85);

-- --------------------------------------------------------

--
-- Table structure for table `ssp_games_teams`
--

CREATE TABLE `ssp_games_teams` (
  `gid` int(7) NOT NULL,
  `tid` int(7) NOT NULL,
  `home_team` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ssp_games_teams`
--

INSERT INTO `ssp_games_teams` (`gid`, `tid`, `home_team`) VALUES
(1, 1, 1),
(1, 2, 0),
(2, 1, 0),
(2, 4, 1),
(3, 2, 1),
(3, 3, 0),
(4, 3, 1),
(4, 4, 0);

-- --------------------------------------------------------

--
-- Table structure for table `ssp_mascots`
--

CREATE TABLE `ssp_mascots` (
  `id` int(7) NOT NULL,
  `name` varchar(50) NOT NULL,
  `animal` varchar(50) DEFAULT NULL,
  `team_id` int(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ssp_mascots`
--

INSERT INTO `ssp_mascots` (`id`, `name`, `animal`, `team_id`) VALUES
(1, 'Franklin', 'dog', 4),
(2, 'Kristofer Ackermann', 'leprechan', 2),
(3, 'Gus', 'Sir C. C.', 3),
(4, 'Gary', 'Thunder', 5),
(5, 'Tristan', 'Blaze the Trail Cat', 6);

-- --------------------------------------------------------

--
-- Table structure for table `ssp_players`
--

CREATE TABLE `ssp_players` (
  `id` int(7) NOT NULL,
  `team_id` int(7) DEFAULT NULL,
  `jersey` int(3) DEFAULT NULL,
  `fname` varchar(50) NOT NULL,
  `lname` varchar(50) NOT NULL,
  `nickname` varchar(50) DEFAULT NULL,
  `games` int(7) DEFAULT 0,
  `points` int(7) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ssp_players`
--

INSERT INTO `ssp_players` (`id`, `team_id`, `jersey`, `fname`, `lname`, `nickname`, `games`, `points`) VALUES
(1, NULL, 34, 'Shaquille', 'O\'Neal', 'Shaq', 1207, 28606),
(2, 1, 4, 'Alex', 'Caruso', NULL, 62, 365),
(3, 2, 4, 'Tony', 'Battie', NULL, 837, 5106),
(4, 2, 44, 'Danny', 'Ainge', NULL, 1024, 11983),
(5, 3, 32, 'Deng', 'Adel', NULL, 19, 32),
(6, 4, 22, 'Wilson', 'Chandler', NULL, 641, 8269),
(7, 4, 12, 'Timothy', 'McConnell', 'T.J.', 314, 2010),
(8, 5, 30, 'Stephen', 'Curry', 'Human Torch', 1, 33),
(9, 5, 11, 'Klay', 'Thompson', NULL, 1, 20),
(10, 5, 23, 'Draymond', 'Green', 'Dray', 1, 10),
(11, 6, 0, 'Damian', 'Lillard', 'Dame', 1, 30),
(12, 6, 3, 'CJ', 'McCollum', NULL, 1, 25),
(13, 6, 31, 'Seth', 'Curry', NULL, 1, 5),
(14, 7, 34, 'Giannis', 'Antetokounmpo', 'The Greek Alphabet', 1, 40),
(15, 7, 22, 'Khris', 'Middleton', NULL, 1, 20),
(16, 7, 11, 'Brook', 'Lopez', NULL, 1, 15),
(17, 8, 2, 'Kawhi', 'Leonard', 'The Claw', 1, 32),
(18, 8, 7, 'Kyle', 'Lowry', NULL, 1, 17),
(19, 8, 33, 'Marc', 'Gasol', NULL, 1, 12);

-- --------------------------------------------------------

--
-- Table structure for table `ssp_players_positions`
--

CREATE TABLE `ssp_players_positions` (
  `player_id` int(7) NOT NULL,
  `position_id` int(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ssp_players_positions`
--

INSERT INTO `ssp_players_positions` (`player_id`, `position_id`) VALUES
(1, 6),
(2, 2),
(3, 5),
(3, 6),
(4, 2),
(4, 3),
(5, 4),
(6, 3),
(6, 4),
(6, 5),
(7, 2),
(8, 2),
(9, 3),
(10, 5),
(11, 2),
(12, 3),
(13, 2);

-- --------------------------------------------------------

--
-- Table structure for table `ssp_positions`
--

CREATE TABLE `ssp_positions` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ssp_positions`
--

INSERT INTO `ssp_positions` (`id`, `name`) VALUES
(6, 'Center'),
(2, 'Point Guard'),
(5, 'Power Forward'),
(1, 'Right'),
(3, 'Shooting Guard'),
(4, 'Small Forward');

-- --------------------------------------------------------

--
-- Table structure for table `ssp_teams`
--

CREATE TABLE `ssp_teams` (
  `id` int(7) NOT NULL,
  `name` varchar(50) NOT NULL,
  `location` varchar(50) NOT NULL,
  `color` varchar(6) DEFAULT 'FFFFFF',
  `coach` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ssp_teams`
--

INSERT INTO `ssp_teams` (`id`, `name`, `location`, `color`, `coach`) VALUES
(1, 'Los Angelos Lakers', 'Los Angelos, CA', '552084', 'Luke Walton'),
(2, 'Boston Celtics', 'Boston, MA', '008853', 'Brad Stevens'),
(3, 'Cleveland Cavaliers', 'Cleveland, OH', '860038', 'Tyronn Lue'),
(4, 'Philadelphia 76ers', 'Philadelphia, PA', '006BB6', 'Brett Brown'),
(5, 'Golden State Warriors', 'Oakland, CA', 'FDB927', 'Steve Kerr'),
(6, 'Portland Trailblazers', 'Portland, OR', 'FF0000', 'Terry Stotts'),
(7, 'Milwaukee Bucks', 'Milwaukee, WI', '008000', 'Mike Budenholzer'),
(8, 'Toronto Raptors', 'Toronto, ON', 'FF0000', 'Nick Nurse');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ssp_games`
--
ALTER TABLE `ssp_games`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `U_play_loc` (`play_date`,`location`),
  ADD KEY `FK_mvPlayer` (`mvp`),
  ADD KEY `play_date` (`play_date`,`location`);

--
-- Indexes for table `ssp_games_teams`
--
ALTER TABLE `ssp_games_teams`
  ADD PRIMARY KEY (`gid`,`tid`),
  ADD KEY `FK_teamGame` (`tid`);

--
-- Indexes for table `ssp_mascots`
--
ALTER TABLE `ssp_mascots`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `team_id` (`team_id`),
  ADD UNIQUE KEY `team_id_3` (`team_id`),
  ADD KEY `team_id_2` (`team_id`);

--
-- Indexes for table `ssp_players`
--
ALTER TABLE `ssp_players`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `U_players_names` (`fname`,`lname`,`nickname`),
  ADD UNIQUE KEY `U_players_team_jers` (`team_id`,`jersey`),
  ADD KEY `fname` (`fname`,`lname`,`nickname`),
  ADD KEY `team_id` (`team_id`,`jersey`);

--
-- Indexes for table `ssp_players_positions`
--
ALTER TABLE `ssp_players_positions`
  ADD PRIMARY KEY (`player_id`,`position_id`),
  ADD KEY `FK_PositionPlay` (`position_id`);

--
-- Indexes for table `ssp_positions`
--
ALTER TABLE `ssp_positions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `ssp_teams`
--
ALTER TABLE `ssp_teams`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `U_teams_name_loc` (`name`,`location`),
  ADD UNIQUE KEY `U_teams_name_coa` (`name`,`coach`),
  ADD UNIQUE KEY `U_teams_name_col` (`name`,`color`),
  ADD UNIQUE KEY `U_teams_loc_col` (`location`,`color`),
  ADD KEY `name` (`name`,`location`),
  ADD KEY `name_2` (`name`,`coach`),
  ADD KEY `name_3` (`name`,`color`),
  ADD KEY `location` (`location`,`color`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ssp_games`
--
ALTER TABLE `ssp_games`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `ssp_mascots`
--
ALTER TABLE `ssp_mascots`
  MODIFY `id` int(7) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `ssp_players`
--
ALTER TABLE `ssp_players`
  MODIFY `id` int(7) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `ssp_positions`
--
ALTER TABLE `ssp_positions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `ssp_teams`
--
ALTER TABLE `ssp_teams`
  MODIFY `id` int(7) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ssp_games`
--
ALTER TABLE `ssp_games`
  ADD CONSTRAINT `FK_mvPlayer` FOREIGN KEY (`mvp`) REFERENCES `ssp_players` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `ssp_games_teams`
--
ALTER TABLE `ssp_games_teams`
  ADD CONSTRAINT `FK_GameTeams` FOREIGN KEY (`gid`) REFERENCES `ssp_games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_teamGame` FOREIGN KEY (`tid`) REFERENCES `ssp_teams` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ssp_mascots`
--
ALTER TABLE `ssp_mascots`
  ADD CONSTRAINT `FK_mascotTeam` FOREIGN KEY (`team_id`) REFERENCES `ssp_teams` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ssp_players`
--
ALTER TABLE `ssp_players`
  ADD CONSTRAINT `FK_PersonTeam` FOREIGN KEY (`team_id`) REFERENCES `ssp_teams` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `ssp_players_positions`
--
ALTER TABLE `ssp_players_positions`
  ADD CONSTRAINT `FK_PlayerPos` FOREIGN KEY (`player_id`) REFERENCES `ssp_players` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_PositionPlay` FOREIGN KEY (`position_id`) REFERENCES `ssp_positions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
