-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Oct 06, 2017 at 01:07 PM
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
  `repaired_on` datetime DEFAULT NULL,
  `repaired_by` varchar(255) DEFAULT NULL,
  `date_of_resolution` date DEFAULT NULL,
  `notes` text,
  `image` text,
  `insert_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `delete_status` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `data`
--

INSERT INTO `data` (`did`, `domain`, `issue_desc`, `location`, `problem`, `raised_by`, `reg_no`, `mobile`, `status`, `priority`, `repaired_on`, `repaired_by`, `date_of_resolution`, `notes`, `image`, `insert_dt`, `delete_status`) VALUES
(2, 'carpentary', 'civil desc 1', 'civil loc 1', 'civil prob 1', 'Dr. Ch. Phani Rama Krishna', '', '9491273518', 'verified_resolved', 'medium', '2017-07-28 15:32:45', 'sai', '2017-04-29', 'notes', NULL, '2017-04-21 15:05:22', ''),
(3, 'civil', 'vvv', 'vzzv', 'zxvz', 'sai', '', '1234', 'verified_resolved', NULL, NULL, NULL, '2017-07-31', NULL, NULL, '2017-05-24 11:30:50', ''),
(31, 'gardening', 'Test issue by vijay', 'City office 1st floor', 'Testing app', 'Dr. Ch. Phani Rama Krishna', '', '9491273518', 'verified_resolved', 'high', '2017-01-03 00:00:00', 'Me', '2017-04-25', 'Notes', NULL, '2017-04-21 03:37:52', ''),
(33, 'house_keeping', 'House kneeling issue test', 'City center', 'City center', 'Raju Akrivia', '', '9177611871', 'verified_resolved', 'high', NULL, NULL, '2017-04-26', NULL, NULL, '2017-04-21 05:25:52', ''),
(34, 'water_supply', 'Test - no water supply ', 'Students hostel', 'Thirsty ', 'Dr. Ch. Phani Rama Krishna', '', '9491273518', 'verified_resolved', NULL, NULL, NULL, '2017-04-25', NULL, NULL, '2017-04-21 07:40:00', ''),
(36, 'sanitation', 'Test- no cleanliness ', 'Staff toilet', 'Smelling ', 'Dr. Ch. Phani Rama Krishna', '', '9491273518', 'verified_resolved', NULL, NULL, NULL, '2017-05-01', NULL, NULL, '2017-04-21 09:49:11', ''),
(37, 'transportation', 'Test- No seat for student A', '5758 bus', 'Standing', 'Dr. A Vijay Kumar', '', '9963261138', 'verified_resolved', NULL, NULL, NULL, '2017-04-24', NULL, NULL, '2017-04-21 19:15:50', ''),
(38, 'infrastructure', 'Internet not working ', 'Test- REC Mechanical Faculty room 2', 'Can not update results ', 'Dr. A Vijay Kumar', '', '9963261138', 'verified_resolved', NULL, NULL, NULL, '2017-04-24', NULL, NULL, '2017-04-21 19:19:40', ''),
(40, 'misc', 'Test desc', 'Test locations ', 'Test problems ', 'Dr. Ch. Phani Rama Krishna', '', '9491273518', 'verified_resolved', NULL, NULL, NULL, '2017-04-25', NULL, NULL, '2017-04-24 06:52:50', ''),
(42, 'civil', 'Test - Building leakages', 'EEE 2 nd floor ', 'Watery', 'Dr. Ch. Phani Rama Krishna', '', '9491273518', 'pending', NULL, NULL, NULL, NULL, NULL, NULL, '2017-04-25 01:27:44', ''),
(43, 'electrical', 'Test - fan not working ', 'Test - Room no 14, first floor ', 'Hot', 'Dr. Ch. Phani Rama Krishna', '', '9491273518', 'verified_resolved', NULL, NULL, NULL, '2017-04-28', NULL, NULL, '2017-04-25 01:31:09', ''),
(44, 'infrastructure', 'LAN not working ', 'Test - Civil department', 'Work halted ', 'Dr. Ch. Phani Rama Krishna', '', '9491273518', 'pending', NULL, NULL, NULL, NULL, NULL, NULL, '2017-04-25 01:32:32', ''),
(45, 'carpentary', 'Test - Windows broken ', 'Test- room 5-2nd floor', 'Hot', 'Dr. Ch. Phani Rama Krishna', '', '9491273518', 'pending', 'low', '2017-07-14 09:50:47', '', '2017-07-22', '', NULL, '2017-04-25 01:34:15', ''),
(46, 'sanitation', 'No water in second floor faculty room in H S', 'L H 35', 'No Water', 'P Ramesh', '', '8106471987', 'pending', NULL, NULL, NULL, NULL, NULL, '1493105991880.jpg', '2017-04-25 02:11:11', ''),
(47, 'water_supply', 'no water in faculty room 2ñd floors: Testing', 'H & S 2nd floors ', 'no water supply', 'AMIT KUMAR MEHAR ', '', '7382710371', 'pending', NULL, NULL, NULL, NULL, NULL, NULL, '2017-04-25 02:42:31', ''),
(49, 'civil', 'Test- pipe leakage ', 'REC - Mech 3rd floor - Gents'' toilet ', 'Wastage and flooding on floor', 'A Nageswara Rao', '', '9912559882', 'pending', NULL, NULL, NULL, NULL, NULL, NULL, '2017-04-25 23:27:55', ''),
(50, 'electrical', 'CC camera is not working', 'College hostel', 'LEFT SIDE CC CAMERA IS NOT WORKING.', 'Somasekharam ', '', '8297355115', 'pending', NULL, NULL, NULL, NULL, NULL, NULL, '2017-04-27 07:18:56', ''),
(51, 'misc', 'Amount of Rs 750 deducted from my salary in the month of September erraneously hasn''t been reverted back, I use my own transportation to college but bus amount was deducted by mistake  ', 'Finance depa7', 'Personal issue', 'N S C Chaitanya', '', '9666772121', 'pending', NULL, NULL, NULL, NULL, NULL, NULL, '2017-04-28 07:59:31', ''),
(52, 'infrastructure', 'my computer has stopped working for the last two months. I requested the concerned persons several times to get it repaired but no body turned up', 'CRT cell ', 'I could not do my papers', 'a nageswararao CRT verbal faculty', '', 'RECECE002', 'pending', NULL, NULL, NULL, NULL, NULL, NULL, '2017-04-28 10:29:37', ''),
(67, 'civil', 'dfsd', 'fsdf', 'sdfsdfs', '', '', 'RECECE002', 'verified_resolved', NULL, NULL, NULL, '2017-08-01', NULL, NULL, '2017-07-26 16:23:50', ''),
(68, 'electrical', 'hfhh', 'gh', 'hhff', 'staff1-ece', '', NULL, 'pending', NULL, NULL, NULL, NULL, NULL, NULL, '2017-07-26 16:26:39', ''),
(70, 'civil', 'not working', 'dfsfsdf', 'sdfsd', 'raju', '9848829185', NULL, 'verified_resolved', NULL, NULL, NULL, '2017-07-25', NULL, NULL, '2017-07-24 09:09:13', ''),
(72, 'water_supply', 'not working', 'cvx', 'xvxc', 'raju', '9848829185', NULL, 'verified_resolved', NULL, '2017-11-06 00:00:00', 'ser', '2017-12-01', 'notes', NULL, '2017-08-01 09:42:12', ''),
(90, 'sanitation', 'bad smell at canteen due to garbage', 'canteen', 'bad smell', 'staff1-cse', 'RECCSE001', NULL, 'pending', NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 04:06:03', ''),
(91, 'civil', 'sd', 'asdf', 'asd', 'staff1-cse', 'RECCSE001', NULL, 'pending', NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 04:08:07', ''),
(92, 'civil', 'sdfsdf', 'sssdf', 'sdf', 'staff1-cse', 'RECCSE001', NULL, 'pending', NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 06:45:59', ''),
(94, 'civil', 'sdf', 'sfs', 'fsdf', 'staff1-cse', 'RECCSE001', NULL, 'pending', NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 06:48:17', ''),
(95, 'sanitation', 'sdfsdf', 'sdfsd', 'sdfsd', 'staff1-cse', 'RECCSE001', NULL, 'pending', NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 06:50:38', ''),
(96, 'house_keeping', 'uncleanness', 'RIT', 'unclean ', 'staff1-cse', 'RECCSE001', NULL, 'pending', 'low', '2017-09-13 13:03:42', 'gh', '2017-09-14', 'hgf', NULL, '2017-08-01 06:53:20', ''),
(97, 'water_supply', 'sdf', 'sdf', 'sdf', 'staff1-cse', 'RECCSE001', NULL, 'user_deleted', NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 06:54:15', ''),
(98, 'water_supply', 'fsdf', 'saf', 'fsdfsd', 'staff1-cse', 'RECCSE001', NULL, 'pending', NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 07:01:37', ''),
(99, 'water_supply', 'asda', 'asd', 'asd', 'staff1-cse', 'RECCSE001', NULL, 'resolution_in_progress', NULL, '2017-11-01 00:00:00', 'raju', '2017-11-01', 'notes', NULL, '2017-08-01 07:05:11', ''),
(100, 'carpentary', 'asasas', 'asadada', 'aasd', 'staff1-cse', 'RECCSE001', NULL, 'pending', NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 07:06:04', ''),
(101, 'civil', 'fsd', 'sdf', 'sdfsdfsd', 'staff1-cse', 'RECCSE001', NULL, 'user_deleted', NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 08:27:14', ''),
(102, 'electrical', 'sd', 'sdf', 'sdfsd', 'staff1-cse', 'RECCSE001', NULL, 'pending', NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 08:31:58', ''),
(103, 'electrical', 'sdf', 'sdf', 'sdf', 'staff1-cse', 'RECCSE001', NULL, 'user_deleted', NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 08:33:50', ''),
(106, 'carpentary', 'bench  broken', 'gsfs', 'dfsdfs', 'staff1-cse', 'RECCSE001', NULL, 'onhold', 'low', '2017-08-11 09:33:29', 'ravi', '2017-08-12', 'it will resolve', NULL, '2017-08-01 11:09:21', ''),
(107, 'civil', 'ssdf', 'civl probel', 'slf', 'staff1-cse', 'RECCSE001', NULL, 'pending', NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 12:11:48', ''),
(108, 'civil', 'sdfds', 'sdfsdf', 'sdfsd', 'staff1-cse', 'RECCSE001', NULL, 'verified_resolved', 'high', '2017-09-13 13:05:32', 'dasd', '2017-09-23', 'sdasdasd', NULL, '2017-08-01 12:13:18', ''),
(111, 'electrical', 'voltage problem', 'rec college', 'voltage problem', 'staff1-cse', 'RECCSE001', '9859852589', 'pending', NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 03:50:44', ''),
(113, 'civil', 'required new lab for it students', 'in rec collge', 'required new lab', 'Krishna', 'RECCSE005', NULL, 'pending', NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 08:51:49', ''),
(114, 'carpentary', '3 chairs are broken', 'REC CSE SECTION-A ROOM', 'Chairs are broken', 'Krishna', 'RECCSE005', '9859002597', 'verified_resolved', 'low', '2017-08-01 09:23:56', 'ravi', '2017-08-12', 'it will resolve', NULL, '2017-08-04 08:55:00', ''),
(115, 'transportation', 'increase buses for transportation', 'to college', 'increase buses', 'Krishna', 'RECCSE005', '9859002597', '', NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 09:02:34', ''),
(116, 'electrical', 'fan not working', 'fan', 'fan not working', 'raju', '9848829185', NULL, 'pending', NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 15:47:26', ''),
(117, 'electrical', 'fan not working', 'fan', 'fan not working', 'raju', '9848829185', NULL, 'pending', NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 15:47:32', ''),
(119, 'carpentary', 'bench broken', 'in lab', 'bench broken', 'raju', '9848829185', '9859852592', 'verified_resolved', 'low', '2017-08-11 09:14:20', 'ramu', '2017-08-14', 'it will resolve soon', NULL, '2017-08-10 17:17:08', ''),
(121, 'civil', 'door not closing', 'in cellar', 'in cellar', 'raju', '9848829185', '9859852592', 'pending', NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-16 13:05:21', ''),
(122, 'civil', 'try to resolve', 'in hall', 'in hall', 'staff1-ece', 'RECECE002', '9859852590', 'pending', NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-16 13:42:07', ''),
(124, 'civil', 'sdfsdf', 'test', 'fsfsd', 'raju', '9848829185', '9859852592', 'verified_resolved', 'medium', '2017-05-01 00:00:00', 'fsdfsdf', '2017-12-01', 'fsdfsd', NULL, '2017-09-06 12:58:39', ''),
(204, 'electrical', 'dfgdfgd', 'dfgfdgdf', 'gdfgdgdgdgd', 'G.SANYASI RAJU', '', '9848829185', 'pending', NULL, NULL, NULL, NULL, NULL, NULL, '2017-10-03 12:33:54', ''),
(205, 'electrical', 'asS', 'ssSS', 'sSsjhjdfgd', 'G.SANYASI RAJU', '', '9848829185', 'pending', NULL, NULL, NULL, NULL, NULL, NULL, '2017-10-03 12:57:31', ''),
(220, 'electrical', 'test1', 'test1', 'test1', 'N.MARKANDEYA GUPTA', 'rec0045', '9848829185', 'pending', NULL, NULL, NULL, NULL, NULL, NULL, '2017-10-03 15:13:22', ''),
(221, 'carpentary', 'test', 'test', 'te', 'N.MARKANDEYA GUPTA', 'rec0045', '9441129994', 'user_deleted', NULL, '2016-12-31 18:30:00', 'fhgfhg', '2017-07-01', 'fgghjfg', NULL, '2017-10-03 15:14:11', ''),
(222, 'electrical', 'test of ram', 'test of ram', 'test  of ram', 'N.MARKANDEYA GUPTA', 'rec0045', '9848829185', 'resolution_in_progress', NULL, NULL, NULL, NULL, NULL, NULL, '2017-10-03 15:28:01', ''),
(223, 'civil', 'test', 'test', 'test', 'N.MARKANDEYA GUPTA', 'rec0045', '9441129994', 'user_deleted', NULL, NULL, NULL, NULL, NULL, NULL, '2017-10-03 15:28:34', ''),
(224, 'civil', 'test', 'test', 'test', 'N.MARKANDEYA GUPTA', 'rec0045', '9441129994', 'user_deleted', NULL, NULL, NULL, NULL, NULL, NULL, '2017-10-03 15:30:27', ''),
(226, 'misc', 'test', 'test', 'no test', 'N.MARKANDEYA GUPTA', 'rec0045', '9441129994', 'pending', NULL, NULL, NULL, NULL, NULL, NULL, '2017-10-03 15:51:45', ''),
(229, 'electrical', 'at  ground ', 'at ground', 'at  ground ', 'JOSE MOSES', 'rec0080', '9701329977', 'verified_resolved', 'medium', '2017-11-29 20:30:00', 'fdsadsf', '2017-12-01', 'it will resolve', NULL, '2017-10-03 18:23:20', ''),
(234, 'ac', 'fsdfff', 'test', 'test', 'JOSE MOSES', 'rec0080', '9701329977', 'verified_resolved', NULL, '2016-12-31 13:00:00', 'ds', '2017-08-05', 'fsdfs', NULL, '2017-10-04 10:17:56', ''),
(235, 'water_supply', 'sdfsfs', 'fdsfsdf', 'sdfsdf', 'CH LAVANYA', 'rec0079', '7386733648', 'user_deleted', NULL, NULL, NULL, NULL, NULL, NULL, '2017-10-04 10:18:50', ''),
(236, 'ac', 'test with domain', 'test with doamin', 'test with domain', 'CH LAVANYA', 'rec0044', '7386733648', 'resolution_in_progress', NULL, '2017-12-01 00:00:00', NULL, NULL, NULL, NULL, '2017-10-04 12:41:56', ''),
(238, 'ac', 'tdftgdg', 'dgfdfgdfg', 'test', 'V.SOMASEKHARAM', 'rec0044', '8297355115', 'user_deleted', NULL, NULL, NULL, NULL, NULL, NULL, '2017-10-04 16:17:38', ''),
(240, 'water_supply', 'dfgg', 'dfgdfg', 'dfgdfgd', 'G.SANYASI RAJU', 'rec0094', '8985180061', 'user_deleted', NULL, NULL, NULL, NULL, NULL, NULL, '2017-10-04 16:39:53', ''),
(241, 'carpentary', 'test', 'gvbdfghf', 'test', 'V.SOMASEKHARAM', 'rec0044', '8297355115', 'user_deleted', NULL, NULL, NULL, NULL, NULL, NULL, '2017-10-04 16:50:30', ''),
(242, 'sanitation', 'test', 'test', 'test', 'P.SRINIVAS', 'rec0046', '9032584863', 'pending', NULL, NULL, NULL, NULL, NULL, NULL, '2017-10-05 09:17:36', ''),
(243, 'ac', 'test  of ac', 'ac', 'ac', 'N.MARKANDEYA GUPTA', 'rec0045', '9441129994', 'resolution_in_progress', NULL, NULL, NULL, NULL, NULL, NULL, '2017-10-05 09:20:58', ''),
(244, 'ac', 'test', 'test', 'test', 'V.SOMASEKHARAM', 'rec0044', '8297355115', 'resolution_in_progress', 'medium', NULL, NULL, NULL, NULL, NULL, '2017-10-05 09:35:13', ''),
(245, 'electrical', 'fan', 'fan', 'fan', 'S.SRINADH RAJU', 'rec0047', '9849277324', 'verified_resolved', 'high', '2017-09-01 00:00:00', 'sai', '2017-12-01', 'notes', NULL, '2017-10-05 09:53:54', ''),
(246, 'house_keeping', 'dfsffsfas', 'fsdaf', 'safasdf', 'V.SOMASEKHARAM', 'rec0044', '8297355115', 'verified_resolved', NULL, NULL, NULL, NULL, NULL, NULL, '2017-10-05 10:13:56', ''),
(247, 'misc', 'test', 'test', 'test', 'V.SOMASEKHARAM', 'rec0044', '8297355115', 'verified_resolved', NULL, NULL, NULL, NULL, NULL, NULL, '2017-10-05 12:21:21', ''),
(248, 'infrastructure', 'test', 'test', 'test', 'M Y V NAGESH', 'rec0011', '9848143569', 'pending', NULL, NULL, NULL, NULL, NULL, NULL, '2017-10-05 16:06:20', ''),
(249, 'civil', 'test', 'test', 'test', 'B.RAMESH', 'rec0048', '9550610310', 'pending', NULL, NULL, NULL, NULL, NULL, NULL, '2017-10-06 11:02:18', ''),
(250, 'civil', 'test', 'test', 'test', 'N.MARKANDEYA GUPTA', 'rec0045', '9441129994', '', NULL, NULL, NULL, NULL, NULL, NULL, '2017-10-06 11:56:50', ''),
(251, 'sanitation', ' bin', 'dust', 'dust', 'V.SOMASEKHARAM', 'rec0044', '8297355115', 'pending', NULL, NULL, NULL, NULL, NULL, NULL, '2017-10-06 12:14:52', ''),
(252, 'electrical', 'vcbcvbc', 'vbcvbcv', 'bcvbcb', 'J.RENUKESWARA RAO', 'rec0035', '9440255869', 'pending', NULL, NULL, NULL, NULL, NULL, NULL, '2017-10-06 14:18:12', ''),
(253, 'electrical', 'fgdfg', 'fgfdgfd', 'gdgdg', 'P.RAJESH', 'rec0049', '9885500463', 'pending', NULL, NULL, NULL, NULL, NULL, NULL, '2017-10-06 14:18:53', ''),
(254, 'carpentary', 'test', 'test', 'test', 'A.DURGA PRAVEEN KUMAR', 'rec0022', '9642667945', 'pending', NULL, NULL, NULL, NULL, NULL, NULL, '2017-10-06 14:19:46', ''),
(255, 'electrical', 'fgdsg', 'sdfgsdfg', 'gsddg', 'N.SAHADEVA RAJU', 'rec0076', '7093661835', 'pending', NULL, NULL, NULL, NULL, NULL, NULL, '2017-10-06 14:41:50', ''),
(256, 'civil', 'sadasd', 'asdadad', 'sadasdasd', 'M.VENKATA RAO', 'rec0069', '9494915009', 'pending', NULL, NULL, NULL, NULL, NULL, NULL, '2017-10-06 14:42:50', ''),
(257, 'civil', 'fsdfsfsd', 'fsdfsdfsdf', 'sdfsdfsd', 'B.MADHU BABU', 'rec0015', '9848843262', 'pending', NULL, NULL, NULL, NULL, NULL, NULL, '2017-10-06 16:01:02', ''),
(258, 'water_supply', 'fsdfsdf', 'sdfsdf', 'fdsdfdsf', 'JOSE MOSES', 'rec0080', '9701329977', 'pending', NULL, NULL, NULL, NULL, NULL, NULL, '2017-10-06 16:02:16', '');

-- --------------------------------------------------------

--
-- Table structure for table `domain`
--

CREATE TABLE `domain` (
  `id` int(5) NOT NULL,
  `domain` varchar(100) NOT NULL,
  `domain_title` varchar(100) NOT NULL,
  `domain_info` text NOT NULL,
  `domain_admin` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `domain`
--

INSERT INTO `domain` (`id`, `domain`, `domain_title`, `domain_info`, `domain_admin`) VALUES
(1, 'ac', 'AC', 'AC', '9848829185'),
(2, 'Water Supply', 'Water Supply', 'Water Supply', '1234567891');

-- --------------------------------------------------------

--
-- Table structure for table `domains`
--

CREATE TABLE `domains` (
  `id` int(11) NOT NULL,
  `domain` varchar(100) NOT NULL,
  `domain_title` varchar(100) NOT NULL,
  `domain_info` text NOT NULL,
  `domain_admin` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `domains`
--

INSERT INTO `domains` (`id`, `domain`, `domain_title`, `domain_info`, `domain_admin`) VALUES
(2, 'ac', 'AC', 'AC (Wherever Available - Leakages / Not working / Tripping / No effect)', 'rec0044'),
(3, 'carpentary', 'Carpentry', 'Carpentry (Tables / Benches / Doors…)', 'rec0044,rec0080'),
(4, 'civil', 'Civil', 'Civil (Building / Walls / Roof / Leakages / Flooring…)', 'rec0044'),
(5, 'electrical', 'Electrical', 'Electrical (Fans / Lights / Power Supply / Motors / Line)', 'rec0044'),
(6, 'gardening', 'Gardening', 'Gardening, Cattle Maintenance', 'rec0044'),
(7, 'house_keeping', 'House keeping', 'House keeping (Cleaning, Gardening, Cattle Maintenance, Security)', 'rec0044'),
(8, 'infrastructure', 'Infrastructure', 'Infrastructure (General Infrastructure - Phone, Internet / Intranet …)', 'rec0044'),
(9, 'misc', 'Miscellaneous', 'Miscellaneous (any others such as Postal Delivery …that are not covered above)', 'rec0044'),
(10, 'sanitation', 'Sanitation', 'Sanitation (Normal Water - Non-availability / Leakages / Broken Taps / Broken Pipes / Smell / Breakage of Washroom Equipment / Doors…)', 'rec0079'),
(11, 'transportation', 'Transportation', 'Transportation (Bus / Route / Accident….)', 'rec0044'),
(12, 'water_supply', 'Water Supply', 'Water Supply (Drinking Water - Non-availability / Unclean / Leakages / Broken Taps / Broken Pipes...)', 'rec0044');

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `reg_no` varchar(16) NOT NULL,
  `img_name` text NOT NULL,
  `img_type` text NOT NULL,
  `insert_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `reg_no`, `img_name`, `img_type`, `insert_id`) VALUES
