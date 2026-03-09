-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 08, 2026 at 06:34 PM
-- Server version: 12.2.2-MariaDB
-- PHP Version: 8.5.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `username` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`username`, `password_hash`, `created_at`) VALUES
('Kynda', '$2y$12$TBkygz7opFmqc/uMvxe.AeLMe8jjuAbuAlog14Pxu7n1HVTigbpyS', '2026-03-08 18:29:43');

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `book_id` int(11) NOT NULL AUTO_INCREMENT,
  `seller_username` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `isbn` varchar(13) DEFAULT NULL,
  `subject` varchar(100) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `condition_status` enum('nuovo','ottimo','buono','usato') DEFAULT 'buono',
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `buyer_username` varchar(50) DEFAULT NULL,
  `sale_date` timestamp NULL DEFAULT NULL,
  `sale_price` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`book_id`),
  KEY `seller_username` (`seller_username`),
  KEY `buyer_username` (`buyer_username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `message_id` int(11) NOT NULL AUTO_INCREMENT,
  `sender_username` varchar(50) NOT NULL,
  `receiver_username` varchar(50) NOT NULL,
  `book_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `sent_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`message_id`),
  KEY `sender_username` (`sender_username`),
  KEY `receiver_username` (`receiver_username`),
  KEY `book_id` (`book_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Constraints for table `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `fk_books_seller` FOREIGN KEY (`seller_username`) REFERENCES `users` (`username`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_books_buyer` FOREIGN KEY (`buyer_username`) REFERENCES `users` (`username`) ON DELETE SET NULL;

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `fk_msg_sender` FOREIGN KEY (`sender_username`) REFERENCES `users` (`username`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_msg_receiver` FOREIGN KEY (`receiver_username`) REFERENCES `users` (`username`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_msg_book` FOREIGN KEY (`book_id`) REFERENCES `books` (`book_id`) ON DELETE CASCADE;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;