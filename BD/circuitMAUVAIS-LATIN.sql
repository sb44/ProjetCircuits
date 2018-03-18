-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le :  ven. 16 mars 2018 à 15:21
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
CREATE DATABASE Circuit;
USE Circuit;
-- --------------------------------------------------------

--
-- Structure de la table `categorie`
--

CREATE TABLE `categorie` (
  `idCategorie` int(11) NOT NULL,
  `nom` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `categorie`
--

INSERT INTO `categorie` (`idCategorie`, `nom`) VALUES
(1, 'Adulte'),
(2, 'Enfant'),
(3, 'Bébe');

-- --------------------------------------------------------

--
-- Structure de la table `circuit`
--

CREATE TABLE `circuit` (
  `idCircuit` int(11) NOT NULL,
  `nom` varchar(50) DEFAULT NULL,
  `description` longtext CHARACTER SET ucs2 COLLATE ucs2_bin,
  `capacite` int(4) DEFAULT NULL,
  `urlImage` varchar(255) DEFAULT NULL,
  `prix` decimal(10,2) NOT NULL,
  `enVigueur` tinyint(1) DEFAULT NULL,
  `idTheme` int(11) NOT NULL,
  `latitude` decimal(20,10) NOT NULL,
  `longitude` decimal(20,10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `circuit`
--

INSERT INTO `circuit` (`idCircuit`, `nom`, `description`, `capacite`, `urlImage`, `prix`, `enVigueur`, `idTheme`, `latitude`, `longitude`) VALUES
(2, 'Tanzanie&zanzibar', '\r\nJOURS 1 ET 2 - Départ de Montréal\r\nRencontre avec notre accompagnateur de l’équipe Traditours à l’aéroport de Montréal. Assistance aux formalités d’enregistrement et envol à destination de Kilimandjaro. Repas et nuits à bord.\r\n\r\nJOUR 3 - Kilimandjaro / Région d\'Arusha (Tanzanie)\r\nDès notre arrivée à l’aéroport du Kilimandjaro, en Tanzanie, nos guides-chauffeurs nous accueilleront pour nous faire vivre un voyage inoubliable. Transfert vers notre lodge idéalement situé pour passer une nuit de repos. Installation et nuit au lodge.\r\n\r\nJOUR 4 - Région d\'Arusha / Parc national de Tarangire\r\nDéjeuner. À bord nos véhicules 4x4 tout confort, nous prendrons la route vers le parc national de Tarangire pour notre première journée de safari au coeur de la savane africaine ! À notre arrivée, nous ferons une pause café. Dîner pique-nique dans ce parc qui a su conserver toute son authenticité et sa beauté. D’une superficie de 2 850 km², il a été déclaré parc national en 1970 et fait partie de l’immense écosystème de la steppe masaï. Entourant la vallée de la rivière Tarangire, le paysage est principalement constitué de savane arborée. Les baobabs, arbres facilement reconnaissables par la largeur exceptionnelle de leur tronc pouvant aller jusqu’à 30 m, abondent dans la partie nord. Le site abrite une très forte concentration d\'animaux, notamment des éléphants, migrant vers le dernier point d\'eau permanent de la région : la rivière Tarangire. Pour les oiseaux migrateurs venus d\'Europe, le parc constitue également un important lieu d\'hivernage. Route vers notre campement, situé dans l’enceinte même du parc de Tarangire. Arrivée et installation. Depuis les terrasses, nous bénéficerons d’une vue imprenable sur les plaines ainsi que sur les lacs Manyara et Burunge, un paysage à couper le souffle... Souper et nuit au campement.\r\n\r\nJOUR 5 - Parc national de Tarangire\r\nDéjeuner. Journée complète de safari afin de poursuivre la découverte des vastes paysages de ce parc spectaculaire. Avec nos guides-chauffeurs, nous tenterons d’observer les différents habitants de ses plaines vallonnées : éléphants, zèbres, girafes, buffles, impalas, phacochères, dik-diks, élands du Cap, bubales de Coke, lycaons, grands koudous et peut-être quelques grands prédateurs... Dîner pique-nique dans la brousse. Retour au campement en fin d’après-midi pour contempler le coucher de soleil. Souper. Nuit au campement.\r\n\r\nJOUR 6 - Parc national du Lac Manyara / Région de Karatu\r\nDéjeuner. Nous traverserons le Tarangire et continuerons notre safari en direction du parc national du Lac Manyara qui possède une importante biodiversité protégée. Il s’agit d’un sanctuaire majeur pour plus de 400 espèces d’oiseaux différentes, dont d\'imposantes colonies de flamants roses et de cigognes. La diversité des paysages y est incroyable ! Savane arborée, forêt sèche plus clairsemée et prairies abritent, entre autres, les troupeaux de buffles, girafes et éléphants. La forêt tropicale dense est le territoire des singes, dont la concentration est l\'une des plus élevées au monde. Le pays des « vertes collines d’Afrique », plus particulièrement, les falaises de la vallée du Grand Rift et le scintillement des eaux du lac étaient très chers à l\'écrivain Ernest Hemingway dans les années 1930. Pique-nique dans ce cadre magnifique où il n’est pas rare d’observer gnous et zèbres sur les berges et, si nous sommes chanceux, des lions qui passent le plus clair de leur temps dans les arbres. Route vers la région de Karatu. Visite d’un atelier de sculpture sur bois et découverte des créations locales. Arrivée et installation dans notre lodge Souper. Nuit au lodge.\r\nJOUR 7 - Région de Karatu / Lac Eyasi / Région de Karatu\r\nDépart matinal et déjeuner en cours de route vers le Lac Eyasi à la rencontre du premier peuple connu de Tanzanie : les « Hadzabe ». Fiers de leurs traditions, ils restent exclusivement chasseurs-cueilleurs et refusent d’adopter un mode de vie qui n’est pas le leur. De nos jours, cette communauté ne compte que 1 000 individus, dont seuls 300 à 400 d’entre eux vivent encore selon le mode de vie de leurs ancêtres. Ce peuple reste à part, tant du point de vue génétique que du point de vue linguistique, à l’exception des « clics », sons produits avec la langue ou les lèvres. Arrivée au village et accueil. Départ à pied, accompagnés d’un guide conférencier tanzanien, pour en apprendre plus sur les activités qui rythment leur journée : cueillette et chasse de petits mammifères, d’oiseaux, voire de petites antilopes. Refusant de cultiver et d’élever des animaux, ces archers hors pairs vivent au jour le jour et au gré du fruit de leurs activités. Ensuite, nous ferons la rencontre des « Datoga », une tribu d’artisans habiles reconnus pour leur savoir-faire de forgerons. Ils réalisent pointes de flèches et de lances, ainsi que divers outils pour faire du troc avec les autres tribus. Anciens nomades, ils sont aujourd’hui sédentaires et vivent des échanges de leurs armes fabriquées avec de la nourriture. Retour au lodge pour le dîner. Cet après-midi, nous visiterons une école (donations possibles afin de subvenir aux dépenses scolaires des jeunes élèves). Poursuite du safari ou, pour ceux qui le désirent, retour au lodge afin de relaxer. Rendez-vous au soleil couchant pour assister à un spectacle privé de danses et de chants hors du commun avec les « Sangoma ». Souper et nuit au lodge.\r\n\r\nJOUR 8 - Région de Karatu / Cratère du Ngorongoro / Olduvai\r\nDéjeuner. Départ vers le cratère du Ngorongoro pour une journée de safari. Cette caldeira de 20 km de diamètre est la plus grande du monde. Classée patrimoine mondial de l’UNESCO, elle est le refuge d’une faune et d’une flore exceptionnellement riches, comprenant de nombreuses espèces menacées à l’échelle mondiale. Il est aussi le lieu de passage de la migration annuelle des gnous, zèbres, gazelles de Thomson, gazelles de Grant et autres vers les plaines du Nord. Nous explorerons ce paradis animalier sans nul autre pareil en espérant voir les « big five » : buffles, éléphants, léopards, lions et rhinocéros. Dîner pique-nique. Route vers les gorges d’Olduvai pour rejoindre notre campement. Arrivée et installation. En soirée, promenade à pied escorté par des Masaï jusqu’au sommet d’un kopje, colline sur laquelle se dresse d\'imposants rochers, pour admirer les grandes plaines à la lumière du soleil couchant. Aux confins de ces grands espaces, sur le toit du monde, nous sera servi un cocktail accompagné de petites bouchées... Souper et nuit au campement.\r\n\r\nJOUR 9 - Zone de conservation de Ngorongoro\r\nDépart matinal pour un safari au lever du jour. Retour au campement et déjeuner. Journée de safari dans cette réserve protégée constituée du massif du Ngorongoro, de cratères et de plateaux d\'origine volcanique faisant partie de la vallée du Grand Rift. Contrairement aux parcs nationaux, l\'aire de conservation du Ngorongoro permet aux Masaï, éleveurs et guerriers semi-nomades, de rester sur leur terre et de faire perdurer le mode de vie de leurs ancêtres. Sur cette vaste étendue de près de 8 500 km², l’homme vit en harmonie avec la faune avoisinnante, regroupé notamment dans des villages typiques masaï. Le site archéologique et, plus particulièrement, les gorges d’Olduvai, est l\'un des plus importants complexes de sites préhistoriques d\'Afrique de l\'Est considéré comme le « berceau de l\'humanité », avec son musée. Dîner de spécialités africaines dans la région de Ndutu. Poursuite de notre découverte de la région en safari, puis retour au campement. Souper et nuit au campement.\r\n\r\nJOUR 10 - Zone de conservation de Ngorongoro / Parc national de Serengeti\r\nDéjeuner. Visite d’un village masaï traditionnel en cours de route vers le parc national de Serengeti. Aire protégée depuis 1940, il s’agit du plus ancien mais aussi du plus populaire des parcs tanzaniens. Chaque année, au moment de la grande migration, des millions de sabots foulent son sol à la recherche de pâturages et d’eau. Cette « terre aride et étendue », en langue masaï, s’étend sur 14 000 km² et offre une diversité de paysages incomparables. Savane arbustive, plaines immenses à perte de vue, kopjes contrastant aux espaces boisés et aux régions vallonnées, se succèderont. C’est dans ce parc que la concentration de félins est la plus forte. Nous serons les spectateurs de la lutte constante des prédateurs contre leurs proies. Dîner pique-nique au coeur du parc. Après-midi de safari dans le Serengenti. Arrivée et installation dans notre campement mobile installé au coeur du Serengeti. Souper servi dans une ambiance conviviale sous une grande tente. Fin de soirée à la lumière des lampes à pétrole autour du feu de camp. Nuit au campement.\r\n\r\nJOUR 11 - Parc national de Serengeti / Réserve privée de Grumeti\r\nAu lever du jour, possibilité d’effectuer un safari en montgolfière (en option). Déjeuner. Poursuite de notre safari à la découverte du parc national de Serengeti, nous offrant un bel aperçu de ce lieu resté encore intact de nos jours. Dîner barbecue dans la brousse. Route vers notre campement, situé à la lisière du parc, dans la région de Grumeti. En cours de route, nous ferons un arrêt pour observer les hippopotames en pleine baignade. Arrivée et installation. Moment de détente au campement. Depuis la piscine, nous aurons une vue imprenable sur les plaines du Serengeti. Les grands espaces caractéristiques de ses plaines procurent à quiconque un immense sentiment de liberté. Souper et nuit au campement. \r\n\r\nJOUR 12 - Réserve privée de Grumeti\r\nDéjeuner. Départ pour une randonnée pédestre dans la réserve accompagnés de notre guide et d’un ranger. Notre itinéraire sera rythmé de rencontres palpitantes dans cet endroit exceptionnel où la faune est particulièrement variée : zèbres, éléphants, gnous, buffles, etc. Retour au campement. Dîner. En après-midi, temps libre pour profiter des installations de notre campement. Souper. En début de soirée, nous regagnerons notre jeep pour un safari nocturne. Ce sera l’occasion d’apercevoir les félins traquant leur proie ou d’autres animaux qui ne sortent de leur cachette qu’à la nuit tombée... Une aventure unique et rare que seules quelques réserves proposent. Retour et nuit au campement.\r\n\r\nJOUR 13 - Réserve privée de Grumeti / Fort Ikoma / Zanzibar (vol intérieur) / Stone Town (Zanzibar)\r\nDéjeuner. Transfert à l’aérodrome de Fort Ikoma, suité en pleine savane. Envol à destination de l’île d’Unguja sur l’archipel de Zanzibar. Dîner (boîte à lunch). Arrivée et accueil. Transfert à Stone Town, coeur historique de l’île, et installation à notre hôtel. Fin de journée libre afin de profiter de toute l\'effervescence de la ville. Souper en terrasse, au coucher du soleil. Nuit à l’hôtel. \r\n\r\nJOUR 14 - Stone Town / Route des épices / Pingwe\r\nDéjeuner à l’hôtel. Visite guidée de Stone Town, la vieille ville de Zanzibar. Accompagnés de notre guide local, nous découvrirons l’histoire de la ville à travers toutes les richesses qu’elle recèle. Nous verrons, entre autres, l’ancien marché aux esclaves et le monument commémoratif de l\'esclavage, qui a perduré jusqu’en 1873. La Maison des Merveilles, le plus haut bâtiment de Stone Town, le musée retraçant toute l’histoire du Sultanat et de leurs palais, le vieux fort devenu aujourd’hui un lieu paisible et un véritable centre culturel et l’ancien dispensaire, symbole de l\'architecture multiculturelle de la vieille ville. Son marché animé avec ses étals colorés de fruits, de poissons et d’épices ainsi que ses ruelles étroites dans lesquelles dominent des portes remarquables nous charmeront. Dîner au restaurant. Transfert pour rejoindre la côte est de l’île de Zanzibar. En chemin, nous emprunterons la route des épices à l’Ouest de l’île, qui est placée au premier rang mondial en termes d’exportation. L’odorat, le goût, le toucher… La région qui borde la forêt Masingini, la plus agricole de l’île, éveillera tous nos sens! Nous découvrirons les plantations d’arbres fruitiers, les cocoteraies géantes et « les 100 épices » qui ont fait la réputation de Zanzibar : clou de girofle, cardamone, cumin, coriandre, muscade, citronnelle, vanille… Nous apprendrons comment cuisiner certaines de ces épices, mais aussi leurs origines et leurs vertus médicinales. Arrivée et installation dans nos bungalows situés au nord du village de Pingwe pour trois nuits en formule tout inclus. Souper de spécialités africaines. Nuit à l’hôtel.\r\nJOUR 15 - Village de Kae / Pingwe\r\nDéjeuner. Selon la marée, départ de la plage de l’hôtel en gallawas, petits bateaux de pêche en bois, pour une excursion en mer consacrée à la découverte des environs du village de Kae. Navigation dans le lagon et arrivée sur une longue plage de sable blanc entourée de palmiers et d’une mangrove où vivent les oiseaux marins : un décor paradisiaque ! Dîner barbecue sur la plage. Retour à notre hôtel. Souper et nuit à l’hôtel.\r\n\r\nJOUR 16 - Pingwe\r\nDéjeuner et dîner à l\'hôtel. Journée libre afin de profiter des installations de l’hôtel à notre guise. Souper de gala sur la terrasse de sable, aux abords de la piscine. Nuit à l’hôtel. \r\nJOUR 17 - Pingwe / Zanzibar / Montréal\r\nDéjeuner. Matinée libre. Dîner selon l\'horaire du vol. Transfert vers l’aéroport de Zanzibar. Assistance aux formalités d’enregistrement et vol de retour vers Montréal. Repas et nuit à bord.\r\n\r\nJOUR 18 - Arrivée à Montréal', 30, 'urlsafari', '8995', 1, 1, '0', '0');

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
  `idUtilisateur` int(11) NOT NULL,
  `montantDepot` decimal(10,0) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `commande`
--

INSERT INTO `commande` (`idCommande`, `nbInscription`, `datePayment`, `prixTotal`, `idGroupeVoyage`, `idUtilisateur`, `montantDepot`) VALUES
(1, 1, '2018-03-06', '8995', 1, 1, '1500');

-- --------------------------------------------------------

--
-- Structure de la table `connexion`
--

CREATE TABLE `connexion` (
  `idConnexion` int(11) NOT NULL,
  `courriel` varchar(50) DEFAULT NULL,
  `motDePasse` varchar(255) DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `connexion`
--

INSERT INTO `connexion` (`idConnexion`, `courriel`, `motDePasse`, `role`) VALUES
(1, 'admin@admin.com', '$2y$10$ZvL0E9C53pOBcbHOh/mtDuHcxfEukCkcAoFLCa8BnMO/3Ar1DfaHa', 'administrateur'),
(2, 'helloworld@helloworld.com', '$2y$10$w5imMzupEsSAvUkyoMVF/uepmnPvNoKJ4tLfPoQncjbecXn4t9CLC', 'utilisateur');

-- --------------------------------------------------------

--
-- Structure de la table `etape`
--

CREATE TABLE `etape` (
  `idEtape` int(11) NOT NULL,
  `photo` varchar(50) DEFAULT NULL,
  `description` varchar(50) DEFAULT NULL,
  `idCircuit` int(11) NOT NULL,
  `pays` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `etape`
--

INSERT INTO `etape` (`idEtape`, `photo`, `description`, `idCircuit`, `pays`) VALUES
(1, 'urlphoto', 'Départ de Montréal (Canada)', 2, 'Canada'),
(2, 'urlPhoto', 'Decouverte de la Tanzanie', 2, 'Tanzanie'),
(3, 'urlphoto', 'Visite de la Zanzibar', 2, 'Zanzibar');

-- --------------------------------------------------------

--
-- Structure de la table `groupevoyage`
--

CREATE TABLE `groupevoyage` (
  `idGroupeVoyage` int(11) NOT NULL,
  `nbInscrit` int(11) DEFAULT NULL,
  `dateDepart` date DEFAULT NULL,
  `dateRetour` date DEFAULT NULL,
  `idCircuit` int(11) NOT NULL,
  `idpromotion` int(11) NOT NULL,
  `capacite` int(11) DEFAULT NULL,
  `prixAdulte` decimal(6,2) DEFAULT NULL,
  `prixEnfant` decimal(6,2) DEFAULT NULL,
  `prixBebe` decimal(6,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `groupevoyage`
--

INSERT INTO `groupevoyage` (`idGroupeVoyage`, `nbInscrit`, `dateDepart`, `dateRetour`, `idCircuit`, `idpromotion`, `capacite`, `prixAdulte`, `prixEnfant`, `prixBebe`) VALUES
(1, 1, '2018-09-16', '2018-10-03', 2, 1, 40, '8995.00', '0.00', '0.00');

-- --------------------------------------------------------

--
-- Structure de la table `hotel`
--

CREATE TABLE `hotel` (
  `idHotel` int(11) NOT NULL,
  `nom` varchar(50) DEFAULT NULL,
  `urlHotel` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `hotel`
--

INSERT INTO `hotel` (`idHotel`, `nom`, `urlHotel`) VALUES
(1, 'HYATT REGENCY DAR ES SALAAM, THE KILIMANJARO', 'https://daressalaamkilimanjaro.regency.hyatt.com'),
(2, 'kisiwahouse', 'www.kisiwahouse.com'),
(3, 'S/O', 'S/O');

-- --------------------------------------------------------

--
-- Structure de la table `jour`
--

CREATE TABLE `jour` (
  `idJour` int(11) NOT NULL,
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `photo` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `idEtape` int(11) NOT NULL,
  `Activites` longtext,
  `idHotel` int(11) NOT NULL,
  `idRestaurant` int(11) NOT NULL,
  `ville` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `jour`
--

INSERT INTO `jour` (`idJour`, `description`, `photo`, `idEtape`, `Activites`, `idHotel`, `idRestaurant`, `ville`) VALUES
(4, 'JOURS 1 ET 2 - Départ de Montréal', 'urlPhoto', 1, 'Rencontre avec notre accompagnateur de l’équipe Traditours à l’aéroport de Montréal. Assistance aux formalités d’enregistrement et envol à destination de Kilimandjaro. Repas et nuits à bord.', 3, 2, 'Montréal'),
(6, 'JOUR 3 - Kilimandjaro / Région d\'Arusha (Tanzanie)', 'urlPhoto', 2, 'Dès notre arrivée à l’aéroport du Kilimandjaro, en Tanzanie, nos guides-chauffeurs nous accueilleront pour nous faire vivre un voyage inoubliable. Transfert vers notre lodge idéalement situé pour passer une nuit de repos. Installation et nuit au lodge.', 3, 2, 'Arusha'),
(7, 'JOUR 4 - Région d\'Arusha / Parc national de Tarangire', 'urlPhoto', 2, 'Déjeuner. À bord nos véhicules 4x4 tout confort, nous prendrons la route vers le parc national de Tarangire pour notre première journée de safari au coeur de la savane africaine ! À notre arrivée, nous ferons une pause café. Dîner pique-nique dans ce parc qui a su conserver toute son authenticité et sa beauté. D’une superficie de 2 850 km², il a été déclaré parc national en 1970 et fait partie de l’immense écosystème de la steppe masaï. Entourant la vallée de la rivière Tarangire, le paysage est principalement constitué de savane arborée. Les baobabs, arbres facilement reconnaissables par la largeur exceptionnelle de leur tronc pouvant aller jusqu’à 30 m, abondent dans la partie nord. Le site abrite une très forte concentration d\'animaux, notamment des éléphants, migrant vers le dernier point d\'eau permanent de la région : la rivière Tarangire. Pour les oiseaux migrateurs venus d\'Europe, le parc constitue également un important lieu d\'hivernage. Route vers notre campement, situé dans l’enceinte même du parc de Tarangire. Arrivée et installation. Depuis les terrasses, nous bénéficerons d’une vue imprenable sur les plaines ainsi que sur les lacs Manyara et Burunge, un paysage à couper le souffle... Souper et nuit au campement.', 3, 2, 'Arusha'),
(8, 'JOUR 5 - Parc national de Tarangire', 'urlPhoto', 2, 'Déjeuner. Journée complète de safari afin de poursuivre la découverte des vastes paysages de ce parc spectaculaire. Avec nos guides-chauffeurs, nous tenterons d’observer les différents habitants de ses plaines vallonnées : éléphants, zèbres, girafes, buffles, impalas, phacochères, dik-diks, élands du Cap, bubales de Coke, lycaons, grands koudous et peut-être quelques grands prédateurs... Dîner pique-nique dans la brousse. Retour au campement en fin d’après-midi pour contempler le coucher de soleil. Souper. Nuit au campement.', 3, 2, 'Tarangire'),
(9, 'JOUR 6 - Parc national du Lac Manyara / Région de Karatu', 'urlPhoto', 2, 'Déjeuner. Nous traverserons le Tarangire et continuerons notre safari en direction du parc national du Lac Manyara qui possède une importante biodiversité protégée. Il s’agit d’un sanctuaire majeur pour plus de 400 espèces d’oiseaux différentes, dont d\'imposantes colonies de flamants roses et de cigognes. La diversité des paysages y est incroyable ! Savane arborée, forêt sèche plus clairsemée et prairies abritent, entre autres, les troupeaux de buffles, girafes et éléphants. La forêt tropicale dense est le territoire des singes, dont la concentration est l\'une des plus élevées au monde. Le pays des « vertes collines d’Afrique », plus particulièrement, les falaises de la vallée du Grand Rift et le scintillement des eaux du lac étaient très chers à l\'écrivain Ernest Hemingway dans les années 1930. Pique-nique dans ce cadre magnifique où il n’est pas rare d’observer gnous et zèbres sur les berges et, si nous sommes chanceux, des lions qui passent le plus clair de leur temps dans les arbres. Route vers la région de Karatu. Visite d’un atelier de sculpture sur bois et découverte des créations locales. Arrivée et installation dans notre lodge Souper. Nuit au lodge.', 3, 2, ' Karatu'),
(10, 'JOUR 7 - Région de Karatu / Lac Eyasi / Région de Karatu', 'urlPhoto', 2, 'Départ matinal et déjeuner en cours de route vers le Lac Eyasi à la rencontre du premier peuple connu de Tanzanie : les « Hadzabe ». Fiers de leurs traditions, ils restent exclusivement chasseurs-cueilleurs et refusent d’adopter un mode de vie qui n’est pas le leur. De nos jours, cette communauté ne compte que 1 000 individus, dont seuls 300 à 400 d’entre eux vivent encore selon le mode de vie de leurs ancêtres. Ce peuple reste à part, tant du point de vue génétique que du point de vue linguistique, à l’exception des « clics », sons produits avec la langue ou les lèvres. Arrivée au village et accueil. Départ à pied, accompagnés d’un guide conférencier tanzanien, pour en apprendre plus sur les activités qui rythment leur journée : cueillette et chasse de petits mammifères, d’oiseaux, voire de petites antilopes. Refusant de cultiver et d’élever des animaux, ces archers hors pairs vivent au jour le jour et au gré du fruit de leurs activités. Ensuite, nous ferons la rencontre des « Datoga », une tribu d’artisans habiles reconnus pour leur savoir-faire de forgerons. Ils réalisent pointes de flèches et de lances, ainsi que divers outils pour faire du troc avec les autres tribus. Anciens nomades, ils sont aujourd’hui sédentaires et vivent des échanges de leurs armes fabriquées avec de la nourriture. Retour au lodge pour le dîner. Cet après-midi, nous visiterons une école (donations possibles afin de subvenir aux dépenses scolaires des jeunes élèves). Poursuite du safari ou, pour ceux qui le désirent, retour au lodge afin de relaxer. Rendez-vous au soleil couchant pour assister à un spectacle privé de danses et de chants hors du commun avec les « Sangoma ». Souper et nuit au lodge.', 3, 2, 'Karatu'),
(11, 'JOUR 8 - Région de Karatu / Cratère du Ngorongoro / Olduvai', 'urlPhoto', 2, 'Déjeuner. Départ vers le cratère du Ngorongoro pour une journée de safari. Cette caldeira de 20 km de diamètre est la plus grande du monde. Classée patrimoine mondial de l’UNESCO, elle est le refuge d’une faune et d’une flore exceptionnellement riches, comprenant de nombreuses espèces menacées à l’échelle mondiale. Il est aussi le lieu de passage de la migration annuelle des gnous, zèbres, gazelles de Thomson, gazelles de Grant et autres vers les plaines du Nord. Nous explorerons ce paradis animalier sans nul autre pareil en espérant voir les « big five » : buffles, éléphants, léopards, lions et rhinocéros. Dîner pique-nique. Route vers les gorges d’Olduvai pour rejoindre notre campement. Arrivée et installation. En soirée, promenade à pied escorté par des Masaï jusqu’au sommet d’un kopje, colline sur laquelle se dresse d\'imposants rochers, pour admirer les grandes plaines à la lumière du soleil couchant. Aux confins de ces grands espaces, sur le toit du monde, nous sera servi un cocktail accompagné de petites bouchées... Souper et nuit au campement.', 3, 2, 'Olduvai'),
(12, 'JOUR 9 - Zone de conservation de Ngorongoro', 'urlPhoto', 2, 'Départ matinal pour un safari au lever du jour. Retour au campement et déjeuner. Journée de safari dans cette réserve protégée constituée du massif du Ngorongoro, de cratères et de plateaux d\'origine volcanique faisant partie de la vallée du Grand Rift. Contrairement aux parcs nationaux, l\'aire de conservation du Ngorongoro permet aux Masaï, éleveurs et guerriers semi-nomades, de rester sur leur terre et de faire perdurer le mode de vie de leurs ancêtres. Sur cette vaste étendue de près de 8 500 km², l’homme vit en harmonie avec la faune avoisinnante, regroupé notamment dans des villages typiques masaï. Le site archéologique et, plus particulièrement, les gorges d’Olduvai, est l\'un des plus importants complexes de sites préhistoriques d\'Afrique de l\'Est considéré comme le « berceau de l\'humanité », avec son musée. Dîner de spécialités africaines dans la région de Ndutu. Poursuite de notre découverte de la région en safari, puis retour au campement. Souper et nuit au campement.', 3, 2, ' Ngorongoro'),
(14, 'JOUR 10 - Zone de conservation de Ngorongoro / Parc national de Serengeti', 'urlPhoto', 2, 'Déjeuner. Visite d’un village masaï traditionnel en cours de route vers le parc national de Serengeti. Aire protégée depuis 1940, il s’agit du plus ancien mais aussi du plus populaire des parcs tanzaniens. Chaque année, au moment de la grande migration, des millions de sabots foulent son sol à la recherche de pâturages et d’eau. Cette « terre aride et étendue », en langue masaï, s’étend sur 14 000 km² et offre une diversité de paysages incomparables. Savane arbustive, plaines immenses à perte de vue, kopjes contrastant aux espaces boisés et aux régions vallonnées, se succèderont. C’est dans ce parc que la concentration de félins est la plus forte. Nous serons les spectateurs de la lutte constante des prédateurs contre leurs proies. Dîner pique-nique au coeur du parc. Après-midi de safari dans le Serengenti. Arrivée et installation dans notre campement mobile installé au coeur du Serengeti. Souper servi dans une ambiance conviviale sous une grande tente. Fin de soirée à la lumière des lampes à pétrole autour du feu de camp. Nuit au campement.', 3, 2, 'Serengeti'),
(15, 'JOUR 11 - Parc national de Serengeti / Réserve privée de Grumeti', 'urlPhoto', 2, 'Au lever du jour, possibilité d’effectuer un safari en montgolfière (en option). Déjeuner. Poursuite de notre safari à la découverte du parc national de Serengeti, nous offrant un bel aperçu de ce lieu resté encore intact de nos jours. Dîner barbecue dans la brousse. Route vers notre campement, situé à la lisière du parc, dans la région de Grumeti. En cours de route, nous ferons un arrêt pour observer les hippopotames en pleine baignade. Arrivée et installation. Moment de détente au campement. Depuis la piscine, nous aurons une vue imprenable sur les plaines du Serengeti. Les grands espaces caractéristiques de ses plaines procurent à quiconque un immense sentiment de liberté. Souper et nuit au campement. ', 3, 2, ' Grumeti'),
(16, 'JOUR 12 - Réserve privée de Grumeti', 'urlPhoto', 2, 'Déjeuner. Départ pour une randonnée pédestre dans la réserve accompagnés de notre guide et d’un ranger. Notre itinéraire sera rythmé de rencontres palpitantes dans cet endroit exceptionnel où la faune est particulièrement variée : zèbres, éléphants, gnous, buffles, etc. Retour au campement. Dîner. En après-midi, temps libre pour profiter des installations de notre campement. Souper. En début de soirée, nous regagnerons notre jeep pour un safari nocturne. Ce sera l’occasion d’apercevoir les félins traquant leur proie ou d’autres animaux qui ne sortent de leur cachette qu’à la nuit tombée... Une aventure unique et rare que seules quelques réserves proposent. Retour et nuit au campement.', 3, 2, 'Grumeti'),
(17, 'JOUR 13 - Réserve privée de Grumeti / Fort Ikoma / Zanzibar (vol intérieur) / Stone Town (Zanzibar)', 'urlPhoto', 2, 'Déjeuner à l’hôtel. Visite guidée de Stone Town, la vieille ville de Zanzibar. Accompagnés de notre guide local, nous découvrirons l’histoire de la ville à travers toutes les richesses qu’elle recèle. Nous verrons, entre autres, l’ancien marché aux esclaves et le monument commémoratif de l\'esclavage, qui a perduré jusqu’en 1873. La Maison des Merveilles, le plus haut bâtiment de Stone Town, le musée retraçant toute l’histoire du Sultanat et de leurs palais, le vieux fort devenu aujourd’hui un lieu paisible et un véritable centre culturel et l’ancien dispensaire, symbole de l\'architecture multiculturelle de la vieille ville. Son marché animé avec ses étals colorés de fruits, de poissons et d’épices ainsi que ses ruelles étroites dans lesquelles dominent des portes remarquables nous charmeront. Dîner au restaurant. Transfert pour rejoindre la côte est de l’île de Zanzibar. En chemin, nous emprunterons la route des épices à l’Ouest de l’île, qui est placée au premier rang mondial en termes d’exportation. L’odorat, le goût, le toucher… La région qui borde la forêt Masingini, la plus agricole de l’île, éveillera tous nos sens! Nous découvrirons les plantations d’arbres fruitiers, les cocoteraies géantes et « les 100 épices » qui ont fait la réputation de Zanzibar : clou de girofle, cardamone, cumin, coriandre, muscade, citronnelle, vanille… Nous apprendrons comment cuisiner certaines de ces épices, mais aussi leurs origines et leurs vertus médicinales. Arrivée et installation dans nos bungalows situés au nord du village de Pingwe pour trois nuits en formule tout inclus. Souper de spécialités africaines. Nuit à l’hôtel.', 3, 2, 'Pingwe'),
(18, 'JOUR 15 - Village de Kae / Pingwe', 'urlPhoto', 2, 'Déjeuner. Selon la marée, départ de la plage de l’hôtel en gallawas, petits bateaux de pêche en bois, pour une excursion en mer consacrée à la découverte des environs du village de Kae. Navigation dans le lagon et arrivée sur une longue plage de sable blanc entourée de palmiers et d’une mangrove où vivent les oiseaux marins : un décor paradisiaque ! Dîner barbecue sur la plage. Retour à notre hôtel. Souper et nuit à l’hôtel.', 2, 1, ' Pingwe'),
(19, 'JOUR 16 - Pingwe', 'urlPhoto', 2, 'Déjeuner et dîner à l\'hôtel. Journée libre afin de profiter des installations de l’hôtel à notre guise. Souper de gala sur la terrasse de sable, aux abords de la piscine. Nuit à l’hôtel. ', 1, 1, 'Pingwe'),
(20, 'JOUR 17 - Pingwe / Zanzibar / Montréal', 'urlPhoto', 3, 'Déjeuner. Matinée libre. Dîner selon l\'horaire du vol. Transfert vers l’aéroport de Zanzibar. Assistance aux formalités d’enregistrement et vol de retour vers Montréal. Repas et nuit à bord.', 3, 2, 'Montréal'),
(21, 'JOUR 18 - Arrivée à Montréal', 'urlPhoto', 3, NULL, 3, 2, 'Montréal');

-- --------------------------------------------------------

--
-- Structure de la table `promotion`
--

CREATE TABLE `promotion` (
  `idpromotion` int(11) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `rabaisAdulte` decimal(6,2) DEFAULT NULL,
  `rabaisEnfant` decimal(6,2) DEFAULT NULL,
  `rabaisBebe` decimal(6,2) DEFAULT NULL,
  `statut` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `promotion`
--

INSERT INTO `promotion` (`idpromotion`, `description`, `rabaisAdulte`, `rabaisEnfant`, `rabaisBebe`, `statut`) VALUES
(1, 'enfants et bébés logés et nourris gratuitement', '0.00', '0.01', '0.01', 1);

-- --------------------------------------------------------

--
-- Structure de la table `restaurant`
--

CREATE TABLE `restaurant` (
  `idRestaurant` int(11) NOT NULL,
  `nom` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `urlRestaurant` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `restaurant`
--

INSERT INTO `restaurant` (`idRestaurant`, `nom`, `urlRestaurant`) VALUES
(1, 'The Rock Restaurant Zanzibar', 'http://book.therockrestaurantzanzibar.com/'),
(2, 'S/O', 'S/O');

-- --------------------------------------------------------

--
-- Structure de la table `sexe`
--

CREATE TABLE `sexe` (
  `idSexe` int(11) NOT NULL,
  `nom` varchar(11) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `sexe`
--

INSERT INTO `sexe` (`idSexe`, `nom`) VALUES
(1, 'Masculin'),
(2, 'Feminin');

-- --------------------------------------------------------

--
-- Structure de la table `theme`
--

CREATE TABLE `theme` (
  `idTheme` int(11) NOT NULL,
  `nom` varchar(50) DEFAULT NULL,
  `iconUrl` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `theme`
--

INSERT INTO `theme` (`idTheme`, `nom`, `iconUrl`) VALUES
(1, 'Safari', 'url'),
(2, 'Yoga&Méditation', 'url');

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `idUtilisateur` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `dateNaissance` date NOT NULL,
  `idConnexion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`idUtilisateur`, `nom`, `prenom`, `dateNaissance`, `idConnexion`) VALUES
(1, 'Kouaya', 'Carles', '1910-02-21', 2),
(2, 'Bouchard', 'Adrien', '1970-12-21', 1);

-- --------------------------------------------------------

--
-- Structure de la table `voyageur`
--

CREATE TABLE `voyageur` (
  `idVoyageur` int(11) NOT NULL,
  `courriel` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `nom` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `prenom` varchar(50) CHARACTER SET latin1 DEFAULT NULL,
  `idCategorie` int(11) NOT NULL,
  `idSexe` int(11) NOT NULL,
  `dateNaissance` date DEFAULT NULL,
  `noPasseport` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `dateExpirationPasseport` date DEFAULT NULL,
  `idCommande` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `categorie`
--
ALTER TABLE `categorie`
  ADD PRIMARY KEY (`idCategorie`);

--
-- Index pour la table `circuit`
--
ALTER TABLE `circuit`
  ADD PRIMARY KEY (`idCircuit`),
  ADD UNIQUE KEY `Nom_UNIQUE` (`nom`),
  ADD KEY `fk_Circuits_Themes1_idx` (`idTheme`);

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
  ADD KEY `fk_Etape_Circuits1_idx` (`idCircuit`);

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
  ADD UNIQUE KEY `Nom_UNIQUE` (`nom`);

--
-- Index pour la table `sexe`
--
ALTER TABLE `sexe`
  ADD PRIMARY KEY (`idSexe`);

--
-- Index pour la table `theme`
--
ALTER TABLE `theme`
  ADD PRIMARY KEY (`idTheme`);

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
  ADD KEY `fk_Voyageur_Commande1_idx` (`idCommande`),
  ADD KEY `idSexe` (`idSexe`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `categorie`
--
ALTER TABLE `categorie`
  MODIFY `idCategorie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `circuit`
--
ALTER TABLE `circuit`
  MODIFY `idCircuit` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `commande`
--
ALTER TABLE `commande`
  MODIFY `idCommande` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `connexion`
--
ALTER TABLE `connexion`
  MODIFY `idConnexion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `etape`
--
ALTER TABLE `etape`
  MODIFY `idEtape` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `groupevoyage`
--
ALTER TABLE `groupevoyage`
  MODIFY `idGroupeVoyage` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `hotel`
--
ALTER TABLE `hotel`
  MODIFY `idHotel` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `jour`
--
ALTER TABLE `jour`
  MODIFY `idJour` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT pour la table `promotion`
--
ALTER TABLE `promotion`
  MODIFY `idpromotion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `restaurant`
--
ALTER TABLE `restaurant`
  MODIFY `idRestaurant` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `sexe`
--
ALTER TABLE `sexe`
  MODIFY `idSexe` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `theme`
--
ALTER TABLE `theme`
  MODIFY `idTheme` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  MODIFY `idUtilisateur` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `voyageur`
--
ALTER TABLE `voyageur`
  MODIFY `idVoyageur` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `circuit`
--
ALTER TABLE `circuit`
  ADD CONSTRAINT `fk_Circuits_Themes1` FOREIGN KEY (`idTheme`) REFERENCES `theme` (`idTheme`) ON DELETE NO ACTION ON UPDATE NO ACTION;

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
  ADD CONSTRAINT `fk_Etape_Circuits1` FOREIGN KEY (`idCircuit`) REFERENCES `circuit` (`idCircuit`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `groupevoyage`
--
ALTER TABLE `groupevoyage`
  ADD CONSTRAINT `fk_GroupeVoyage_Circuits1` FOREIGN KEY (`idCircuit`) REFERENCES `circuit` (`idCircuit`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_GroupeVoyage_promotion1` FOREIGN KEY (`idpromotion`) REFERENCES `promotion` (`idpromotion`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `jour`
--
ALTER TABLE `jour`
  ADD CONSTRAINT `fk_Jour_Etape1` FOREIGN KEY (`idEtape`) REFERENCES `etape` (`idEtape`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Jour_Hotel1` FOREIGN KEY (`idHotel`) REFERENCES `hotel` (`idHotel`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Jour_Restaurant1` FOREIGN KEY (`idRestaurant`) REFERENCES `restaurant` (`idRestaurant`) ON DELETE NO ACTION ON UPDATE NO ACTION;

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
  ADD CONSTRAINT `fk_Voyageur_Commande1` FOREIGN KEY (`idCommande`) REFERENCES `commande` (`idCommande`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `voyageur_ibfk_1` FOREIGN KEY (`idSexe`) REFERENCES `sexe` (`idSexe`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
