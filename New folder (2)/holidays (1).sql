-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Nov 21, 2017 at 10:17 AM
-- Server version: 10.1.13-MariaDB
-- PHP Version: 5.5.35

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `raghuerp_leavesys`
--

-- --------------------------------------------------------

--
-- Table structure for table `holidays`
--

CREATE TABLE `holidays` (
  `sno` int(11) NOT NULL,
  `holdate` date NOT NULL,
  `holname` varchar(30) NOT NULL,
  `holtype` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `holidays`
--

INSERT INTO `holidays` (`sno`, `holdate`, `holname`, `holtype`) VALUES
(1, '2017-08-15', 'Independence Day', 'Public Holiday'),
(2, '2017-01-01', 'Sunday', 'Public Holiday'),
(3, '2017-01-08', 'Sunday', 'Public Holiday'),
(4, '2017-01-15', 'Sunday', 'Public Holiday'),
(5, '2017-01-22', 'Sunday', 'Public Holiday'),
(6, '2017-01-29', 'Sunday', 'Public Holiday'),
(7, '2017-02-05', 'Sunday', 'Public Holiday'),
(8, '2017-02-12', 'Sunday', 'Public Holiday'),
(9, '2017-02-19', 'Sunday', 'Public Holiday'),
(10, '2017-02-26', 'Sunday', 'Public Holiday'),
(11, '2017-03-05', 'Sunday', 'Public Holiday'),
(12, '2017-03-12', 'Sunday', 'Public Holiday'),
(13, '2017-03-19', 'Sunday', 'Public Holiday'),
(14, '2017-03-26', 'Sunday', 'Public Holiday'),
(15, '2017-04-02', 'Sunday', 'Public Holiday'),
(16, '2017-04-09', 'Sunday', 'Public Holiday'),
(17, '2017-04-16', 'Sunday', 'Public Holiday'),
(18, '2017-04-23', 'Sunday', 'Public Holiday'),
(19, '2017-04-30', 'Sunday', 'Public Holiday'),
(20, '2017-05-07', 'Sunday', 'Public Holiday'),
(21, '2017-05-14', 'Sunday', 'Public Holiday'),
(22, '2017-05-21', 'Sunday', 'Public Holiday'),
(23, '2017-05-28', 'Sunday', 'Public Holiday'),
(24, '2017-06-04', 'Sunday', 'Public Holiday'),
(25, '2017-06-11', 'Sunday', 'Public Holiday'),
(26, '2017-06-18', 'Sunday', 'Public Holiday'),
(27, '2017-06-25', 'Sunday', 'Public Holiday'),
(28, '2017-07-02', 'Sunday', 'Public Holiday'),
(29, '2017-07-09', 'Sunday', 'Public Holiday'),
(30, '2017-07-16', 'Sunday', 'Public Holiday'),
(31, '2017-07-23', 'Sunday', 'Public Holiday'),
(32, '2017-07-30', 'Sunday', 'Public Holiday'),
(33, '2017-08-06', 'Sunday', 'Public Holiday'),
(34, '2017-08-13', 'Sunday', 'Public Holiday'),
(35, '2017-08-20', 'Sunday', 'Public Holiday'),
(36, '2017-08-27', 'Sunday', 'Public Holiday'),
(37, '2017-09-03', 'Sunday', 'Public Holiday'),
(38, '2017-09-10', 'Sunday', 'Public Holiday'),
(39, '2017-09-17', 'Sunday', 'Public Holiday'),
(40, '2017-09-24', 'Sunday', 'Public Holiday'),
(41, '2017-10-01', 'Sunday', 'Public Holiday'),
(42, '2017-10-08', 'Sunday', 'Public Holiday'),
(43, '2017-10-15', 'Sunday', 'Public Holiday'),
(44, '2017-10-22', 'Sunday', 'Public Holiday'),
(45, '2017-10-29', 'Sunday', 'Public Holiday'),
(46, '2017-11-05', 'Sunday', 'Public Holiday'),
(47, '2017-11-12', 'Sunday', 'Public Holiday'),
(48, '2017-11-19', 'Sunday', 'Public Holiday'),
(49, '2017-11-26', 'Sunday', 'Public Holiday'),
(50, '2017-12-03', 'Sunday', 'Public Holiday'),
(51, '2017-12-10', 'Sunday', 'Public Holiday'),
(52, '2017-12-17', 'Sunday', 'Public Holiday'),
(53, '2017-12-24', 'Sunday', 'Public Holiday'),
(54, '2017-12-31', 'Sunday', 'Public Holiday'),
(59, '2017-08-28', 'ganesh chaturthi', 'Public Holiday'),
(60, '2017-09-30', 'Dasara', 'Public Holiday'),
(61, '2016-12-04', 'Sunday', 'Public Holiday'),
(62, '2016-12-11', 'Sunday', 'Public Holiday'),
(63, '2016-12-18', 'Sunday', 'Public Holiday'),
(64, '2017-10-02', 'Gandhi Jayanthi', 'Public Holiday'),
(65, '2017-10-19', 'Diwali', 'Public Holiday'),
(66, '2017-12-25', 'Christmas', 'Public Holiday');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `holidays`
--
ALTER TABLE `holidays`
  ADD PRIMARY KEY (`sno`),
  ADD UNIQUE KEY `holdate` (`holdate`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `holidays`
--
ALTER TABLE `holidays`
  MODIFY `sno` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
