-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 28, 2018 at 09:36 PM
-- Server version: 10.1.30-MariaDB
-- PHP Version: 7.2.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `circuit`
--
CREATE DATABASE IF NOT EXISTS `id5166593_circuitvoyage` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `id5166593_circuitvoyage`;
-- --------------------------------------------------------

--
-- Table structure for table `categorie`
--

CREATE TABLE `categorie` (
  `idCategorie` int(11) NOT NULL,
  `nom` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `categorie`
--

INSERT INTO `categorie` (`idCategorie`, `nom`) VALUES
(1, 'Adulte'),
(2, 'Enfant'),
(3, 'Bébe');

-- --------------------------------------------------------

--
-- Table structure for table `circuit`
--

CREATE TABLE `circuit` (
  `idCircuit` int(11) NOT NULL,
  `nom` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` longtext COLLATE utf8_unicode_ci,
  `capacite` int(4) DEFAULT NULL,
  `urlImage` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `prix` decimal(10,2) NOT NULL,
  `enVigueur` tinyint(1) DEFAULT NULL,
  `idTheme` int(11) NOT NULL,
  `latitude` decimal(20,10) NOT NULL,
  `longitude` decimal(20,10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `circuit`
--

INSERT INTO `circuit` (`idCircuit`, `nom`, `description`, `capacite`, `urlImage`, `prix`, `enVigueur`, `idTheme`, `latitude`, `longitude`) VALUES
(2, 'Voyage organisé en Tanzanie & Zanzibar', 'En Afrique, la Tanzanie et l’île de Zanzibar concrétiseront votre rêve de safaris au milieu d’animaux aussi beaux qu’exotiques et de rencontres avec des tribus masaï attachées à des traditions ancestrales. C’est en jeep que vous parcourrez ce pays inédit et en campements de luxe que vous y séjournerez, entre autres. Finalement, vous serez charmé par tous les attraits qu’offre Zanzibar. Une évasion à vous offrir une fois dans votre vie! Voici cinq incontournables de cette destination.', 30, 'tanzaniemain.jpg', '8995.00', 1, 1, '-3.3869250000', '36.6829950000'),
(3, 'Voyage organisé à New York', 'Escapade à Manhattan. Ouest américain: L’Ouest américain, que l’on connait aussi sous le nom de Far West, est depuis toujours symbolisé par des déserts rouges et ocre s’étendant à perte de vue, ainsi que des montagnes sculptées par l’érosion. La conquête de l’Ouest transforma grandement les [...]\r\n\r\nWashington: Voyages Traditours vous invite à une escapade dans la capitale fédérale des États-Unis d’Amérique : Washington D.C. Voici une occasion unique de découvrir de grandes institutions américaines, de [...]', 30, 'newyorkmain.jpg', '4000.00', 1, 4, '38.9072140000', '-77.0368720000'),
(4, 'Voyage organisé à Washington', 'Une ville riche en histoire. Ouest américain: L’Ouest américain, que l’on connait aussi sous le nom de Far West, est depuis toujours symbolisé par des déserts rouges et ocre s’étendant à perte de vue, ainsi que des montagnes sculptées par l’érosion. La conquête de l’Ouest transforma grandement les [...]\r\n\r\nWashington: Voyages Traditours vous invite à une escapade dans la capitale fédérale des États-Unis d’Amérique : Washington D.C. Voici une occasion unique de découvrir de grandes institutions américaines, de [...]', 30, 'washingtonmain.jpg', '5000.00', 1, 4, '36.1146470000', '-115.1728130000'),
(5, 'Voyage organisé en Inde du Nord', 'La plupart d’entre nous ont entendu parler de l’Inde grâce à Mahatma Gandhi, Mère Térésa, l’hindouisme, le Taj Mahal ou encore les vaches que l’on retrouve partout et que personne ne touche, car elles sont sacrées… Mais l’Inde, c’est d’abord et avant tout l’une des plus vieilles civilisations de la terre, avec une population totalisant aujourd’hui près de 1,2 milliard d’habitants! L’Inde, c’est aussi un désert, des palais de maharajas, des temples hindous, une cuisine délicieuse et épicée, et bien plus. C’est la destination par excellence pour une expérience riche en contrastes et en émotions [...]', 30, 'indedunordmain.jpg', '9500.00', 1, 2, '20.5936840000', '78.9628800000'),
(6, 'Voyage Randonnée en Espagne Atlantique', 'Pour bien des voyageurs, l’Espagne, c’est entre autres les musées, les cathédrales, les fiestas, les paëllas, les vignobles et la Méditerranée. Mais l’Espagne, c’est aussi un ancien empire colonial doté d’une incroyable richesse culturelle que l’on a pu découvrir à travers des artistes tels que Picasso, Dali, Velázquez et Goya.', 50, 'espagneatlmain.jpg', '12500.00', 1, 3, '40.4167750000', '-3.7037900000'),
(7, 'Le circuit du Nunavut', '<p>Profitez du circuit nunavut&nbsp;Profitez du circuit nunavut&nbsp;Profitez du circuit nunavut&nbsp;Profitez du circuit nunavut&nbsp;Profitez du circuit nunavut&nbsp;Profitez du circuit nunavut&nbsp;Profitez du circuit nunavut&nbsp;</p>\r\n', 45, 'e1851becd2e62442f5817064012b2d89f9dbf97d.jpg', '4500.00', 1, 4, '62.0000000000', '-97.0000000000');

-- --------------------------------------------------------

--
-- Table structure for table `commande`
--

CREATE TABLE `commande` (
  `idCommande` int(11) NOT NULL,
  `nbInscription` int(11) DEFAULT NULL,
  `datePayment` date DEFAULT NULL,
  `prixTotal` decimal(10,0) DEFAULT NULL,
  `idGroupeVoyage` int(11) NOT NULL,
  `idUtilisateur` int(11) NOT NULL,
  `montantDepot` decimal(10,0) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `commande`
--

INSERT INTO `commande` (`idCommande`, `nbInscription`, `datePayment`, `prixTotal`, `idGroupeVoyage`, `idUtilisateur`, `montantDepot`) VALUES
(1, 1, '2018-03-06', '8995', 1, 1, '1500');

-- --------------------------------------------------------

--
-- Table structure for table `connexion`
--

CREATE TABLE `connexion` (
  `idConnexion` int(11) NOT NULL,
  `courriel` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `motDePasse` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `role` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `connexion`
--

INSERT INTO `connexion` (`idConnexion`, `courriel`, `motDePasse`, `role`) VALUES
(5, 'admin@admin.com', '$2y$10$XQPeGUJ/CH0BxIKfemU/zOodpxMFCPHMd44XL8qMhJdW.dcGNpnKi', 'admin'),
(6, 'u@u.com', '$2y$10$FvC5KK3d8qhXkDNYbJYEyewFfRRXy.NtqFWtZr70BOqFT8Tv6V.rG', 'utilisateur'),
(7, 'arash@arash.com', '$2y$10$S72hTaYkDHWkH3F07r.T.OI73H114thVVPkT4P4wJAbQ.i94CaFRy', 'utilisateur');

-- --------------------------------------------------------

--
-- Table structure for table `etape`
--

CREATE TABLE `etape` (
  `idEtape` int(11) NOT NULL,
  `photo` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `idCircuit` int(11) NOT NULL,
  `pays` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `etape`
--

INSERT INTO `etape` (`idEtape`, `photo`, `description`, `idCircuit`, `pays`) VALUES
(1, NULL, 'Départ de Montréal (Canada)', 2, 'Canada'),
(2, NULL, 'Decouverte de la Tanzanie', 2, 'Tanzanie'),
(3, NULL, 'Visite de la Zanzibar', 2, 'Zanzibar'),
(4, NULL, 'Le tout rapidement', 3, 'États-Unis'),
(5, NULL, 'Le tout rapidement', 4, 'États-Unis'),
(6, NULL, 'Départ de Montréal (Canada)', 5, 'Canada'),
(7, NULL, 'Decouverte de l\'Inde du Nord', 5, 'Inde du Nord'),
(8, NULL, 'Départ de Montréal (Canada)', 6, 'Canada'),
(9, NULL, 'Découverte de l\'Espagne', 6, 'Espagne'),
(10, '71a17f45a9116422f46ef1ae8373450b29ad7e69.jpg', '', 7, 'États-Unis'),
(11, '71a17f45a9116422f46ef1ae8373450b29ad7e69.jpg', '<p>Le grand retour!!!</p>\r\n', 7, 'Canada');

-- --------------------------------------------------------

--
-- Table structure for table `groupevoyage`
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `groupevoyage`
--

INSERT INTO `groupevoyage` (`idGroupeVoyage`, `nbInscrit`, `dateDepart`, `dateRetour`, `idCircuit`, `idpromotion`, `capacite`, `prixAdulte`, `prixEnfant`, `prixBebe`) VALUES
(1, 1, '2018-09-16', '2018-10-03', 2, 1, 40, '8995.00', '0.00', '0.00'),
(2, 0, '2018-03-05', '2018-03-21', 2, 1, 66, '7500.00', '7500.00', '7500.00'),
(3, 0, '2018-03-31', '2018-04-03', 7, 1, 45, '4500.00', '4500.00', '4500.00');

-- --------------------------------------------------------

--
-- Table structure for table `hotel`
--

CREATE TABLE `hotel` (
  `idHotel` int(11) NOT NULL,
  `nom` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `urlHotel` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `hotel`
--

INSERT INTO `hotel` (`idHotel`, `nom`, `urlHotel`) VALUES
(1, 'HYATT REGENCY DAR ES SALAAM, THE KILIMANJARO', 'https://daressalaamkilimanjaro.regency.hyatt.com'),
(2, 'kisiwahouse', 'www.kisiwahouse.com'),
(3, 'S/O', 'S/O'),
(4, 'Hilton Hotels & Resorts', 'http://www3.hilton.com/en/index.html'),
(5, 'Hyatt', 'https://www.hyatt.com/'),
(6, 'URBAN', 'http://www.hotelurban.com/');

-- --------------------------------------------------------

--
-- Table structure for table `jour`
--

CREATE TABLE `jour` (
  `idJour` int(11) NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `photo` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `idEtape` int(11) NOT NULL,
  `Activites` longtext COLLATE utf8_unicode_ci,
  `idHotel` int(11) NOT NULL,
  `idRestaurant` int(11) NOT NULL,
  `ville` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `jour`
--

INSERT INTO `jour` (`idJour`, `description`, `photo`, `idEtape`, `Activites`, `idHotel`, `idRestaurant`, `ville`) VALUES
(1, 'Départ de Montréal', NULL, 1, 'Rencontre avec notre accompagnateur de l’équipe Traditours à l’aéroport de Montréal. Assistance aux formalités d’enregistrement et envol à destination de Kilimandjaro. Repas et nuits à bord.', 3, 2, 'Montréal'),
(2, 'Kilimandjaro / Région d\'Arusha (Tanzanie)', NULL, 2, 'Dès notre arrivée à l’aéroport du Kilimandjaro, en Tanzanie, nos guides-chauffeurs nous accueilleront pour nous faire vivre un voyage inoubliable. Transfert vers notre lodge idéalement situé pour passer une nuit de repos. Installation et nuit au lodge.', 3, 2, 'Arusha'),
(3, 'Région d\'Arusha / Parc national de Tarangire', 'tanzaniejour4.jpg', 2, 'Déjeuner. À bord nos véhicules 4x4 tout confort, nous prendrons la route vers le parc national de Tarangire pour notre première journée de safari au coeur de la savane africaine ! À notre arrivée, nous ferons une pause café. Dîner pique-nique dans ce parc qui a su conserver toute son authenticité et sa beauté. D’une superficie de 2 850 km², il a été déclaré parc national en 1970 et fait partie de l’immense écosystème de la steppe masaï. Entourant la vallée de la rivière Tarangire, le paysage est principalement constitué de savane arborée. Les baobabs, arbres facilement reconnaissables par la largeur exceptionnelle de leur tronc pouvant aller jusqu’à 30 m, abondent dans la partie nord. Le site abrite une très forte concentration d\'animaux, notamment des éléphants, migrant vers le dernier point d\'eau permanent de la région : la rivière Tarangire. Pour les oiseaux migrateurs venus d\'Europe, le parc constitue également un important lieu d\'hivernage. Route vers notre campement, situé dans l’enceinte même du parc de Tarangire. Arrivée et installation. Depuis les terrasses, nous bénéficerons d’une vue imprenable sur les plaines ainsi que sur les lacs Manyara et Burunge, un paysage à couper le souffle... Souper et nuit au campement.', 3, 2, 'Arusha'),
(4, 'Parc national de Tarangire', 'tanzaniejour5.jpg', 2, 'Déjeuner. Journée complète de safari afin de poursuivre la découverte des vastes paysages de ce parc spectaculaire. Avec nos guides-chauffeurs, nous tenterons d’observer les différents habitants de ses plaines vallonnées : éléphants, zèbres, girafes, buffles, impalas, phacochères, dik-diks, élands du Cap, bubales de Coke, lycaons, grands koudous et peut-être quelques grands prédateurs... Dîner pique-nique dans la brousse. Retour au campement en fin d’après-midi pour contempler le coucher de soleil. Souper. Nuit au campement.', 3, 2, 'Tarangire'),
(5, 'Parc national du Lac Manyara / Région de Karatu', 'tanzaniejour6.jpg', 2, 'Déjeuner. Nous traverserons le Tarangire et continuerons notre safari en direction du parc national du Lac Manyara qui possède une importante biodiversité protégée. Il s’agit d’un sanctuaire majeur pour plus de 400 espèces d’oiseaux différentes, dont d\'imposantes colonies de flamants roses et de cigognes. La diversité des paysages y est incroyable ! Savane arborée, forêt sèche plus clairsemée et prairies abritent, entre autres, les troupeaux de buffles, girafes et éléphants. La forêt tropicale dense est le territoire des singes, dont la concentration est l\'une des plus élevées au monde. Le pays des « vertes collines d’Afrique », plus particulièrement, les falaises de la vallée du Grand Rift et le scintillement des eaux du lac étaient très chers à l\'écrivain Ernest Hemingway dans les années 1930. Pique-nique dans ce cadre magnifique où il n’est pas rare d’observer gnous et zèbres sur les berges et, si nous sommes chanceux, des lions qui passent le plus clair de leur temps dans les arbres. Route vers la région de Karatu. Visite d’un atelier de sculpture sur bois et découverte des créations locales. Arrivée et installation dans notre lodge Souper. Nuit au lodge.', 3, 2, ' Karatu'),
(6, 'Région de Karatu / Lac Eyasi / Région de Karatu', 'tanzaniejour7.jpg', 2, 'Départ matinal et déjeuner en cours de route vers le Lac Eyasi à la rencontre du premier peuple connu de Tanzanie : les « Hadzabe ». Fiers de leurs traditions, ils restent exclusivement chasseurs-cueilleurs et refusent d’adopter un mode de vie qui n’est pas le leur. De nos jours, cette communauté ne compte que 1 000 individus, dont seuls 300 à 400 d’entre eux vivent encore selon le mode de vie de leurs ancêtres. Ce peuple reste à part, tant du point de vue génétique que du point de vue linguistique, à l’exception des « clics », sons produits avec la langue ou les lèvres. Arrivée au village et accueil. Départ à pied, accompagnés d’un guide conférencier tanzanien, pour en apprendre plus sur les activités qui rythment leur journée : cueillette et chasse de petits mammifères, d’oiseaux, voire de petites antilopes. Refusant de cultiver et d’élever des animaux, ces archers hors pairs vivent au jour le jour et au gré du fruit de leurs activités. Ensuite, nous ferons la rencontre des « Datoga », une tribu d’artisans habiles reconnus pour leur savoir-faire de forgerons. Ils réalisent pointes de flèches et de lances, ainsi que divers outils pour faire du troc avec les autres tribus. Anciens nomades, ils sont aujourd’hui sédentaires et vivent des échanges de leurs armes fabriquées avec de la nourriture. Retour au lodge pour le dîner. Cet après-midi, nous visiterons une école (donations possibles afin de subvenir aux dépenses scolaires des jeunes élèves). Poursuite du safari ou, pour ceux qui le désirent, retour au lodge afin de relaxer. Rendez-vous au soleil couchant pour assister à un spectacle privé de danses et de chants hors du commun avec les « Sangoma ». Souper et nuit au lodge.', 3, 2, 'Karatu'),
(7, 'Région de Karatu / Cratère du Ngorongoro / Olduvai', 'tanzaniejour8.jpg', 2, 'Déjeuner. Départ vers le cratère du Ngorongoro pour une journée de safari. Cette caldeira de 20 km de diamètre est la plus grande du monde. Classée patrimoine mondial de l’UNESCO, elle est le refuge d’une faune et d’une flore exceptionnellement riches, comprenant de nombreuses espèces menacées à l’échelle mondiale. Il est aussi le lieu de passage de la migration annuelle des gnous, zèbres, gazelles de Thomson, gazelles de Grant et autres vers les plaines du Nord. Nous explorerons ce paradis animalier sans nul autre pareil en espérant voir les « big five » : buffles, éléphants, léopards, lions et rhinocéros. Dîner pique-nique. Route vers les gorges d’Olduvai pour rejoindre notre campement. Arrivée et installation. En soirée, promenade à pied escorté par des Masaï jusqu’au sommet d’un kopje, colline sur laquelle se dresse d\'imposants rochers, pour admirer les grandes plaines à la lumière du soleil couchant. Aux confins de ces grands espaces, sur le toit du monde, nous sera servi un cocktail accompagné de petites bouchées... Souper et nuit au campement.', 3, 2, 'Olduvai'),
(8, 'Zone de conservation de Ngorongoro', 'tanzaniejour9.jpg', 2, 'Départ matinal pour un safari au lever du jour. Retour au campement et déjeuner. Journée de safari dans cette réserve protégée constituée du massif du Ngorongoro, de cratères et de plateaux d\'origine volcanique faisant partie de la vallée du Grand Rift. Contrairement aux parcs nationaux, l\'aire de conservation du Ngorongoro permet aux Masaï, éleveurs et guerriers semi-nomades, de rester sur leur terre et de faire perdurer le mode de vie de leurs ancêtres. Sur cette vaste étendue de près de 8 500 km², l’homme vit en harmonie avec la faune avoisinnante, regroupé notamment dans des villages typiques masaï. Le site archéologique et, plus particulièrement, les gorges d’Olduvai, est l\'un des plus importants complexes de sites préhistoriques d\'Afrique de l\'Est considéré comme le « berceau de l\'humanité », avec son musée. Dîner de spécialités africaines dans la région de Ndutu. Poursuite de notre découverte de la région en safari, puis retour au campement. Souper et nuit au campement.', 3, 2, ' Ngorongoro'),
(9, 'Zone de conservation de Ngorongoro / Parc national de Serengeti', 'tanzaniejour10.jpg', 2, 'Déjeuner. Visite d’un village masaï traditionnel en cours de route vers le parc national de Serengeti. Aire protégée depuis 1940, il s’agit du plus ancien mais aussi du plus populaire des parcs tanzaniens. Chaque année, au moment de la grande migration, des millions de sabots foulent son sol à la recherche de pâturages et d’eau. Cette « terre aride et étendue », en langue masaï, s’étend sur 14 000 km² et offre une diversité de paysages incomparables. Savane arbustive, plaines immenses à perte de vue, kopjes contrastant aux espaces boisés et aux régions vallonnées, se succèderont. C’est dans ce parc que la concentration de félins est la plus forte. Nous serons les spectateurs de la lutte constante des prédateurs contre leurs proies. Dîner pique-nique au coeur du parc. Après-midi de safari dans le Serengenti. Arrivée et installation dans notre campement mobile installé au coeur du Serengeti. Souper servi dans une ambiance conviviale sous une grande tente. Fin de soirée à la lumière des lampes à pétrole autour du feu de camp. Nuit au campement.', 3, 2, 'Serengeti'),
(10, 'Parc national de Serengeti / Réserve privée de Grumeti', 'tanzaniejour11.jpg', 2, 'Au lever du jour, possibilité d’effectuer un safari en montgolfière (en option). Déjeuner. Poursuite de notre safari à la découverte du parc national de Serengeti, nous offrant un bel aperçu de ce lieu resté encore intact de nos jours. Dîner barbecue dans la brousse. Route vers notre campement, situé à la lisière du parc, dans la région de Grumeti. En cours de route, nous ferons un arrêt pour observer les hippopotames en pleine baignade. Arrivée et installation. Moment de détente au campement. Depuis la piscine, nous aurons une vue imprenable sur les plaines du Serengeti. Les grands espaces caractéristiques de ses plaines procurent à quiconque un immense sentiment de liberté. Souper et nuit au campement. ', 3, 2, ' Grumeti'),
(11, 'Réserve privée de Grumeti', 'tanzaniejour12.jpg', 2, 'Déjeuner. Départ pour une randonnée pédestre dans la réserve accompagnés de notre guide et d’un ranger. Notre itinéraire sera rythmé de rencontres palpitantes dans cet endroit exceptionnel où la faune est particulièrement variée : zèbres, éléphants, gnous, buffles, etc. Retour au campement. Dîner. En après-midi, temps libre pour profiter des installations de notre campement. Souper. En début de soirée, nous regagnerons notre jeep pour un safari nocturne. Ce sera l’occasion d’apercevoir les félins traquant leur proie ou d’autres animaux qui ne sortent de leur cachette qu’à la nuit tombée... Une aventure unique et rare que seules quelques réserves proposent. Retour et nuit au campement.', 3, 2, 'Grumeti'),
(12, 'Réserve privée de Grumeti / Fort Ikoma / Zanzibar (vol intérieur) / Stone Town (Zanzibar)', NULL, 2, 'Déjeuner à l’hôtel. Visite guidée de Stone Town, la vieille ville de Zanzibar. Accompagnés de notre guide local, nous découvrirons l’histoire de la ville à travers toutes les richesses qu’elle recèle. Nous verrons, entre autres, l’ancien marché aux esclaves et le monument commémoratif de l\'esclavage, qui a perduré jusqu’en 1873. La Maison des Merveilles, le plus haut bâtiment de Stone Town, le musée retraçant toute l’histoire du Sultanat et de leurs palais, le vieux fort devenu aujourd’hui un lieu paisible et un véritable centre culturel et l’ancien dispensaire, symbole de l\'architecture multiculturelle de la vieille ville. Son marché animé avec ses étals colorés de fruits, de poissons et d’épices ainsi que ses ruelles étroites dans lesquelles dominent des portes remarquables nous charmeront. Dîner au restaurant. Transfert pour rejoindre la côte est de l’île de Zanzibar. En chemin, nous emprunterons la route des épices à l’Ouest de l’île, qui est placée au premier rang mondial en termes d’exportation. L’odorat, le goût, le toucher… La région qui borde la forêt Masingini, la plus agricole de l’île, éveillera tous nos sens! Nous découvrirons les plantations d’arbres fruitiers, les cocoteraies géantes et « les 100 épices » qui ont fait la réputation de Zanzibar : clou de girofle, cardamone, cumin, coriandre, muscade, citronnelle, vanille… Nous apprendrons comment cuisiner certaines de ces épices, mais aussi leurs origines et leurs vertus médicinales. Arrivée et installation dans nos bungalows situés au nord du village de Pingwe pour trois nuits en formule tout inclus. Souper de spécialités africaines. Nuit à l’hôtel.', 3, 2, 'Pingwe'),
(13, 'Village de Kae / Pingwe', 'tanzaniejour15.jpg', 2, 'Déjeuner. Selon la marée, départ de la plage de l’hôtel en gallawas, petits bateaux de pêche en bois, pour une excursion en mer consacrée à la découverte des environs du village de Kae. Navigation dans le lagon et arrivée sur une longue plage de sable blanc entourée de palmiers et d’une mangrove où vivent les oiseaux marins : un décor paradisiaque ! Dîner barbecue sur la plage. Retour à notre hôtel. Souper et nuit à l’hôtel.', 2, 1, ' Pingwe'),
(14, 'Pingwe', NULL, 2, 'Déjeuner et dîner à l\'hôtel. Journée libre afin de profiter des installations de l’hôtel à notre guise. Souper de gala sur la terrasse de sable, aux abords de la piscine. Nuit à l’hôtel. ', 1, 1, 'Pingwe'),
(15, 'Pingwe / Zanzibar / Montréal', NULL, 3, 'Déjeuner. Matinée libre. Dîner selon l\'horaire du vol. Transfert vers l’aéroport de Zanzibar. Assistance aux formalités d’enregistrement et vol de retour vers Montréal. Repas et nuit à bord.', 3, 2, 'Montréal'),
(16, 'Arrivée à Montréal', NULL, 3, NULL, 3, 2, 'Montréal'),
(17, 'Laval - New York', 'newyorkjour1.jpg', 4, 'Rencontre avec notre guide-accompagnateur et départ vers New York en traversant la chaîne de montagnes des Adirondacks. Dîner libre en cours de route. Arrivée et découverte du coeur de l’action de la Grosse Pomme : Times Square et la célèbre avenue Broadway, réputée comme étant le berceau de nombreux théâtres historiques et spectacles de renom. Souper libre. Installation à l’hôtel et nuit à Manhattan.', 4, 1, 'Manhattan'),
(18, 'New York', 'newyorkjour2.jpg', 4, 'Déjeuner. En matinée, une agréable balade à Central Park nous est proposée : c’est la meilleure façon de découvrir et de ressentir cet immense parc, poumon de la grande ville. Ensuite, nous parcourons la Fifth Avenue qui est l’une des avenues les plus réputées de la ville. Dîner et temps libre dans la Petite Italie et le Chinatown. En après-midi, nous ferons un tour guidé complet en français de Manhattan. New York est considérée comme la plus grande ville des États-Unis, où tout est possible ! Nous découvrirons sa diversité avec ses nombreuses attractions que l’on retrouve à chaque coin de rue. Nous pourrons y admirer et en apprendre plus sur la Fifth Avenue, le Rockefeller Center, la cathédrale Saint-Patrick, ainsi que sur les quartiers de Harlem, de Greenwich Village, de Soho et plus encore. Souper libre à Manhattan où plusieurs choix de restaurants s’offriront à nous. En soirée, nous nous rendrons à l’observatoire Top of the Rock du Rockefeller Center afin d’observer cette cité scintillante ainsi que le magnifique Empire State Building avant de faire une visite by night. Nuit à l’hôtel de Manhattan.', 4, 1, 'New York'),
(19, 'New York', 'newyorkjour3.jpg', 4, 'Déjeuner. Départ pour une balade sur le magnifique et innovateur parc suspendu de la High Line. Ce parc, d’une longueur de près de 2,3 km, a été inauguré en 2009 sur une ancienne ligne de chemin de fer. Il est maintenant un lieu de promenade très apprécié des résidents et des touristes. Un petit arrêt au Chelsea Market nous sera aussi proposé pour y prendre une collation et y admirer ses boutiques originales. Un dîner croisière sur un magnifique navire de verre d\'inspiration européenne nous donnera ensuite l’occasion d’admirer autrement la grande métropole et d’y voir, entre autres, sa magnifique Statue de la Liberté ainsi que ses ponts renommés. En après-midi, notre guide-accompagnateur nous amènera à la découverte du district financier incluant Wall Street, la bourse de New York, son célèbre taureau et l’émouvant site du World Trade Center, encore appelé Ground Zero. Souper et soirée libres pour profiter de la Grosse Pomme. Nuit à Manhattan.', 4, 1, 'New York'),
(20, 'New York - Laval', 'newyorkjour4.jpg', 4, 'Déjeuner. Ce matin, départ avec un guide francophone pour une visite guidée de Brooklyn, un arrondissement méconnu des touristes. Pour nous y rendre, nous aurons la chance de traverser le magnifique pont de Brooklyn. Ensuite, nous assisterons en exclusivité à une célébration Gospel : un rythme incroyable et une ambiance unique! Retour au Québec en traversant  la chaîne de montagnes des Adirondacks. Dîner et souper libres en route. Arrivée en fin de soirée.', 3, 2, 'New York'),
(21, 'Laval - New York', NULL, 5, 'Rencontre avec notre guide accompagnateur « Traditours » et départ en direction de la plus grande ville des États-Unis : New York. Nous traverserons la magnifique chaîne de montagnes des Adirondacks. Dîner libre en cours de route. Arrivée à New York en après-midi et découverte du fameux Times Square à pied. Nous pourrons profiter des nombreux restaurants sur place pour y prendre notre souper libre. Transfert en autocar, installation et nuit à l’hôtel en banlieue de la Grosse Pomme.', 1, 1, 'New York'),
(22, 'New York - Washington', 'washingtonjour2.jpg', 5, 'Déjeuner. Départ pour la capitale américaine : Washington. Dîner libre à notre arrivée dans le quartier réputé de Georgetown. En après-midi, tour de ville de la capitale des États-Unis. Washington est un district qui a été créé par le Congrès des États-Unis en 1790 comme lieu de transactions gouvernementales. Aujourd’hui, Washington est une ville de contrastes nous offrant de nombreuses découvertes historiques et culturelles qui ont permis de forger le pays. Nous nous arrêterons devant les plus grands symboles des États-Unis dont la Maison Blanche, le Capitole et le cimetière d’Arlington où nous irons jusqu’à la tombe de John F. Kennedy. Nous marcherons sur Pennsylvania Avenue où Barack Obama marcha pour se rendre à la Maison Blanche le jour de son investiture. Ce tour comportera également la découverte des monuments importants de l’histoire américaine dont celui de Lincoln. Souper et temps libre avant de partir à la découverte de Washington de nuit avec notre guide accompagnateur. En fin de soirée, transfert, installation et nuit à l’hôtel.', 4, 1, 'Washington'),
(23, 'Washington', 'washingtonjour3.jpg', 5, 'Déjeuner. Matinée libre où nous pourrons assister au défilé du festival « Cherry Blossom » ou visiter, selon nos goûts, les musées de la Smithsonian Institution. Nous aurons l’opportunité de visiter le musée de l’histoire américaine ou le musée d’histoire naturelle avec son importante collection d’ossements de dinosaures et sa prestigieuse collection de pierres précieuses, incluant le diamant le plus pur du monde, soit le « Hope Diamond ». Dîner libre. En après-midi, nous visiterons Mount Vernon, ce domaine historique où a vécu George Washington, le tout premier président des États-Unis en 1789. Nous ferons la visite de la demeure de Washington qui offre une vue imprenable sur le fleuve Potomac. Ce lieu nous dévoilera des objets ayant appartenu au Président. Nous y verrons sa tombe, ainsi que le quartier des esclaves. Retour, souper libre et nuit à l’hôtel.', 4, 2, 'Washington'),
(24, 'Washington - Lancaster', 'washingtonjour4.jpg', 5, 'Déjeuner. Ce matin, nous ferons une promenade aux abords du Bassin Tidal, reconnu pour la beauté de ses nombreux cerisiers en fleurs qui bordent le lac à cette période de l’année. C’est le Japon qui, en 1912, offrit aux États-Unis quelques 3?000 cerisiers pour souligner leur amitié. Ensuite, nous poursuivrons notre visite personnelle des musées de la Smithsonian avec, entre autres, le musée des Indiens d’Amérique, la galerie nationale, ainsi que le musée de l’air et de l’espace. Ouvert au milieu des années 50, nous trouvons dans ce dernier le «Spirit of St. Louis» (avion de Charles Lindberg), ainsi que l’appareil sur lequel les frères Wright ont effectué la première traversée de l’Atlantique. Ensuite, nous prendrons la route en direction de Lancaster où un souper typiquement Amish nous attendra. Finalement, nous séjournerons pour la nuit dans un hôtel authentique rendant hommage à l’architecture Amish.', 4, 1, 'Washington'),
(25, 'Lancaster - Laval', NULL, 5, 'Déjeuner. Visite guidée d’une maison Amish où nous pourrons en apprendre davantage sur leurs traditions et leur mode de vie. Nous découvrirons comment les Amish vivent simplement et à l’écart de la société moderne. L’entraide et la solidarité sont deux de leurs valeurs principales et en font une société dont les liens sont tissés très serrés. Nous en profiterons pour parcourir, à notre guise, les 43 000 pieds carrés de la ferme où nous retrouverons, entre autres, une vieille école, un atelier de sculpteur sur bois, ainsi qu’un joli pont couvert. Ensuite, nous reprendrons la route vers le Québec. Dîner et souper libres en cours de route. Arrivée à Laval en fin de soirée.', 3, 2, 'Lancaster'),
(26, 'Départ de Montréal', 'indedunordjour11.jpg', 6, 'Rencontre avec notre accompagnateur Traditours à l\'aéroport de Montréal. Assistance aux formalités d\'enregistrement et envol à destination de Mumbai. Repas et nuit dans l\'avion.', 5, 1, 'Montréal'),
(27, 'Arrivée à Mumbai (Bombay)', 'indedunordjour2.jpg', 6, 'Dès notre arrivée à Mumbai, nous serons accueillis par notre guide national qui nous fera partager toutes les splendeurs de son pays. Transfert, installation et nuit à l\'hôtel.', 5, 1, 'Bombay'),
(28, 'Mumbai', 'indedunordjour3.jpg', 7, 'Déjeuner. Ce matin, nous passerons devant la tombe d’Haji Ali, un site de pèlerinage important, et emprunterons le fameux Marine Drive, superbe boulevard longeant la mer. Dîner. Tour de ville de Mumbai, la deuxième ville la plus peuplée du monde et la ville la plus riche d’Inde. Nous découvrirons, entre autres, le plus grand lavoir à ciel ouvert (Dobhi Ghat), la Tour Rajabai, la Haute Cour de justice, le collier de la Reine, la gare centrale (Victoria Terminus), classée au patrimoine mondial par l’Unesco, les jardins suspendus situés sur la colline Malabar, et la plage Chowpatty. Visite du Mani Bhawan qui fut le lieu de séjour du Mahatma Gandhi. Départ vers  Porte de l’Inde, monument symbolique de la ville construit dans le cadre d’un vaste projet architectural qui ne fut jamais terminé. Retour, souper et nuit à l’hôtel.', 5, 1, 'Mumbai'),
(29, 'Mumbai - Bhavnagar (vol intérieur)', 'indedunordjour4.jpg', 7, 'Déjeuner. Départ pour la visite guidée du bidonville de Dharavi afin de découvrir le quotidien de ses habitants en plus de ses petites entreprises florissantes ; c’est ici que plusieurs scènes du film « Slumdog Millionaire » ont été tournées. Dîner. Transfert à l’aéroport. Décollage vers Bhavnagar et l’état surprenant du Gujarat. Arrivée, transfert et installation à l’hôtel. Souper et nuit à l’hôtel.', 5, 1, 'Bhavnagar'),
(30, 'Bahvanagar - Palitana - Ahmedabad', 'indedunordjour5.jpg', 7, 'Déjeuner. Nous nous rendrons à Palitana, haut lieu de pèlerinage jaîniste, où nous attendent 863 temples construits entre les XIème et XVIème siècles. Dîner. Continuation vers Ahmedabad, ancienne capitale du Gujarat. Installation, souper et nuit à l\'hôtel.', 5, 1, 'Ahmedabad'),
(31, 'Ahmedabad - Adalaj - Ahmedabad', 'indedunordjour6.jpg', 7, 'Déjeuner. Notre matinée sera consacrée à la visite du vieux centre historique d\'Ahmedabad. Nous poursuivrons par la visite des mosquées Sidi Sayyid et Jama Masjid. Dîner. Départ pour la visite du splendide baoli d\'Adalaj. Retour à Ahmedabad et visite du centre d\'Ashram Sabarmati fondé en 1917 par le Mahatma Gandhi. Promenade à travers le grand bazar. Souper. Nuit à l\'hôtel.', 5, 1, 'Ahmedabad'),
(32, 'Ahmedabad - Udaipur', 'indedunordjour7.jpg', 7, 'Déjeuner. Départ vers l’état harmonieux et tant convoité du Rajasthan pour rejoindre Udaipur, la ville la plus romantique du Rajasthan. Après le dîner, nous visiterons le City Palace, merveilleux ensemble de marbre et de granit. Excursion en bateau sur le lac Pichola jusqu’à l’île Jag Mandir, surnommée l’île des plaisirs. Visite d’une école de peinture. Agréable promenade au cœur du charmant jardin Sahelion-Ki-Bari. Installation, souper et nuit à l’hôtel.', 5, 1, 'Udaipur'),
(33, 'Delhi - Montréal', 'indedunordjour8.jpg', 7, 'Déjeuner. La journée sera consacrée à la visite de la capitale indienne. Nous découvrirons entre autres, le Old Delhi, la rue marchande Chandni Chowk et visiterons le temple sikh Gurudwara de Sis Ganj et l\'impressionnante mosquée Jama Masjid. Dîner. Visite du mausolée d\'Humayun et du Qutub Minar qui est l\'un des premiers monuments de l\'époque afghane. Tour de ville de New Delhi, dont la Porte de l\'Inde haute de 42 mètres, et le Palais Présidentiel. Souper d\'au revoir en ville. Transfert à l\'aéroport de Delhi. Vol de retour pour Montréal. Nuit dans l\'avion.', 5, 1, 'Delhi'),
(34, 'Montréal - Vigo', 'espagneatljour11.JPG', 8, 'Rencontre à l’aéroport de Montréal avec notre accompagnateur Traditours et envol à destination de Vigo, en Galice, au Nord de l’Espagne. Repas et nuit à bord.\r\n\r\n', 6, 1, 'Vigo'),
(35, 'Vigo - Saint-Jacques-de-Compostelle', 'espagneatljour2.jpg', 8, 'Arrivée et accueil par notre guide national qui nous fera découvrir l’Espagne verte, en passant par la Galice, les Asturies, la Cantabrie et le Pays Basque. Transfert et installation à l’hôtel de Saint-Jacques-de-Compostelle. Souper. Nuit à l’hôtel. ', 6, 1, 'Saint-Jacques-de-Compostelle'),
(36, 'Saint-Jacques-de-Compostelle', 'espagneatljour3.jpg', 9, 'Déjeuner à l’hôtel. Départ pour la visite guidée de Saint-Jacques-de-Compostelle, capitale de la Galice. Nous pourrons apprécier l’architecture de ses bâtiments et ses ruelles charmantes. Visite de la cathédrale de Saint-Jacques ornée de pierres finement travaillées. Dîner. Après-midi libre pour poursuivre la découverte à notre guise de cette ville se démarquant à la fois par son riche patrimoine culturel mais aussi par son côté festif! Souper. Nuit à l’hôtel.', 6, 1, 'Saint-Jacques-de-Compostelle'),
(37, 'Cap Finisterre - Saint-Jacques-de-Compostelle | 6 km', 'espagneatljour4.jpg', 9, 'Déjeuner à l’hôtel. Départ vers Calcoba pour débuter une randonnée qui nous mènera jusqu’au Cap Finisterre, endroit symbolique marquant la fin du chemin de Compostelle. À l’arrivée, nous serons récompensés par une vue splendide sur l’océan, que nous contemplerons du phare de Cap Finisterre. Dîner pique-nique et transfert au port de Finistère. Embarquement à bord d’un bateau pour une croisière dans cet estuaire. Retour à Saint-Jacques-de-Compostelle. Souper accompagné d\'un rituel celtique. Retour et nuit à l’hôtel. ', 6, 1, 'Saint-Jacques-de-Compostelle'),
(38, 'Oviedo - Gijón | 6 km', 'espagneatljour5.jpg', 9, 'Déjeuner à l’hôtel. Départ vers le littoral galicien pour une marche sur le sentier de la plage des Cathédrales. À cet endroit, des falaises abruptes et des plages, parmi les plus belles de l’Espagne, bordent la mer Cantabrique de couleur émeraude. Dîner. Départ pour la visite guidée du centre historique d’Oviedo où plusieurs églises et palais ont été classés au Patrimoine mondial de l’Unesco. Visite de l’église Santa Maria del Naranco, d’architecture préromane. Poursuite vers Gijón en fin de journée. Installation à l\'hôtel. Souper. Nuit à l’hôtel.', 6, 1, 'Oviedo'),
(39, 'Mont Naranjo de Bulnes - Gijón | 8 km', 'espagneatljour6.jpg', 9, 'Déjeuner à l’hôtel. Départ pour le Naranjo de Bulnes, le pic le plus magnifique du Parc national des Pics d’Europe, et randonnée jusqu\'au village de Bulnes. Cette randonnée qui alternera entre terrains plats et montées nous en mettra plein la vue puisque nous serons au cœur des plus impressionnantes chaînes de montagnes au monde! Dîner dans un restaurant en montagne. Retour vers Gijón. Souper. Nuit à l’hôtel.', 6, 1, 'Mont Naranjo de Bulnes'),
(40, 'Parc national des Pics d\'Europe - Région de la réserve de Saja | 6 km', 'espagneatljour7.jpg', 9, 'Déjeuner à l’hôtel. Route en direction des Asturies pour faire une belle randonnée dans le Parc national des Pics d\'Europe au cœur de paysages spectaculaires. Les sentiers empruntés nous permettront d’admirer les hauts sommets qui alternent avec les gorges et canyons profonds du défilé de la Hermida, traversé par le fleuve Deva. Dîner champêtre avec dégustation d\'un fromage afin de découvrir la gastronomie locale. Reprise de la route en direction de Saja. Arrivée et installation à l’hôtel. Souper. Nuit à l’hôtel.', 6, 1, 'Saja'),
(41, 'Bilbao - Montréal', 'espagneatljour8.jpg', 9, 'Déjeuner selon l\'horaire du vol. Transfert à l\'aéroport de Bilbao et vol de retour vers Montréal. Repas à bord. Arrivée à Montréal.', 6, 1, 'Bilbao'),
(42, '<p>Relaxe et profitez du retour !! !!</p>\r\n', 'b8ae01a148f55bc3fdcf154dc7b8e5830f318886.JPG', 10, '<p>activite jour 1 etape 2&nbsp;activite jour 1 etape 2activite jour 1 etape 2activite jour 1 etape 2activite jour 1 etape 2activite jour 1 etape 2</p>\r\n', 1, 1, 'Montreal'),
(43, '<p>jour 2 etape 1&nbsp;jour 2 etape 1&nbsp;jour 2 etape 1&nbsp;jour 2 etape 1&nbsp;jour 2 etape 1&nbsp;jour 2 etape 1&nbsp;jour 2 etape 1&nbsp;jour 2 etape 1&nbsp;</p>\r\n', 'b8ae01a148f55bc3fdcf154dc7b8e5830f318886.jpg', 10, '<p>Activit&eacute; jour 2 etape 1&nbsp;Activit&eacute; jour 2 etape 1&nbsp;Activit&eacute; jour 2 etape 1&nbsp;Activit&eacute; jour 2 etape 1&nbsp;</p>\r\n', 4, 1, 'Iqaluit'),
(44, '<p>Relaxe et profitez du retour !! !!</p>\r\n', '4676b15025998efb22c92f4470c6bdcb9944a30f.jpg', 11, '<p>activite jour 1 etape 2&nbsp;activite jour 1 etape 2activite jour 1 etape 2activite jour 1 etape 2activite jour 1 etape 2activite jour 1 etape 2</p>\r\n', 3, 2, 'Montreal');

-- --------------------------------------------------------

--
-- Table structure for table `promotion`
--

CREATE TABLE `promotion` (
  `idpromotion` int(11) NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `rabaisAdulte` decimal(6,2) DEFAULT NULL,
  `rabaisEnfant` decimal(6,2) DEFAULT NULL,
  `rabaisBebe` decimal(6,2) DEFAULT NULL,
  `statut` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `promotion`
--

INSERT INTO `promotion` (`idpromotion`, `description`, `rabaisAdulte`, `rabaisEnfant`, `rabaisBebe`, `statut`) VALUES
(1, 'Rabais instantanée de 10% pour tous', '10.00', '10.00', '10.00', 1),
(2, 'Rabais de 55% pour tous', '55.00', '55.00', '55.00', 1),
(3, 'Rabais de 15% sur le prix pour tous', '15.00', '15.00', '15.00', 1),
(4, 'Rabais de 1% pour tous', '1.00', '1.00', '1.00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `restaurant`
--

CREATE TABLE `restaurant` (
  `idRestaurant` int(11) NOT NULL,
  `nom` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `urlRestaurant` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `restaurant`
--

INSERT INTO `restaurant` (`idRestaurant`, `nom`, `urlRestaurant`) VALUES
(1, 'The Rock Restaurant Zanzibar', 'http://book.therockrestaurantzanzibar.com/'),
(2, 'S/O', 'S/O');

-- --------------------------------------------------------

--
-- Table structure for table `sexe`
--

CREATE TABLE `sexe` (
  `idSexe` int(11) NOT NULL,
  `nom` varchar(11) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sexe`
--

INSERT INTO `sexe` (`idSexe`, `nom`) VALUES
(1, 'Masculin'),
(2, 'Feminin');

-- --------------------------------------------------------

--
-- Table structure for table `theme`
--

CREATE TABLE `theme` (
  `idTheme` int(11) NOT NULL,
  `nom` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `iconUrl` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `theme`
--

INSERT INTO `theme` (`idTheme`, `nom`, `iconUrl`) VALUES
(1, 'Safari', 'https://maps.google.com/mapfiles/kml/shapes/horsebackriding.png'),
(2, 'Yoga & Méditation', 'https://maps.google.com/mapfiles/kml/shapes/lodging.png'),
(3, 'Voyages Randonnées', 'https://maps.google.com/mapfiles/kml/shapes/hiker.png'),
(4, 'Courts Séjours', 'https://maps.google.com/mapfiles/kml/shapes/sunny.png');

-- --------------------------------------------------------

--
-- Table structure for table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `idUtilisateur` int(11) NOT NULL,
  `nom` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `prenom` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `dateNaissance` date NOT NULL,
  `idConnexion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `utilisateur`
--

INSERT INTO `utilisateur` (`idUtilisateur`, `nom`, `prenom`, `dateNaissance`, `idConnexion`) VALUES
(5, 'arash', 'arash', '1982-12-12', 5),
(6, 'arash', 'arash', '1982-12-12', 6),
(7, 'arash', 'arash', '1982-12-12', 7);

-- --------------------------------------------------------

--
-- Table structure for table `voyageur`
--

CREATE TABLE `voyageur` (
  `idVoyageur` int(11) NOT NULL,
  `courriel` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `nom` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `prenom` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `idCategorie` int(11) NOT NULL,
  `idSexe` int(11) NOT NULL,
  `dateNaissance` date DEFAULT NULL,
  `noPasseport` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `dateExpirationPasseport` date DEFAULT NULL,
  `idCommande` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categorie`
--
ALTER TABLE `categorie`
  ADD PRIMARY KEY (`idCategorie`);

--
-- Indexes for table `circuit`
--
ALTER TABLE `circuit`
  ADD PRIMARY KEY (`idCircuit`),
  ADD UNIQUE KEY `Nom_UNIQUE` (`nom`),
  ADD KEY `fk_Circuits_Themes1_idx` (`idTheme`);

--
-- Indexes for table `commande`
--
ALTER TABLE `commande`
  ADD PRIMARY KEY (`idCommande`),
  ADD KEY `fk_Commande_GroupeVoyage1_idx` (`idGroupeVoyage`),
  ADD KEY `fk_Commande_Utilisateur1_idx` (`idUtilisateur`);

--
-- Indexes for table `connexion`
--
ALTER TABLE `connexion`
  ADD PRIMARY KEY (`idConnexion`);

--
-- Indexes for table `etape`
--
ALTER TABLE `etape`
  ADD PRIMARY KEY (`idEtape`),
  ADD KEY `fk_Etape_Circuits1_idx` (`idCircuit`);

--
-- Indexes for table `groupevoyage`
--
ALTER TABLE `groupevoyage`
  ADD PRIMARY KEY (`idGroupeVoyage`),
  ADD KEY `fk_GroupeVoyage_Circuits1_idx` (`idCircuit`),
  ADD KEY `fk_GroupeVoyage_promotion1_idx` (`idpromotion`);

--
-- Indexes for table `hotel`
--
ALTER TABLE `hotel`
  ADD PRIMARY KEY (`idHotel`),
  ADD UNIQUE KEY `Nom_UNIQUE` (`nom`);

--
-- Indexes for table `jour`
--
ALTER TABLE `jour`
  ADD PRIMARY KEY (`idJour`),
  ADD KEY `fk_Jour_Etape1_idx` (`idEtape`),
  ADD KEY `fk_Jour_Hotel1_idx` (`idHotel`),
  ADD KEY `fk_Jour_Restaurant1_idx` (`idRestaurant`);

--
-- Indexes for table `promotion`
--
ALTER TABLE `promotion`
  ADD PRIMARY KEY (`idpromotion`);

--
-- Indexes for table `restaurant`
--
ALTER TABLE `restaurant`
  ADD PRIMARY KEY (`idRestaurant`),
  ADD UNIQUE KEY `Nom_UNIQUE` (`nom`);

--
-- Indexes for table `sexe`
--
ALTER TABLE `sexe`
  ADD PRIMARY KEY (`idSexe`);

--
-- Indexes for table `theme`
--
ALTER TABLE `theme`
  ADD PRIMARY KEY (`idTheme`);

--
-- Indexes for table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`idUtilisateur`),
  ADD KEY `fk_Utilisateur_Connexion1` (`idConnexion`);

--
-- Indexes for table `voyageur`
--
ALTER TABLE `voyageur`
  ADD PRIMARY KEY (`idVoyageur`),
  ADD KEY `fk_Voyageur_Categorie1_idx` (`idCategorie`),
  ADD KEY `fk_Voyageur_Commande1_idx` (`idCommande`),
  ADD KEY `idSexe` (`idSexe`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categorie`
--
ALTER TABLE `categorie`
  MODIFY `idCategorie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `circuit`
--
ALTER TABLE `circuit`
  MODIFY `idCircuit` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `commande`
--
ALTER TABLE `commande`
  MODIFY `idCommande` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `connexion`
--
ALTER TABLE `connexion`
  MODIFY `idConnexion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `etape`
--
ALTER TABLE `etape`
  MODIFY `idEtape` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `groupevoyage`
--
ALTER TABLE `groupevoyage`
  MODIFY `idGroupeVoyage` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `hotel`
--
ALTER TABLE `hotel`
  MODIFY `idHotel` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `jour`
--
ALTER TABLE `jour`
  MODIFY `idJour` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `promotion`
--
ALTER TABLE `promotion`
  MODIFY `idpromotion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `restaurant`
--
ALTER TABLE `restaurant`
  MODIFY `idRestaurant` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sexe`
--
ALTER TABLE `sexe`
  MODIFY `idSexe` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `theme`
--
ALTER TABLE `theme`
  MODIFY `idTheme` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `utilisateur`
--
ALTER TABLE `utilisateur`
  MODIFY `idUtilisateur` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `voyageur`
--
ALTER TABLE `voyageur`
  MODIFY `idVoyageur` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `circuit`
--
ALTER TABLE `circuit`
  ADD CONSTRAINT `fk_Circuits_Themes1` FOREIGN KEY (`idTheme`) REFERENCES `theme` (`idTheme`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `commande`
--
ALTER TABLE `commande`
  ADD CONSTRAINT `fk_Commande_GroupeVoyage1` FOREIGN KEY (`idGroupeVoyage`) REFERENCES `groupevoyage` (`idGroupeVoyage`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Commande_Utilisateur1` FOREIGN KEY (`idUtilisateur`) REFERENCES `utilisateur` (`idUtilisateur`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `etape`
--
ALTER TABLE `etape`
  ADD CONSTRAINT `fk_Etape_Circuits1` FOREIGN KEY (`idCircuit`) REFERENCES `circuit` (`idCircuit`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `groupevoyage`
--
ALTER TABLE `groupevoyage`
  ADD CONSTRAINT `fk_GroupeVoyage_Circuits1` FOREIGN KEY (`idCircuit`) REFERENCES `circuit` (`idCircuit`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_GroupeVoyage_promotion1` FOREIGN KEY (`idpromotion`) REFERENCES `promotion` (`idpromotion`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `jour`
--
ALTER TABLE `jour`
  ADD CONSTRAINT `fk_Jour_Etape1` FOREIGN KEY (`idEtape`) REFERENCES `etape` (`idEtape`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Jour_Hotel1` FOREIGN KEY (`idHotel`) REFERENCES `hotel` (`idHotel`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Jour_Restaurant1` FOREIGN KEY (`idRestaurant`) REFERENCES `restaurant` (`idRestaurant`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD CONSTRAINT `fk_Utilisateur_Connexion1` FOREIGN KEY (`idConnexion`) REFERENCES `connexion` (`idConnexion`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `voyageur`
--
ALTER TABLE `voyageur`
  ADD CONSTRAINT `fk_Voyageur_Categorie1` FOREIGN KEY (`idCategorie`) REFERENCES `categorie` (`idCategorie`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Voyageur_Commande1` FOREIGN KEY (`idCommande`) REFERENCES `commande` (`idCommande`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `voyageur_ibfk_1` FOREIGN KEY (`idSexe`) REFERENCES `sexe` (`idSexe`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