(5, 'RECCSE001', 'hostel-management-10-728.jpg', 'image/jpeg', 0),
(6, 'RECCSE001', 'hindu.jpg', 'image/jpeg', 0),
(7, 'RECCSE001', 'UML_class_diagram_hotel-949x683.PNG', 'image/png', 0),
(8, 'RECCSE001', 'download.jpg', 'image/jpeg', 0),
(9, 'RECCSE001', 'hostel-management-10-728.jpg', 'image/jpeg', 0),
(10, 'RECCSE001', 'UML_class_diagram_hotel-949x683.PNG', 'image/png', 0),
(11, 'RECCSE001', 'hindu.jpg', 'image/jpeg', 0),
(12, 'undefined', 'UML_class_diagram_hotel-949x683.PNG', 'image/png', 0),
(13, 'undefined', 'UML_class_diagram_hotel-949x683.PNG', 'image/png', 0),
(14, 'RECCSE001', '123.jpg', 'image/jpeg', 105),
(15, 'RECCSE001', 'UML_class_diagram_hotel-949x683.PNG', 'image/png', 105),
(16, 'RECCSE001', 'hostel-management-10-728.jpg', 'image/jpeg', 106),
(17, 'RECCSE001', 'UML_class_diagram_hotel-949x683.PNG', 'image/png', 106),
(18, 'RECECE003', 'download.jpg', 'image/jpeg', 109),
(19, 'RECECE003', 'hindu.jpg', 'image/jpeg', 109),
(20, 'RECCSE001', 'ac.jpg', 'image/jpeg', 110),
(21, 'RECCSE001', 'ac1.jpg', 'image/jpeg', 110),
(22, 'RECCSE001', 'electrical.jpg', 'image/jpeg', 111),
(23, 'RECCSE001', 'electrical3.jpg', 'image/jpeg', 111),
(24, 'RECCSE001', '51wLP3wrYrL._SX522_.jpg', 'image/jpeg', 112),
(25, 'RECCSE005', 'images.jpg', 'image/jpeg', 114),
(26, 'RECCSE005', 'images (1).jpg', 'image/jpeg', 115);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `reg_no` varchar(12) NOT NULL,
  `role` varchar(12) NOT NULL,
  `status` tinyint(4) NOT NULL,
  `domain` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `reg_no`, `role`, `status`, `domain`) VALUES
