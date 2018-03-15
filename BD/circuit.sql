-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le :  mer. 14 mars 2018 à 22:10
-- Version du serveur :  10.1.30-MariaDB
-- Version de PHP :  7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `circuit`
--
CREATE DATABASE IF NOT EXISTS `circuit` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `circuit`;

-- --------------------------------------------------------

--
-- Structure de la table `categorie`
--

CREATE TABLE `categorie` (
  `idCategorie` int(11) NOT NULL,
  `nom` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `circuits`
--

CREATE TABLE `circuits` (
  `idCircuit` int(8) NOT NULL,
  `nom` varchar(50) DEFAULT NULL,
  `description` varchar(50) CHARACTER SET ucs2 COLLATE ucs2_bin DEFAULT NULL,
  `capacite` int(4) DEFAULT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  `prix_idprix` int(11) NOT NULL,
  `active` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `commande`
--

CREATE TABLE `commande` (
  `idCommande` int(11) NOT NULL,
  `nbInscription` int(11) DEFAULT NULL,
  `datePayment` date DEFAULT NULL,
  `prixTotal` decimal(10,0) DEFAULT NULL,
  `idGroupeVoyage` int(11) NOT NULL,
  `idUtilisateur` int(8) NOT NULL,
  `montantDepot` decimal(10,0) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `connexion`
--

CREATE TABLE `connexion` (
  `idConnexion` int(11) NOT NULL,
  `courriel` varchar(50) DEFAULT NULL,
  `motDePasse` varchar(50) DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `etape`
--

CREATE TABLE `etape` (
  `idEtape` int(8) NOT NULL,
  `Photo` varchar(50) DEFAULT NULL,
  `description` longtext,
  `Circuits_idCircuit` int(8) NOT NULL,
  `numero` int(11) DEFAULT NULL,
  `Pays` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `groupevoyage`
--

CREATE TABLE `groupevoyage` (
  `idGroupeVoyage` int(11) NOT NULL,
  `nbInscrit` int(11) DEFAULT NULL,
  `dateDebut` date DEFAULT NULL,
  `dateFin` date DEFAULT NULL,
  `idCircuit` int(8) NOT NULL,
  `idpromotion` int(11) NOT NULL,
  `capacite` int(11) DEFAULT NULL,
  `prixAdulte` decimal(10,0) DEFAULT NULL,
  `prixEnfant` decimal(10,0) DEFAULT NULL,
  `prixBebe` decimal(10,0) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `hotel`
--

CREATE TABLE `hotel` (
  `idHotel` int(8) NOT NULL,
  `nom` varchar(50) DEFAULT NULL,
  `urlHotel` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `jour`
--

CREATE TABLE `jour` (
  `idJour` int(8) NOT NULL,
  `description` longtext,
  `photo` varchar(50) DEFAULT NULL,
  `idEtape` int(8) NOT NULL,
  `Activites` longtext,
  `idHotel` int(8) NOT NULL,
  `idRestaurant` int(8) NOT NULL,
  `ville` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `promotion`
--

CREATE TABLE `promotion` (
  `idpromotion` int(11) NOT NULL,
  `description` varchar(45) DEFAULT NULL,
  `rabaisAdulte` decimal(10,0) DEFAULT NULL,
  `rabaisEnfant` decimal(10,0) DEFAULT NULL,
  `rabaisBebe` decimal(10,0) DEFAULT NULL,
  `statut` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `restaurant`
--

CREATE TABLE `restaurant` (
  `idRestaurant` int(8) NOT NULL,
  `Nom` varchar(50) DEFAULT NULL,
  `urlRestaurant` longtext
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `themes`
--

CREATE TABLE `themes` (
  `idThemes` int(8) NOT NULL,
  `nom` varchar(50) DEFAULT NULL,
  `idCircuit` int(11) NOT NULL,
  `iconUrl` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `idUtilisateur` int(8) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `dateNaissance` date NOT NULL,
  `idConnexion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `voyageur`
--

CREATE TABLE `voyageur` (
  `idVoyageur` int(11) NOT NULL,
  `courriel` varchar(45) NOT NULL,
  `nom` varchar(45) DEFAULT NULL,
  `prenom` varchar(45) DEFAULT NULL,
  `idCategorie` int(11) NOT NULL,
  `sexe` varchar(20) DEFAULT NULL,
  `dateNaissance` date DEFAULT NULL,
  `NoPasseport` varchar(255) DEFAULT NULL,
  `dateExpirarationPassport` date DEFAULT NULL,
  `idCommande` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `categorie`
--
ALTER TABLE `categorie`
  ADD PRIMARY KEY (`idCategorie`);

--
-- Index pour la table `circuits`
--
ALTER TABLE `circuits`
  ADD PRIMARY KEY (`idCircuit`),
  ADD UNIQUE KEY `Nom_UNIQUE` (`nom`);

--
-- Index pour la table `commande`
--
ALTER TABLE `commande`
  ADD PRIMARY KEY (`idCommande`),
  ADD KEY `fk_Commande_GroupeVoyage1_idx` (`idGroupeVoyage`),
  ADD KEY `fk_Commande_Utilisateur1_idx` (`idUtilisateur`);

--
-- Index pour la table `connexion`
--
ALTER TABLE `connexion`
  ADD PRIMARY KEY (`idConnexion`);

--
-- Index pour la table `etape`
--
ALTER TABLE `etape`
  ADD PRIMARY KEY (`idEtape`),
  ADD KEY `fk_Etape_Circuits1_idx` (`Circuits_idCircuit`);

--
-- Index pour la table `groupevoyage`
--
ALTER TABLE `groupevoyage`
  ADD PRIMARY KEY (`idGroupeVoyage`),
  ADD KEY `fk_GroupeVoyage_Circuits1_idx` (`idCircuit`),
  ADD KEY `fk_GroupeVoyage_promotion1_idx` (`idpromotion`);

--
-- Index pour la table `hotel`
--
ALTER TABLE `hotel`
  ADD PRIMARY KEY (`idHotel`),
  ADD UNIQUE KEY `Nom_UNIQUE` (`nom`);

--
-- Index pour la table `jour`
--
ALTER TABLE `jour`
  ADD PRIMARY KEY (`idJour`),
  ADD KEY `fk_Jour_Etape1_idx` (`idEtape`),
  ADD KEY `fk_Jour_Hotel1_idx` (`idHotel`),
  ADD KEY `fk_Jour_Restaurant1_idx` (`idRestaurant`);

--
-- Index pour la table `promotion`
--
ALTER TABLE `promotion`
  ADD PRIMARY KEY (`idpromotion`);

--
-- Index pour la table `restaurant`
--
ALTER TABLE `restaurant`
  ADD PRIMARY KEY (`idRestaurant`),
  ADD UNIQUE KEY `Nom_UNIQUE` (`Nom`);

--
-- Index pour la table `themes`
--
ALTER TABLE `themes`
  ADD PRIMARY KEY (`idThemes`),
  ADD KEY `fk_Themes_Circuits1_idx` (`idCircuit`);

--
-- Index pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`idUtilisateur`),
  ADD KEY `fk_Utilisateur_Connexion1` (`idConnexion`);

--
-- Index pour la table `voyageur`
--
ALTER TABLE `voyageur`
  ADD PRIMARY KEY (`idVoyageur`),
  ADD KEY `fk_Voyageur_Categorie1_idx` (`idCategorie`),
  ADD KEY `fk_Voyageur_Commande1_idx` (`idCommande`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `categorie`
--
ALTER TABLE `categorie`
  MODIFY `idCategorie` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `voyageur`
--
ALTER TABLE `voyageur`
  MODIFY `idVoyageur` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `commande`
--
ALTER TABLE `commande`
  ADD CONSTRAINT `fk_Commande_GroupeVoyage1` FOREIGN KEY (`idGroupeVoyage`) REFERENCES `groupevoyage` (`idGroupeVoyage`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Commande_Utilisateur1` FOREIGN KEY (`idUtilisateur`) REFERENCES `utilisateur` (`idUtilisateur`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `etape`
--
ALTER TABLE `etape`
  ADD CONSTRAINT `fk_Etape_Circuits1` FOREIGN KEY (`Circuits_idCircuit`) REFERENCES `circuits` (`idCircuit`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `groupevoyage`
--
ALTER TABLE `groupevoyage`
  ADD CONSTRAINT `fk_GroupeVoyage_Circuits1` FOREIGN KEY (`idCircuit`) REFERENCES `circuits` (`idCircuit`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_GroupeVoyage_promotion1` FOREIGN KEY (`idpromotion`) REFERENCES `promotion` (`idpromotion`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `jour`
--
ALTER TABLE `jour`
  ADD CONSTRAINT `fk_Jour_Etape1` FOREIGN KEY (`idEtape`) REFERENCES `etape` (`idEtape`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Jour_Hotel1` FOREIGN KEY (`idHotel`) REFERENCES `hotel` (`idHotel`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Jour_Restaurant1` FOREIGN KEY (`idRestaurant`) REFERENCES `restaurant` (`idRestaurant`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `themes`
--
ALTER TABLE `themes`
  ADD CONSTRAINT `fk_Themes_Circuits1` FOREIGN KEY (`idCircuit`) REFERENCES `circuits` (`idCircuit`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD CONSTRAINT `fk_Utilisateur_Connexion1` FOREIGN KEY (`idConnexion`) REFERENCES `connexion` (`idConnexion`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `voyageur`
--
ALTER TABLE `voyageur`
  ADD CONSTRAINT `fk_Voyageur_Categorie1` FOREIGN KEY (`idCategorie`) REFERENCES `categorie` (`idCategorie`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Voyageur_Commande1` FOREIGN KEY (`idCommande`) REFERENCES `commande` (`idCommande`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
