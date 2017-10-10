-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Oct 10, 2017 at 02:32 PM
-- Server version: 10.1.19-MariaDB
-- PHP Version: 5.5.38

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `issue_register`
--

-- --------------------------------------------------------

--
-- Table structure for table `data`
--

CREATE TABLE `data` (
  `did` int(50) NOT NULL,
  `domain` varchar(100) NOT NULL,
  `issue_desc` text NOT NULL,
  `location` varchar(255) NOT NULL,
  `problem` text NOT NULL,
  `raised_by` varchar(255) NOT NULL,
  `reg_no` varchar(50) NOT NULL,
  `mobile` varchar(10) DEFAULT NULL,
  `status` varchar(100) NOT NULL DEFAULT 'pending',
  `priority` varchar(10) DEFAULT NULL,
  `assigned_on` datetime DEFAULT NULL,
  `assignedtext` varchar(50) DEFAULT NULL,
  `expected_date_of_resolution` datetime DEFAULT NULL,
  `repaired_on` datetime DEFAULT NULL,
  `repaired_by` varchar(255) DEFAULT NULL,
  `date_of_resolution` date DEFAULT NULL,
  `notes` text,
  `cannottext` varchar(50) DEFAULT NULL,
  `onholdtext` varchar(50) DEFAULT NULL,
  `image` text,
  `insert_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `delete_status` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `data`
--

INSERT INTO `data` (`did`, `domain`, `issue_desc`, `location`, `problem`, `raised_by`, `reg_no`, `mobile`, `status`, `priority`, `assigned_on`, `assignedtext`, `expected_date_of_resolution`, `repaired_on`, `repaired_by`, `date_of_resolution`, `notes`, `cannottext`, `onholdtext`, `image`, `insert_dt`, `delete_status`) VALUES
(2, 'carpentary', 'civil desc 1', 'civil loc 1', 'civil prob 1', 'Dr. Ch. Phani Rama Krishna', '', '9491273518', 'verified_resolved', 'medium', NULL, NULL, NULL, '2017-07-28 15:32:45', 'sai', '2017-04-29', 'notes', NULL, NULL, NULL, '2017-04-21 15:05:22', ''),
(3, 'civil', 'vvv', 'vzzv', 'zxvz', 'sai', '', '1234', 'verified_resolved', NULL, NULL, NULL, NULL, NULL, NULL, '2017-07-31', NULL, NULL, NULL, NULL, '2017-05-24 11:30:50', ''),
(31, 'gardening', 'Test issue by vijay', 'City office 1st floor', 'Testing app', 'Dr. Ch. Phani Rama Krishna', '', '9491273518', 'verified_resolved', 'high', NULL, NULL, NULL, '2017-01-03 00:00:00', 'Me', '2017-04-25', 'Notes', NULL, NULL, NULL, '2017-04-21 03:37:52', ''),
(33, 'house_keeping', 'House kneeling issue test', 'City center', 'City center', 'Raju Akrivia', '', '9177611871', 'verified_resolved', 'high', NULL, NULL, NULL, NULL, NULL, '2017-04-26', NULL, NULL, NULL, NULL, '2017-04-21 05:25:52', ''),
(34, 'water_supply', 'Test - no water supply ', 'Students hostel', 'Thirsty ', 'Dr. Ch. Phani Rama Krishna', '', '9491273518', 'verified_resolved', NULL, NULL, NULL, NULL, NULL, NULL, '2017-04-25', NULL, NULL, NULL, NULL, '2017-04-21 07:40:00', ''),
(36, 'sanitation', 'Test- no cleanliness ', 'Staff toilet', 'Smelling ', 'Dr. Ch. Phani Rama Krishna', '', '9491273518', 'verified_resolved', NULL, NULL, NULL, NULL, NULL, NULL, '2017-05-01', NULL, NULL, NULL, NULL, '2017-04-21 09:49:11', ''),
(37, 'transportation', 'Test- No seat for student A', '5758 bus', 'Standing', 'Dr. A Vijay Kumar', '', '9963261138', 'verified_resolved', NULL, NULL, NULL, NULL, NULL, NULL, '2017-04-24', NULL, NULL, NULL, NULL, '2017-04-21 19:15:50', ''),
(38, 'infrastructure', 'Internet not working ', 'Test- REC Mechanical Faculty room 2', 'Can not update results ', 'Dr. A Vijay Kumar', '', '9963261138', 'verified_resolved', NULL, NULL, NULL, NULL, NULL, NULL, '2017-04-24', NULL, NULL, NULL, NULL, '2017-04-21 19:19:40', ''),
(40, 'misc', 'Test desc', 'Test locations ', 'Test problems ', 'Dr. Ch. Phani Rama Krishna', '', '9491273518', 'verified_resolved', NULL, NULL, NULL, NULL, NULL, NULL, '2017-04-25', NULL, NULL, NULL, NULL, '2017-04-24 06:52:50', ''),
(42, 'civil', 'Test - Building leakages', 'EEE 2 nd floor ', 'Watery', 'Dr. Ch. Phani Rama Krishna', '', '9491273518', 'pending', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-04-25 01:27:44', ''),
(43, 'electrical', 'Test - fan not working ', 'Test - Room no 14, first floor ', 'Hot', 'Dr. Ch. Phani Rama Krishna', '', '9491273518', 'verified_resolved', NULL, NULL, NULL, NULL, NULL, NULL, '2017-04-28', NULL, NULL, NULL, NULL, '2017-04-25 01:31:09', ''),
(44, 'infrastructure', 'LAN not working ', 'Test - Civil department', 'Work halted ', 'Dr. Ch. Phani Rama Krishna', '', '9491273518', 'pending', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-04-25 01:32:32', ''),
(45, 'carpentary', 'Test - Windows broken ', 'Test- room 5-2nd floor', 'Hot', 'Dr. Ch. Phani Rama Krishna', '', '9491273518', 'verified_resolved', 'low', NULL, NULL, NULL, '2017-07-14 09:50:47', '', '2017-07-22', 'ghij', NULL, NULL, NULL, '2017-04-25 01:34:15', ''),
(46, 'sanitation', 'No water in second floor faculty room in H S', 'L H 35', 'No Water', 'P Ramesh', '', '8106471987', 'pending', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1493105991880.jpg', '2017-04-25 02:11:11', ''),
(47, 'water_supply', 'no water in faculty room 2ñd floors: Testing', 'H & S 2nd floors ', 'no water supply', 'AMIT KUMAR MEHAR ', '', '7382710371', 'pending', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-04-25 02:42:31', ''),
(49, 'civil', 'Test- pipe leakage ', 'REC - Mech 3rd floor - Gents'' toilet ', 'Wastage and flooding on floor', 'A Nageswara Rao', '', '9912559882', 'pending', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-04-25 23:27:55', ''),
(50, 'electrical', 'CC camera is not working', 'College hostel', 'LEFT SIDE CC CAMERA IS NOT WORKING.', 'Somasekharam ', '', '8297355115', 'pending', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-04-27 07:18:56', ''),
(51, 'misc', 'Amount of Rs 750 deducted from my salary in the month of September erraneously hasn''t been reverted back, I use my own transportation to college but bus amount was deducted by mistake  ', 'Finance depa7', 'Personal issue', 'N S C Chaitanya', '', '9666772121', 'pending', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-04-28 07:59:31', ''),
(52, 'infrastructure', 'my computer has stopped working for the last two months. I requested the concerned persons several times to get it repaired but no body turned up', 'CRT cell ', 'I could not do my papers', 'a nageswararao CRT verbal faculty', '', 'RECECE002', 'pending', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-04-28 10:29:37', ''),
(67, 'civil', 'dfsd', 'fsdf', 'sdfsdfs', '', '', 'RECECE002', 'verified_resolved', NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01', NULL, NULL, NULL, NULL, '2017-07-26 16:23:50', ''),
(68, 'electrical', 'hfhh', 'gh', 'hhff', 'staff1-ece', '', NULL, 'pending', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-07-26 16:26:39', ''),
(70, 'civil', 'not working', 'dfsfsdf', 'sdfsd', 'raju', '9848829185', NULL, 'verified_resolved', NULL, NULL, NULL, NULL, NULL, NULL, '2017-07-25', NULL, NULL, NULL, NULL, '2017-07-24 09:09:13', ''),
(72, 'water_supply', 'not working', 'cvx', 'xvxc', 'raju', '9848829185', NULL, 'verified_resolved', NULL, NULL, NULL, NULL, '2017-11-06 00:00:00', 'ser', '2017-12-01', 'notes', NULL, NULL, NULL, '2017-08-01 09:42:12', ''),
(90, 'sanitation', 'bad smell at canteen due to garbage', 'canteen', 'bad smell', 'staff1-cse', 'RECCSE001', NULL, 'pending', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 04:06:03', ''),
(91, 'civil', 'sd', 'asdf', 'asd', 'staff1-cse', 'RECCSE001', NULL, 'pending', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 04:08:07', ''),
(92, 'civil', 'sdfsdf', 'sssdf', 'sdf', 'staff1-cse', 'RECCSE001', NULL, 'pending', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 06:45:59', ''),
(94, 'civil', 'sdf', 'sfs', 'fsdf', 'staff1-cse', 'RECCSE001', NULL, 'pending', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 06:48:17', ''),
(95, 'sanitation', 'sdfsdf', 'sdfsd', 'sdfsd', 'staff1-cse', 'RECCSE001', NULL, 'pending', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 06:50:38', ''),
(96, 'house_keeping', 'uncleanness', 'RIT', 'unclean ', 'staff1-cse', 'RECCSE001', NULL, 'pending', 'low', NULL, NULL, NULL, '2017-09-13 13:03:42', 'gh', '2017-09-14', 'hgf', NULL, NULL, NULL, '2017-08-01 06:53:20', ''),
(97, 'water_supply', 'sdf', 'sdf', 'sdf', 'staff1-cse', 'RECCSE001', NULL, 'user_deleted', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 06:54:15', ''),
(98, 'water_supply', 'fsdf', 'saf', 'fsdfsd', 'staff1-cse', 'RECCSE001', NULL, 'pending', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 07:01:37', ''),
(99, 'water_supply', 'asda', 'asd', 'asd', 'staff1-cse', 'RECCSE001', NULL, 'verified_resolved', 'medium', NULL, NULL, NULL, '2017-12-01 00:00:00', 'dasd', '2017-12-01', 'sdfsd', NULL, NULL, NULL, '2017-08-01 07:05:11', ''),
(100, 'carpentary', 'asasas', 'asadada', 'aasd', 'staff1-cse', 'RECCSE001', NULL, 'verified_resolved', 'low', NULL, NULL, NULL, NULL, NULL, '2017-10-12', 'dsfgd', NULL, NULL, NULL, '2017-08-01 07:06:04', ''),
(101, 'civil', 'fsd', 'sdf', 'sdfsdfsd', 'staff1-cse', 'RECCSE001', NULL, 'user_deleted', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 08:27:14', ''),
(102, 'electrical', 'sd', 'sdf', 'sdfsd', 'staff1-cse', 'RECCSE001', NULL, 'pending', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 08:31:58', ''),
(103, 'electrical', 'sdf', 'sdf', 'sdf', 'staff1-cse', 'RECCSE001', NULL, 'user_deleted', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 08:33:50', ''),
(106, 'carpentary', 'bench  broken', 'gsfs', 'dfsdfs', 'staff1-cse', 'RECCSE001', NULL, 'onhold', 'low', NULL, NULL, NULL, '2017-08-11 09:33:29', 'ravi', '2017-08-12', 'it will resolve', NULL, NULL, NULL, '2017-08-01 11:09:21', ''),
(107, 'civil', 'ssdf', 'civl probel', 'slf', 'staff1-cse', 'RECCSE001', NULL, 'pending', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 12:11:48', ''),
(108, 'civil', 'sdfds', 'sdfsdf', 'sdfsd', 'staff1-cse', 'RECCSE001', NULL, 'verified_resolved', 'high', NULL, NULL, NULL, '2017-09-13 13:05:32', 'dasd', '2017-09-23', 'sdasdasd', NULL, NULL, NULL, '2017-08-01 12:13:18', ''),
(111, 'electrical', 'voltage problem', 'rec college', 'voltage problem', 'staff1-cse', 'RECCSE001', '9859852589', 'pending', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 03:50:44', ''),
(113, 'civil', 'required new lab for it students', 'in rec collge', 'required new lab', 'Krishna', 'RECCSE005', NULL, 'cannot_be_resolved', 'low', '2017-10-19 00:00:00', 'bgvfdg', NULL, NULL, 'rec0067', NULL, NULL, 'dfghfhf', 'dgdfgsd', NULL, '2017-08-04 08:51:49', ''),
(114, 'carpentary', '3 chairs are broken', 'REC CSE SECTION-A ROOM', 'Chairs are broken', 'Krishna', 'RECCSE005', '9859002597', 'verified_resolved', 'low', NULL, NULL, NULL, '2017-08-01 09:23:56', 'ravi', '2017-10-11', 'it will resolve', NULL, NULL, NULL, '2017-08-04 08:55:00', ''),
(116, 'electrical', 'fan not working', 'fan', 'fan not working', 'raju', '9848829185', NULL, 'assigned', 'high', '2017-10-10 00:00:00', 'it nnn', NULL, NULL, 'rec0072', NULL, NULL, NULL, NULL, NULL, '2017-08-10 15:47:26', ''),
(117, 'electrical', 'fan not working', 'fan', 'fan not working', 'raju', '9848829185', NULL, 'assigned', 'low', '2017-10-14 00:00:00', 'set', NULL, NULL, 'rec0124', NULL, NULL, NULL, NULL, NULL, '2017-08-10 15:47:32', ''),
(119, 'carpentary', 'bench broken', 'in lab', 'bench broken', 'raju', '9848829185', '9859852592', 'assigned', 'low', '2017-10-12 00:00:00', 'gfgd', NULL, '2017-08-11 09:14:20', 'rec0032', '2017-08-14', 'it will resolve soon', NULL, NULL, NULL, '2017-08-10 17:17:08', ''),
(121, 'civil', 'door not closing', 'in cellar', 'in cellar', 'raju', '9848829185', '9859852592', 'verified_resolved', 'high', '2017-10-26 00:00:00', 'xcvbcxfbv', NULL, NULL, 'rec0067', '2017-10-18', 'it will resolve', NULL, 'dfg', NULL, '2017-08-16 13:05:21', ''),
(122, 'civil', 'try to resolve', 'in hall', 'in hall', 'staff1-ece', 'RECECE002', '9859852590', 'assigned', 'high', '2017-10-11 00:00:00', 'it will resolve', NULL, NULL, 'rec0003', NULL, NULL, NULL, NULL, NULL, '2017-08-16 13:42:07', ''),
(124, 'civil', 'sdfsdf', 'test', 'fsfsd', 'raju', '9848829185', '9859852592', 'verified_resolved', 'medium', NULL, NULL, NULL, '2017-05-01 00:00:00', 'fsdfsdf', '2017-12-01', 'fsdfsd', NULL, NULL, NULL, '2017-09-06 12:58:39', ''),
(261, 'ac', 'not working', 'n', 'n', 'V.SOMASEKHARAM', 'rec0044', '8297355115', 'assigned', 'low', '2017-10-06 00:00:00', 'try to make fast', NULL, NULL, 'rec0045', NULL, NULL, NULL, NULL, NULL, '2017-09-10 13:01:18', ''),
(262, 'carpentary', 'not working', 'not working', 'not working', 'V.SOMASEKHARAM', 'rec0044', '8297355115', 'verified_resolved', '', NULL, NULL, NULL, NULL, NULL, '2017-10-13', 'srtyu', NULL, NULL, NULL, '2017-09-10 13:02:22', ''),
(264, 'carpentary', 'testa', 'testb', 'testc', 'CH S N RAJU', 'rec0001', '9440649945', 'verified_resolved', 'high', NULL, NULL, NULL, '2017-10-19 00:00:00', 'ravi', '2017-10-13', 'notes', NULL, NULL, NULL, '2017-09-10 13:16:52', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `data`
--
ALTER TABLE `data`
  ADD PRIMARY KEY (`did`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `data`
--
ALTER TABLE `data`
  MODIFY `did` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=270;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