(1, 'admin', 'adm', 1, ''),
(3, 'RECECE002', 'stf', 1, ''),
(4, '125CSE895', 'stf', 1, ''),
(17, 'rec0153', 'stf', 1, 'hardware'),
(18, 'rec0067', 'stf', 1, 'hardware'),
(25, 'RECCIV0001', 'stf', 1, ''),
(27, 'rec0094', 'stf', 1, ''),
(40, 'rec0044', 'stf', 1, 'ac'),
(43, 'rec0022', 'stf', 1, 'water_supply'),
(44, 'rec0006', 'stf', 1, 'water_supply'),
(45, 'rec0044', 'stf', 1, 'water_supply'),
(75, 'rec0044', 'stf', 1, 'carpentary'),
(77, '9491273518', 'stf', 1, 'carpentary'),
(78, '9703400284', 'stf', 1, 'carpentary'),
(79, 'rec0080', 'stf', 1, 'carpentary'),
(87, 'rec0044', 'stf', 1, 'civil'),
(88, 'rec0044', 'stf', 1, 'electrical'),
(89, 'rec0044', 'stf', 1, 'gardening'),
(90, 'rec0044', 'stf', 1, 'house_keeping'),
(91, 'rec0044', 'stf', 1, 'infrastructure'),
(92, 'rec0044', 'stf', 1, 'misc'),
(96, 'rec0044', 'stf', 1, 'transportation');

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `id` smallint(6) UNSIGNED NOT NULL,
  `reg_no` varchar(12) NOT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `dispname` varchar(15) DEFAULT NULL,
  `department` varchar(30) NOT NULL,
  `designation` varchar(255) NOT NULL,
  `qualification` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mobile` varchar(20) NOT NULL,
  `dp` varchar(30) DEFAULT NULL,
  `present_address` text,
  `permanent_address` text,
  `pan` varchar(20) DEFAULT NULL,
  `aadhar` varchar(20) DEFAULT NULL,
  `passport` varchar(25) DEFAULT NULL,
  `dateob` date NOT NULL,
  `placeob` varchar(255) DEFAULT NULL,
  `stateob` varchar(50) DEFAULT NULL,
  `countryob` varchar(50) DEFAULT NULL,
  `gender` varchar(1) DEFAULT NULL,
  `nationality` varchar(30) DEFAULT NULL,
  `religion` varchar(30) DEFAULT NULL,
  `caste` varchar(30) DEFAULT NULL,
  `roll` varchar(20) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`id`, `reg_no`, `firstname`, `lastname`, `dispname`, `department`, `designation`, `qualification`, `email`, `mobile`, `dp`, `present_address`, `permanent_address`, `pan`, `aadhar`, `passport`, `dateob`, `placeob`, `stateob`, `countryob`, `gender`, `nationality`, `religion`, `caste`, `roll`, `status`, `created_at`, `updated_at`) VALUES
(1, 'RECCSE001', 'staff1-cse', 'Faculty', 'CseHod', 'CSE', 'Professor', 'Ph.D.', 'cse_hod@raghuenggcollege.com', '9859852589', '', 'Raghu Engineering College', 'madhurawada', '', '', '', '1975-06-05', '', '', '', 'M', '', '', '', 'staff', 0, '2017-06-13 20:30:00', '2017-06-13 20:30:00'),
(2, 'RECECE002', 'Staff2-ece', 'Faculty', 'CseHod', 'ECE', 'Professor', 'Ph.D.', 'cse_lec@raghuenggcollege.com', '9859852590', '', 'Raghu Engineering College', 'madhurawada', '', '', '', '1975-06-05', '', '', '', '', '', '', '', 'staff', 0, '2017-06-13 20:30:00', '2017-06-13 20:30:00'),
(3, 'RECCSE003', 'staff3', 'Faculty', 'CseHod', 'CSE', 'Professor', 'Ph.D.', 'cse_lec2@raghuenggcollege.com', '9859852591', '', 'Raghu Engineering College', 'madhurawada', '', '', '', '1975-06-07', '', '', '', '', '', '', '', 'staff', 0, '2017-06-13 20:30:00', '2017-06-13 20:30:00'),
(6, '9848829185', 'RAM', 'EMANDI', 'CseHod', 'CSE', 'Professor', 'Ph.D.', 'cse_lec22@raghuenggcollege.com', '9859852592', '', 'Raghu Engineering College', 'madhurawada', '', '', '', '1975-06-07', '', '', '', '', '', '', '', 'staff', 0, '2017-06-13 20:30:00', '2017-06-13 20:30:00');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `mobile` varchar(10) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `role` varchar(10) NOT NULL DEFAULT 'user',
  `insert_dt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`mobile`, `password`, `name`, `role`, `insert_dt`) VALUES
