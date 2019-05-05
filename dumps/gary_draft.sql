-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: classmysql.engr.oregonstate.edu:3306
-- Generation Time: May 04, 2019 at 09:08 PM
-- Server version: 10.3.13-MariaDB-log
-- PHP Version: 7.0.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs340_luongg`
--
CREATE DATABASE IF NOT EXISTS `cs340_luongg` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `cs340_luongg`;

-- --------------------------------------------------------

--
-- Table structure for table `game`
--

CREATE TABLE `game` (
  `game_id` int(11) NOT NULL,
  `game_date` date DEFAULT NULL,
  `location` varchar(50) NOT NULL,
  `winning_team` int(11) DEFAULT NULL,
  `mvp` int(11) NOT NULL,
  `home_score` int(11) DEFAULT 0,
  `away_score` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `game_team`
--

CREATE TABLE `game_team` (
  `game_id` int(11) NOT NULL,
  `hometeam_id` int(11) NOT NULL,
  `awayteam_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `mascot`
--

CREATE TABLE `mascot` (
  `mascot_id` int(11) NOT NULL,
  `mascot_name` varchar(50) DEFAULT NULL,
  `animal` varchar(50) DEFAULT NULL,
  `team_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `player`
--

CREATE TABLE `player` (
  `Player_ID` int(11) NOT NULL,
  `TEAM_ID` int(11) DEFAULT NULL,
  `Jersey_Num` int(11) DEFAULT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `nick_name` varchar(50) DEFAULT NULL,
  `total_games_played` int(11) DEFAULT NULL,
  `total_points_made` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `player_position`
--

CREATE TABLE `player_position` (
  `player_id` int(11) DEFAULT NULL,
  `position_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `position_table`
--

CREATE TABLE `position_table` (
  `position_id` int(11) NOT NULL,
  `position_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `TEAM`
--

CREATE TABLE `TEAM` (
  `team_id` int(11) NOT NULL,
  `team_name` varchar(50) NOT NULL,
  `location` varchar(50) NOT NULL,
  `color` varchar(6) NOT NULL,
  `coach` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `game`
--
ALTER TABLE `game`
  ADD PRIMARY KEY (`game_id`),
  ADD KEY `mvp` (`mvp`);

--
-- Indexes for table `game_team`
--
ALTER TABLE `game_team`
  ADD KEY `hometeam_id` (`hometeam_id`),
  ADD KEY `awayteam_id` (`awayteam_id`),
  ADD KEY `game_id` (`game_id`);

--
-- Indexes for table `mascot`
--
ALTER TABLE `mascot`
  ADD PRIMARY KEY (`mascot_id`),
  ADD KEY `team_id` (`team_id`);

--
-- Indexes for table `player`
--
ALTER TABLE `player`
  ADD PRIMARY KEY (`Player_ID`),
  ADD UNIQUE KEY `Jersey_Num` (`Jersey_Num`),
  ADD KEY `TEAM_ID` (`TEAM_ID`);

--
-- Indexes for table `player_position`
--
ALTER TABLE `player_position`
  ADD KEY `player_id` (`player_id`),
  ADD KEY `position_id` (`position_id`);

--
-- Indexes for table `position_table`
--
ALTER TABLE `position_table`
  ADD PRIMARY KEY (`position_id`);

--
-- Indexes for table `TEAM`
--
ALTER TABLE `TEAM`
  ADD PRIMARY KEY (`team_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `game`
--
ALTER TABLE `game`
  MODIFY `game_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `mascot`
--
ALTER TABLE `mascot`
  MODIFY `mascot_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `player`
--
ALTER TABLE `player`
  MODIFY `Player_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `TEAM`
--
ALTER TABLE `TEAM`
  MODIFY `team_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `game`
--
ALTER TABLE `game`
  ADD CONSTRAINT `game_ibfk_1` FOREIGN KEY (`mvp`) REFERENCES `player` (`Player_ID`) ON UPDATE CASCADE;

--
-- Constraints for table `game_team`
--
ALTER TABLE `game_team`
  ADD CONSTRAINT `game_team_ibfk_1` FOREIGN KEY (`hometeam_id`) REFERENCES `TEAM` (`team_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `game_team_ibfk_2` FOREIGN KEY (`awayteam_id`) REFERENCES `TEAM` (`team_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `game_team_ibfk_3` FOREIGN KEY (`game_id`) REFERENCES `game` (`game_id`) ON UPDATE CASCADE;

--
-- Constraints for table `mascot`
--
ALTER TABLE `mascot`
  ADD CONSTRAINT `mascot_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `TEAM` (`team_id`) ON UPDATE CASCADE;

--
-- Constraints for table `player`
--
ALTER TABLE `player`
  ADD CONSTRAINT `player_ibfk_1` FOREIGN KEY (`TEAM_ID`) REFERENCES `TEAM` (`team_id`) ON UPDATE CASCADE;

--
-- Constraints for table `player_position`
--
ALTER TABLE `player_position`
  ADD CONSTRAINT `player_position_ibfk_1` FOREIGN KEY (`player_id`) REFERENCES `player` (`Player_ID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `player_position_ibfk_2` FOREIGN KEY (`position_id`) REFERENCES `position_table` (`position_id`) ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
