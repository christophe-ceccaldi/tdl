-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : lun. 19 juin 2023 à 11:16
-- Version du serveur : 10.6.5-MariaDB
-- Version de PHP : 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `tdl`
--

-- --------------------------------------------------------

--
-- Structure de la table `rights`
--

DROP TABLE IF EXISTS `rights`;
CREATE TABLE IF NOT EXISTS `rights` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `owner_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `owner_id` (`owner_id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `rights`
--

INSERT INTO `rights` (`id`, `owner_id`, `user_id`) VALUES
(12, 5, 2),
(7, 3, 4),
(8, 3, 2),
(9, 3, 5),
(11, 5, 4),
(13, 5, 3),
(20, 4, 2),
(21, 4, 5);

-- --------------------------------------------------------

--
-- Structure de la table `task`
--

DROP TABLE IF EXISTS `task`;
CREATE TABLE IF NOT EXISTS `task` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tache` varchar(255) NOT NULL,
  `state` tinyint(1) NOT NULL,
  `dateCrea` datetime NOT NULL,
  `dateRea` datetime DEFAULT NULL,
  `id_utilisateur` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `task`
--

INSERT INTO `task` (`id`, `tache`, `state`, `dateCrea`, `dateRea`, `id_utilisateur`) VALUES
(4, 'rdv abraham', 1, '2023-06-15 12:22:35', '2023-06-15 12:48:15', 3),
(3, 'rdv chaise ergonomique', 1, '2023-06-15 11:47:23', '2023-06-19 13:02:08', 3),
(5, 'rdv rue d\'hozier', 0, '2023-06-15 12:22:52', NULL, 3),
(6, 'dentiste', 0, '2023-06-19 11:56:35', NULL, 5),
(7, 'rdv chaise ergonomique', 1, '2023-06-19 12:54:10', '2023-06-19 13:00:26', 2),
(8, 'New Task', 0, '2023-06-19 13:03:49', NULL, 4);

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

DROP TABLE IF EXISTS `utilisateurs`;
CREATE TABLE IF NOT EXISTS `utilisateurs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `login` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `utilisateurs`
--

INSERT INTO `utilisateurs` (`id`, `nom`, `prenom`, `login`, `password`) VALUES
(4, '', '', 'dave', '$2y$10$rXy9Zlbv2A26x80s/ANWIuSz2KKeeQrcJ9xCCj1tFIasQ9jdRV1yS'),
(2, 'hari', 'mata', 'tic', '$2y$10$M02b2AjXNP59XwEn8GY/J.PoExUfpzm5oO6s9KTTM7wFiuBUkiZX.'),
(3, 'hicks', 'chris', 'cricri', '$2y$10$YIGR9JaSSMeZgMKPtteaSeSwltmlJ/8zFAqLl5A6KbDcF9XM9Z/sm'),
(5, '', '', 'toto', '$2y$10$Ldh8U8RTuwwoz150cOwZT.8LBRxc5FBRP8B51RmbZlu.LjXuD3YDG');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