('12', 'e05a62145d3bef89b524e52d4b5088c2', 'ghjnfg', 'user', '2017-05-24 05:39:15'),
('1234', '81dc9bdb52d04dc20036dbd8313ed055', 'sai', 'user', '2017-05-22 11:26:43'),
('25+5254521', '33497acff68832e84d503477ea2266fe', 'ghhfhj', 'user', '2017-05-18 10:12:30'),
('5424534', '6d0f7ef77ab600e51a52f91d85b08f8c', 'bfzhg', 'user', '2017-05-24 04:20:00'),
('546465454', '5eac43aceba42c8757b54003a58277b5', 'zcxzfd', 'user', '2017-05-18 08:55:45'),
('6541542141', '1f2755e6b78d92b3c74fe5adeaa5ef86', 'hfgddd', 'user', '2017-05-18 10:11:58'),
('9703400284', '81dc9bdb52d04dc20036dbd8313ed055', 'Bhaskar', 'user', '2017-03-30 03:37:17'),
('9848825145', 'a29bac723ca2d59ed78a2d715e17e92f', '123456', 'user', '2017-05-18 08:05:13'),
('9848825658', '585a32b10bf63cc329536ed8dbcb006a', 'saiug', 'user', '2017-05-23 04:52:59'),
('9848856895', 'e10adc3949ba59abbe56e057f20f883e', 'sai', 'user', '2017-05-23 09:55:17'),
('9885721144', '81dc9bdb52d04dc20036dbd8313ed055', 'Vijay', 'admin', '2017-03-27 22:49:00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `reg_no` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `utype` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `reg_no`, `password`, `utype`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'admin', '81dc9bdb52d04dc20036dbd8313ed055', 'adm', '1234', '2017-06-12 20:30:00', '2017-06-12 20:30:00'),
(2, 'staff1-cse', 'RECCSE001', '81dc9bdb52d04dc20036dbd8313ed055', 'stf', '1235', '2017-06-14 06:59:29', '2017-06-14 06:59:29'),
(3, 'staff1-ece', 'RECECE001', '81dc9bdb52d04dc20036dbd8313ed055', 'stf', '1235', '2017-06-14 06:59:29', '2017-06-14 06:59:29'),
(4, 'rec0072', 'rec0072', '81dc9bdb52d04dc20036dbd8313ed055', 'stf', '1235', '2017-06-14 06:59:29', '2017-06-14 06:59:29'),
(5, 'Student1', '125CSE895', '81dc9bdb52d04dc20036dbd8313ed055', 'std', '1235', '2017-06-14 06:59:29', '2017-06-14 06:59:29'),
(6, 'Student2', '125CSE896', '81dc9bdb52d04dc20036dbd8313ed055', 'std', '1235', '2017-06-14 06:59:29', '2017-06-14 06:59:29'),
(7, 'raju', '9848829185', '81dc9bdb52d04dc20036dbd8313ed055', 'stf', '1234', '2017-07-24 18:30:00', '2017-07-24 18:30:00');

-- --------------------------------------------------------

--
-- Table structure for table `user_20170902`
--

CREATE TABLE `user_20170902` (
  `mobile` varchar(10) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `role` varchar(10) NOT NULL DEFAULT 'user',
  `insert_dt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_20170902`
--

INSERT INTO `user_20170902` (`mobile`, `password`, `name`, `role`, `insert_dt`) VALUES
('7000763012', '0895888c0828cb0642a32cd433a11caf', 'Dr VIVEK PANDEY', 'user', '2017-07-05 06:41:09'),
('7032045015', '1fd03d70ca720adabd0def7e34bc2078', 'P.SANKAR RAO', 'user', '2017-07-05 06:41:06'),
('7032058703', 'f308be05b455e5757cf980735e865edf', 'S A ANICIA', 'user', '2017-07-05 06:41:03'),
('7032300939', '631db273e3d9b79b33d8ee633bc84af6', 'T.SANTHI PRIYA', 'user', '2017-07-05 06:41:07'),
('7036419679', 'f28e464e3cbe38b4bdf1d8785c60365c', 'V S SUBRAHMANYAM', 'user', '2017-07-05 06:41:03'),
('7093498833', '51d3bf7a979136041a98690af1026221', 'N.SREELEKHA', 'user', '2017-07-05 06:41:05'),
('7093537035', '863528fc8581444cdb4496936698b0fa', 'R SIRI', 'user', '2017-07-05 06:41:09'),
('7093661835', 'fc86edba470145b1136129093c72be92', 'N.SAHADEVA RAJU', 'user', '2017-07-05 06:41:05'),
('7093694120', '5a077b5763fbb529ebac51ed2adadab7', 'RADHARANI NAYAK', 'user', '2017-07-05 06:41:07'),
('7382437305', '1ac905c0d0512c101d08a693b7cbe9f0', 'P NAGABHUSHANAM', 'user', '2017-07-05 06:41:08'),
('7382676386', '8e88fda1f7a69d5c78134a040a5e69be', 'R.NAVEEN KUMAR', 'user', '2017-07-05 06:41:02'),
('7382710371', '5cb20dbd21b11b548bc14be903058e30', 'AMIT KUMAR MEHAR', 'user', '2017-07-05 06:41:09'),
('7386733648', 'd9eeee9e4e3c16292f403e506fd68c4e', 'CH LAVANYA', 'user', '2017-07-05 06:41:05'),
('7396948546', '189683deb719b25594f6bf68deb30ca8', 'T HIMA BINDU', 'user', '2017-07-05 06:41:09'),
('7416126063', '5bc33441a1eb602fdd68bd7549ea0040', 'V PRAMADHA RANI', 'user', '2017-07-05 06:41:08'),
('7569695170', 'e2986011ee6573c6e6e4de6cb98e8fb5', 'A. Rutwik', 'user', '2017-07-05 06:41:11'),
('7675868401', '91a4967030587864cf4699d2d5bf60e0', 'Dr R SRINIVASU', 'user', '2017-07-05 06:41:05'),
('7675883454', 'e7fc85baddae3ff365e28a85f46aa3f3', 'S SARALA', 'user', '2017-07-05 06:41:07'),
('7680035838', '17a39579d410d9e3227d0224ce949f9b', 'K.SATHIRAJU', 'user', '2017-07-05 06:41:02'),
('7702365407', 'd7e2f7f08070b88f9e1d391c9c3c36f8', 'P NARESH', 'user', '2017-07-05 06:41:05'),
('7731893018', '8415b449ae8409ff3becdbb1f09d3c14', 'Dr.T.VENKATA SWAMY', 'user', '2017-07-05 06:41:05'),
('7794961578', 'b6d7ca91a4893d88889433358a1bbcf4', 'K SULOCHANA', 'user', '2017-07-05 06:41:07'),
('7901084088', '7130f417b4a1c8dc21ee30cb3ce5884a', 'Dr. B SRINIVAS', 'user', '2017-07-05 06:41:10'),
('7993860812', 'f04f590a1a416fa455f953fe79c49a0c', 'S.KRANTHI KUMAR', 'user', '2017-07-05 06:41:02'),
('8008163810', 'b271cc8dd71d0aba42eb4984058b6547', 'Dr K.SUBRAMANYAM', 'user', '2017-07-05 06:41:05'),
('8019953776', '6f94e3f330f1c3786e4458adb34054db', 'S. TEJESWAR REDDY', 'user', '2017-07-05 06:41:06'),
('8099837057', '991c7dff27b1e5650f5f51ce63ec6697', 'BH.V.S.NARAYANA', 'user', '2017-07-05 06:41:04'),
('8106065740', '8195a00bdf3abd6bfbcb01e14d87e3c4', 'K PRANEETH', 'user', '2017-07-05 06:41:06'),
('8106471987', 'e34a92673de26e0f8c63efc9b6f14d0b', 'P RAMESH', 'user', '2017-07-05 06:41:08'),
('8106522400', '5a340a7986c70457ff90ef6d41750055', 'R VINAY KUMAR', 'user', '2017-07-05 06:41:09'),
('8106669180', 'f5345eda798e10b2033a016ac0365b39', 'JASMINE VINCENT', 'user', '2017-07-05 06:41:10'),
('8106801082', '95dd6714cb0cf0c3450e17d2104b190f', 'M. HARISH', 'user', '2017-07-05 06:41:11'),
('8121486179', 'c008530d71cb0b7a972d35d51ff6d4ed', 'P. SIDDHARTHA', 'user', '2017-07-05 06:41:06'),
('8125999176', '8c2c68e97521295b6dda5bb97a0c05b6', 'K H K RAGHU VAMSI', 'user', '2017-07-05 06:41:09'),
('8142028790', '240c8b2e99c2634408886bc9d94f820c', 'A.J.SIRISHA', 'user', '2017-07-05 06:41:02'),
('8179575475', 'a76aa92eb45feadabfcb9bd66a60397f', 'G. SANTOSH KUMAR VARMA', 'user', '2017-07-05 06:41:11'),
('8179889924', '6829329691e452375dcaf0a116873d67', 'B SIVA RAMA RAO', 'user', '2017-07-05 06:41:04'),
('8297355115', '93ce641dca7241b8c07aa97c1906fe65', 'V.SOMASEKHARAM', 'user', '2017-07-05 06:41:03'),
('8328873507', 'e102b2ce8f34b6e6b176d727cc1a09e8', 'M.ANIL KUMAR', 'user', '2017-07-05 06:41:02'),
('8374482962', '9d49f5fa14974429d1cf7bc2a187380d', 'B VISALAKSHI', 'user', '2017-07-05 06:41:07'),
('8374956009', 'bd0399ae98b19c0887629f816eb46c3d', 'P RAVI KUMAR', 'user', '2017-07-05 06:41:09'),
('8500066706', '12f1ba21ac9a199e8be0158843185bfc', 'P BEERSHEBA', 'user', '2017-07-05 06:41:10'),
('8500220436', '357d33a7879fc893416e5cf2a971479e', 'K.V. VARA LAKSHMI', 'user', '2017-07-05 06:41:06'),
('8512017988', '67772ca1e8b067c35452f2110952b1d7', 'T. SATYANARAYANA', 'user', '2017-07-05 06:41:10'),
('8712411484', 'c863b06c124428eb48a6a6c10bb0f2d3', 'N B L V PRASAD', 'user', '2017-07-05 06:41:09'),
('8790395392', '8dbcad2eaeb2217e2be8303b5c0af02c', 'B SUDEEPTHI', 'user', '2017-07-05 06:41:08'),
('8790768098', 'b0d4bfb241d45821ad214d74710fdb8e', 'S.SUDHIRVARMA', 'user', '2017-07-05 06:41:06'),
('8885868862', '25a86bdd8db27059ff44cf11a0e8c943', 'Y SUDHAVANI', 'user', '2017-07-05 06:41:10'),
('8886035887', 'f5f5f26a57ce76498e3c2754dbb537ba', 'M SRIDHAR', 'user', '2017-07-05 06:41:07'),
('8897106860', '5b44a96c0a9d8301fa39eed71a10fca4', 'A.SUKANYA', 'user', '2017-07-05 06:41:04'),
('8897342286', '487c7f2c7c9a7271628eb77408c2b31f', 'Y. SATYANARAYANA RAJU', 'user', '2017-07-05 06:41:05'),
('8939555476', '4a2f69834100e0a6508ca48a41b3ade2', 'MOHD MERAJ KHAN', 'user', '2017-07-05 06:41:10'),
('8985180061', 'dd841e0350837bd9767d9c98ecfcf635', 'G.SANYASI RAJU', 'user', '2017-07-05 06:41:06'),
('8985442583', '701654921ed5bff49f2de9eb43bd659a', 'G. SAROJA', 'user', '2017-07-05 06:41:11'),
('8985498548', 'd34563bd1e01bc223dd09cbcfd1b0cf4', 'P. TEJASWI', 'user', '2017-07-05 06:41:11'),
('8985689398', 'b929fab56da43e1c721ce26d5ee7c699', 'K.SHANMUKHA RAO', 'admin', '2017-07-05 06:41:06'),
('8985950503', '2bc9ace279963eb76b50f1e2661112db', 'K.SWATHI', 'user', '2017-07-05 06:41:04'),
('9030313211', '9aca0d03028763c44ef1cc1698de21cf', 'MUNAGAPATI MURALI', 'user', '2017-07-05 06:41:11'),
('9032584863', '15ac4b6fd0d63952a9ea41a3518958a9', 'P.SRINIVAS', 'user', '2017-07-05 06:41:03'),
('9032622672', '37447cc7b4ddbc98b2a623266a40c3d2', 'K SREEKANTH', 'user', '2017-07-05 06:41:08'),
('9032972944', 'fec80c80f30d275817473263c2421111', 'SHAHAZADI BEGUM', 'user', '2017-07-05 06:41:05'),
('9052056603', '79e0688b937d036b5aefc2088d248507', 'LAL BABUPRASAD', 'user', '2017-07-05 06:41:03'),
('9052258695', '62e501ea4dd70eb38810c93dd12258b9', 'MANISH YADAV', 'user', '2017-07-05 06:41:07'),
('9052855580', 'bed1fe0fe38ef4a1809886519dbab3bb', 'M.SURYA RAO', 'user', '2017-07-05 06:41:06'),
('9059630102', '2cb493c3fb798e5100675551580ad97c', 'P S KRISHNAM RAJU', 'user', '2017-07-05 06:41:07'),
('9100090962', 'b1cbb326ed705f65905f38e1943b7802', 'D SANDHYA RANI', 'user', '2017-07-05 06:41:09'),
('9160176959', '017bddea890d7e3356c2035633457370', 'NETHALA RAJU', 'user', '2017-07-05 06:41:08'),
('9160642265', 'b52bbe8b38838ec811132cf7c66186e1', 'CH.SRAVANI', 'user', '2017-07-05 06:41:06'),
('9176781782', '08769687abfb7a97ce14873721d5e839', 'D SIVA PRASAD VARMA', 'user', '2017-07-05 06:41:07'),
('9177562490', '3ac612c156a9418d63936e39ac01f52e', 'Y SWAPNA', 'user', '2017-07-05 06:41:08'),
('9177913391', 'da059dccb4993fd68402c147aaf4f2d3', 'R VIJAY SAGAR', 'user', '2017-07-05 06:41:09'),
('9177987611', '3399557f6da573cadd5c19dd354e12d4', 'P.CHNADRA SEKHAR PILLI', 'user', '2017-07-05 06:41:05'),
('9290926811', 'a81752e756add4fab773e28a6377c8bb', 'Y.RAGHAVENDRA', 'user', '2017-07-05 06:41:04'),
('9337342847', '4453ed4446a71eee53d385665694ad65', 'S KUMAR', 'user', '2017-07-05 06:41:07'),
('9393994484', '3bbcea7a222d42e22d000080d8060188', 'N.ANIL CHAKRAVARTHY', 'user', '2017-07-05 06:41:01'),
('9394041299', '28d6327f78ec1b3f015c3b9f5d15e771', 'Y.VENKATA RAO', 'user', '2017-07-05 06:41:05'),
('9437777934', '084aaf149136e186c30a153cbfdd8e03', 'Dr PANCHANAND JHA', 'user', '2017-07-05 06:41:06'),
('9439558518', '064c54f11e2646f1902ab1d576b40ff7', 'G SUNIL KUMAR', 'user', '2017-07-05 06:41:09'),
('9440066974', '41567703e06389f19226eb882bbadd61', 'PKVS SUBRAMANYESWARA RAO', 'user', '2017-07-05 06:41:04'),
('9440149970', '41092f2e45517b07645bf84061a29fc5', 'Dr. M MURALI', 'user', '2017-07-05 06:41:10'),
('9440167423', 'd14d00335e2c1c2c937b7c5a68dde389', 'L.SATISH KUMAR', 'user', '2017-07-05 06:41:04'),
('9440240968', 'd8440de0d14be022b9f273c77e30a824', 'TVS SRIRAM', 'user', '2017-07-05 06:41:02'),
('9440255869', 'f0629af9125773e16fd25344d68255ca', 'J.RENUKESWARA RAO', 'user', '2017-07-05 06:41:03'),
('9440390008', '5e22699079e0fa6d2ebb53c949c251af', 'S.SANTOSH KUMAR', 'user', '2017-07-05 06:41:05'),
('9440649945', '08234311151a67e1d9e0bfe53a8bfad6', 'Dr G CH S N RAJU', 'admin', '2017-07-05 06:41:01'),
('9440748299', 'a591466e802d3dd07eb18b275bace1db', 'B.UMAMAHESWAR\r\n RAO', 'user', '2017-07-05 06:41:01'),
('9441098527', '80db04d412496b48a5767f772e763a4c', 'K JYOTHSNA', 'user', '2017-07-05 06:41:09'),
('9441129994', 'f110ff412f37f1dcfdb6ecae7c8ad327', 'N.MARKANDEYA GUPTA', 'user', '2017-07-05 06:41:03'),
('9441179883', 'd7fda03274183891182dea294b11c1e6', 'Dr A.S.PRAKASH RAO', 'admin', '2017-07-05 06:41:03'),
('9441292298', '1e935d3e73211976bd39749ce49a8823', 'RAJ KISHOR DAS', 'user', '2017-07-05 06:41:09'),
('9441604400', '82f80336ba92a9f9b8c234ab7363d360', 'NIKHIL BHAT', 'user', '2017-07-05 06:41:05'),
('9441768332', '20d3282ed4c44e93187038980f1cf374', 'Y S G GOVIND BABU', 'user', '2017-07-05 06:41:09'),
('9486692624', '3e6cd7bf969c9ca9c8dad5eb42560960', 'Dr T GANAPATHY', 'user', '2017-07-05 06:41:09'),
('9490107574', '52536d6b86424d239099f40d59fb0216', 'I S SIVA RAO', 'user', '2017-07-05 06:41:02'),
('9490133068', '62b1a2a7386aa67ab250d325df58e8e1', 'Dr R.V.BHASKAR', 'user', '2017-07-05 06:41:02'),
('9490267816', '5728323b234f72e6c7deb19cf084fd6a', 'S S PRAKASH RAO', 'admin', '2017-07-05 06:41:06'),
('9490389019', '813dae81d0d5acf762b56e01b8258470', 'YLV SANTOSH KUMAR', 'user', '2017-07-05 06:41:04'),
('9490476859', 'c3ce9bc293d7b81591d2adf5ddb83593', 'T.ANURADHA', 'user', '2017-07-05 06:41:03'),
('9490935341', '93aeebdf16a79b5972a3a4b227301fd0', 'Dr. P MALLIKARJUNA RAO', 'user', '2017-07-05 06:41:01'),
('9491273518', 'd3148f1a6bd5295bb03c238afda42231', 'Dr. PHANI RAMA KRISHNA CHUNDURY', 'admin', '2017-07-05 06:41:07'),
('9491792896', '3e703878b7563d2e80a8969f5645e2e0', 'VVN SURYANARAYANA RAO', 'user', '2017-07-05 06:41:04'),
('9491936489', 'a7da2056fc1699aea9c7fc502b87e746', 'T P R VITAL', 'user', '2017-07-05 06:41:02'),
('9492161260', 'eb32a387b11b9bc45ba76f9d7f8fdc61', 'D MOUNIKA', 'user', '2017-07-05 06:41:11'),
('9492180348', '02a00632cb413e224d1af31d10df5f05', 'N.ADILAKSHMI', 'user', '2017-07-05 06:41:04'),
('9492452500', '867bb80b2d7c9b87b754b1793b6de312', 'K MAHESWAR RAO', 'user', '2017-07-05 06:41:08'),
('9492545673', 'f708483847f5425a796d304415e9a31b', 'P REVATHI', 'user', '2017-07-05 06:41:08'),
('9492589554', '0e40e1fbfa34e3a75d7af7cc30651b27', 'DVR VASU PAVANI', 'user', '2017-07-05 06:41:06'),
('9492621558', '5454588bd82aeec5551c05f891cb4f86', 'M.KRISHNA KISHORE', 'user', '2017-07-05 06:41:01'),
('9492756039', '9ee4bb63ecb5151a80744303b527d876', 'D V S RAVI VARMA', 'user', '2017-07-05 06:41:03'),
('9492850751', '1a77462388fc6f3cfab50a85f66d7e0e', 'P.E.SATYANARAYANA', 'user', '2017-07-05 06:41:04'),
('9493009874', '29c5b555376e4ad05968f4756229ab15', 'V. MOHANA GANDHI', 'user', '2017-07-05 06:41:11'),
('9493254730', '487e5bfe847454d67e19e2d56e8c3cc6', 'Dr.S RAVI', 'user', '2017-07-05 06:41:09'),
('9493312936', 'fc34ca5e675ee30e0b179c6248c98468', 'M SRIKANTH', 'user', '2017-07-05 06:41:10'),
('9493313615', 'b1ea23992addd4a388946ca349886fef', 'A SWETHA', 'user', '2017-07-05 06:41:08'),
('9493398570', '5ecc6a458986ce91d923dec9b2013312', 'BLESSY NAVARA', 'user', '2017-07-05 06:41:08'),
('9493434508', 'fa1a779e118a32002044ef32cbf06644', 'Dr. R VAIKUNTA RAO', 'user', '2017-07-05 06:41:10'),
('9493789403', 'ab775769967e0168ce848ae302035c71', 'V PARTHA SARADHI', 'user', '2017-07-05 06:41:03'),
('9494012421', '17a8a5b39dfe919fd157cbaf79d8c82f', 'S.APPALA RAJU', 'user', '2017-07-05 06:41:02'),
('9494107322', '4acf6fce2902a6a41490b7ac7324c1d9', 'P.V.V. RAJAGOPAL', 'user', '2017-07-05 06:41:10'),
('9494330642', '1e45eceff675241a748be0b2c6cc1853', 'M.RUPALI', 'user', '2017-07-05 06:41:05'),
('9494331758', '56bbe38aec63ca4e742c353d5c585c44', 'K CHINABABU', 'user', '2017-07-05 06:41:08'),
('9494484269', '22ddf2e0a5e74cb6cb41a5c4b347bc92', 'Dr. V.PRAMILA MURTHY', 'user', '2017-07-05 06:41:06'),
('9494905701', '0bd1a56096f44e1e1e6acdda764c70ba', 'T SURESH', 'user', '2017-07-05 06:41:08'),
('9494915009', '5fbb6b99b9df2877bf4effc6e2963749', 'M.VENKATA RAO', 'user', '2017-07-05 06:41:04'),
('9502808301', '753bc38ab38579d356be6bff98b66de3', 'K ARUN KUMAR', 'user', '2017-07-05 06:41:01'),
('9502944429', 'dafc747b70bdcd303cc395750a48080c', 'M.V.SURESH KUMAR', 'user', '2017-07-05 06:41:02'),
('9505813580', '916cc67c90bf7e47c1872b0a4a712a0e', 'R GOVINDA', 'user', '2017-07-05 06:41:09'),
('9515128092', 'f57a214065a74f6fac2a7e6f4a5d9178', 'L Rama Krishna', 'admin', '2017-08-21 02:36:21'),
('9515173466', 'f6d23bf981afd93254837fecde483188', 'B.SREEVIDYA', 'user', '2017-07-05 06:41:06'),
('9550388536', 'd54754da629ff931f5fcd57e4f3c56f0', 'P.RAJA NAVEEN', 'user', '2017-07-05 06:41:06'),
('9550610310', '8c0788392c3f71b55710b44cff54fc1c', 'B.RAMESH', 'user', '2017-07-05 06:41:03'),
('9550752880', '7a6999084137517189f1c1ef128c342c', 'Prakash', 'admin', '2017-08-21 02:29:55'),
('9573739301', 'ad0faa17b8b09febe56108165f53b1b6', 'D. KEERTHI', 'user', '2017-07-05 06:41:11'),
('9581001216', '528bf47e2458caf93f478d87f29861de', 'R. SUPRIYA', 'user', '2017-07-05 06:41:11'),
('9581665766', '8bbdaa61e2824f99ad47fc054fa1b2ec', 'Y.V.SRI CHARAN', 'user', '2017-07-05 06:41:04'),
('9603240973', '31b59f75333530bb4b2dda0856d7540e', 'D BHASKARA RAO', 'user', '2017-07-05 06:41:08'),
('9618006879', 'dd576d5bc8141334ea312d41e6c2f710', 'CH.RAJESH', 'user', '2017-07-05 06:41:05'),
('9640000022', 'b0ef7457b088d019e67d7baa7cfbab17', 'G.SRIDEVI', 'user', '2017-07-05 06:41:02'),
('9642154993', '4b12db78ad47c487d96e87f138aa616b', 'GUPTESWAR SAHU', 'user', '2017-07-05 06:41:08'),
('9642667945', '09a15e5d3e77a114157a3fc14d5f274c', 'A.DURGA PRAVEEN KUMAR', 'user', '2017-07-05 06:41:02'),
('9642707136', '81524cf59d6014483feaa41060ce357b', 'Y E VASANTH KUMAR', 'user', '2017-07-05 06:41:08'),
('9652655597', 'bfa1b044bbc181889f27226c71ba17fe', 'S P APARANJI', 'user', '2017-07-05 06:41:09'),
('9666444838', 'cef0866e8968e568ea70ea521e80192d', 'J RAMESH NAIDU', 'user', '2017-07-05 06:41:10'),
('9666772121', '5634df65e6f313df9845e771afed36b3', 'N S C  CHAITANYA', 'user', '2017-07-05 06:41:06'),
('9676255312', '8955f62143e2df9cd5052fa128123224', 'SVV RAMA DEVI', 'user', '2017-07-05 06:41:06'),
('9700507823', 'fc6b856c94ba41d8aa60b3423bfd618f', 'Dr T.RAMU', 'user', '2017-07-05 06:41:05'),
('9701329977', '201ed98f06611dc64b2bc1e57d8f28b2', 'Dr G.JOSE MOSES', 'user', '2017-07-05 06:41:05'),
('9701499568', 'f78e1280023dcc88804a87f814a59c4b', 'P SEKHARA BABU', 'user', '2017-07-05 06:41:04'),
('9701703435', '9cf6fe9dcf4d0cfe72e8b38688b68d2b', 'P P N G PHANI KUMAR', 'user', '2017-07-05 06:41:06'),
('9701750007', 'b216143951cdd2638b4380876ec59256', 'I. KRISHNA CHAITANYA', 'user', '2017-07-05 06:41:02'),
('9701841804', 'd6abb965c1ab5f3fd14ce49c33354c51', 'Swamy Naidu', 'admin', '2017-08-21 02:28:45'),
('9703032728', '5e8c4051ef31b398ae6c008d629c4d80', 'MD. RAMEEZ', 'user', '2017-07-05 06:41:07'),
('9704112614', '1df95385d5932a29a72d9cfa4337570a', 'M SHOBHA', 'user', '2017-07-05 06:41:08'),
('9704597504', '3c30b8c7c5396dca49264b8e382994ea', 'S.RAMANA BABU', 'user', '2017-07-05 06:41:03'),
('9741913658', '8f750135e2ba1d40b6069177d2cb3c8d', 'MD ARIF', 'user', '2017-07-05 06:41:10'),
('9848143569', '7a3ffe4474098a9ac016db9899c8bdac', 'M Y V NAGESH', 'user', '2017-07-05 06:41:01'),
('9848418725', '92686e9deb27a9bfb0932bc4f727d26c', 'SAI SRIKANTH', 'user', '2017-07-05 06:41:10'),
('9848843262', 'f1896cd7f1c94915c9df9bbc05955bcb', 'B.MADHU BABU', 'user', '2017-07-05 06:41:02'),
('9849277324', '9af8c790d5e82d8e2f8bed67533fe37b', 'S.SRINADH RAJU', 'user', '2017-07-05 06:41:03'),
('9849332767', 'dfdbfd06fd01624141de1fa4fcd98cb4', 'A VAMSIDHAR', 'user', '2017-07-05 06:41:10'),
('9849434679', 'dc1d2b828acc1a780d0f236febe18d9d', 'T S KAVITHA', 'user', '2017-07-05 06:41:10'),
('9849715162', '1112a164a58b37fa5c35da680696b2bc', 'D UMA SANKAR', 'user', '2017-07-05 06:41:10'),
('9866100246', '35430aa9dfe89def40f875e1977d98f8', 'B.L.GANESWARA RAO', 'user', '2017-07-05 06:41:05'),
('9866115724', '78ebf7472ec3637e9a305a53e9fa69fe', 'S.PRASADA RAO', 'user', '2017-07-05 06:41:03'),
('9866264335', '23cca3a6c9a10a73ab5b9f4effc86cb7', 'K SRINIVAS RAVI KUMAR', 'user', '2017-07-05 06:41:07'),
('9866349200', '5d1ae80cbacf2676215af6b0b35d69b4', 'G V SIVA PRASAD', 'user', '2017-07-05 06:41:02'),
('9866563790', '81dc9bdb52d04dc20036dbd8313ed055', 'Rambabu', 'admin', '2017-07-24 04:41:38'),
('9866956792', 'c487ba5ee9132e35afde9716d9053101', 'K.BHANU KUMARI', 'user', '2017-07-05 06:41:02'),
('9885135483', '6f5b101801062c0cbc31e51d0717d243', 'P.ANIL KUMAR', 'user', '2017-07-05 06:41:04'),
('9885500463', 'acba0a568c37f83498d2044985409c83', 'P.RAJESH', 'user', '2017-07-05 06:41:03'),
('9885766942', '6ac79932135737a84e073f68887c8063', 'U SARAT', 'user', '2017-07-05 06:41:01'),
('9908152545', 'aca4989812acaa5572697ef0df31db36', 'P.SURENDRA VARMA', 'user', '2017-07-05 06:41:04'),
('9908536668', 'b2928f5f1f8d87a9d00b2b248c4b05cc', 'Dr S SATYANARAYANA', 'user', '2017-07-05 06:41:09'),
('9908640028', '484ace2e847d724b8ec5aeef778a79f4', 'K.MADHAVI', 'user', '2017-07-05 06:41:03'),
('9908725792', 'f77e48a61c3cc4bc51a57e88d4e3a6d9', 'B.G.MADHURI', 'user', '2017-07-05 06:41:02'),
('9912559882', 'be7d566123964adf2f8da9364073bce8', 'A.NAGESWARA RAO', 'user', '2017-07-05 06:41:05'),
('9912742228', 'a60e01d5a4fdccc3cc098f0b2eb3c97b', 'A Gurunath', 'admin', '2017-08-21 00:36:22'),
('9948458738', 'd353194e5bd7a7dc5e47e4b576c5a5bc', 'M. SATYANARAYANA', 'user', '2017-07-05 06:41:05'),
('9949095892', '3555c1e4f3a643ba12e37e8d27f33cb2', 'R KAMESWARA RAO', 'user', '2017-07-05 06:41:03'),
('9949158306', 'a98c59c8c251a0a3ef5c8c27bec0e5d0', 'L SREEDHAR', 'user', '2017-07-05 06:41:07'),
('9949221613', '515bb5f3e504ddb61b7d4fd11b1847f2', 'G RAJA KUMARI', 'user', '2017-07-05 06:41:10'),
('9949448554', '494108e921de057a9d21e5ceb7db415a', 'V.TATA RAO', 'user', '2017-07-05 06:41:03'),
('9959163196', '14dfe15a19c6f1c781eca315122f30a3', 'K.PHANINDER VINAY', 'user', '2017-07-05 06:41:02'),
('9963166376', '6afe48b917ec0414b5c60f91f7d2f482', 'R. SRINIVASA RAO', 'user', '2017-07-05 06:41:04'),
('9963173161', '7a1ea0f180bb466895985b3931336a75', 'P.VENUGOPAL', 'user', '2017-07-05 06:41:05'),
('9963261138', '476f5e8a9612622f46c5a15c941ee430', 'A VIJAY KUMAR', 'admin', '2017-07-05 06:41:01'),
('9966124125', 'eac93cc199425a608c49fce1fbbcf85c', 'VANDANA MAHANTHI', 'user', '2017-07-05 06:41:07'),
('9966375939', '795348e7584c19cc523efb1d2ddd8ae7', 'SK.DARYABI', 'user', '2017-07-05 06:41:01'),
('9966384195', '3aab93f0abce7b42320a8ae9cb560e27', 'K.PAVAN KUMAR', 'user', '2017-07-05 06:41:01'),
('9966912408', '23f9e4e37fd9124a57c0e14336eab287', 'T KALYANI', 'user', '2017-07-05 06:41:09'),
('9985201816', '675fafc83377a6dbd7506ae104d02cc7', 'K. TRINADHA RAO', 'user', '2017-07-05 06:41:03'),
('9989013998', '7f63e121d4076313bdcddc0799828528', 'N V S S PRABHAKAR', 'user', '2017-07-05 06:41:04'),
('9989346633', 'a368d55d07aa01e59c8e17cc5787f4e2', 'C.V.R.PADMAJA', 'user', '2017-07-05 06:41:11'),
('9989547753', '3ba39f03d762a298ec5bb1250c5dbafb', 'M MEENA KUMARI', 'user', '2017-07-05 06:41:02'),
('9989609720', 'f28447bd3d96b572692444030955ef12', 'Dr S SATYANARAYANA', 'user', '2017-07-05 06:41:01');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `data`
--
ALTER TABLE `data`
  ADD PRIMARY KEY (`did`);

--
-- Indexes for table `domain`
--
ALTER TABLE `domain`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `domains`
--
ALTER TABLE `domains`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `staff_empid_unique` (`reg_no`),
  ADD UNIQUE KEY `staff_mobile_unique` (`mobile`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`mobile`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_username_unique` (`reg_no`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `data`
--
ALTER TABLE `data`
  MODIFY `did` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=259;
--
-- AUTO_INCREMENT for table `domain`
--
ALTER TABLE `domain`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `domains`
--
ALTER TABLE `domains`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=98;
--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `id` smallint(6) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
