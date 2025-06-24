-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 24, 2025 at 02:36 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rdv`
--

-- --------------------------------------------------------

--
-- Table structure for table `codes`
--

CREATE TABLE `codes` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `code` varchar(20) DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `disponibilites`
--

CREATE TABLE `disponibilites` (
  `id` int(10) UNSIGNED NOT NULL,
  `medecinId` int(10) UNSIGNED DEFAULT NULL,
  `date` date DEFAULT NULL,
  `heureDebut` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `disponibilites`
--

INSERT INTO `disponibilites` (`id`, `medecinId`, `date`, `heureDebut`) VALUES
(1, 47, '2025-06-25', '13:00:00'),
(2, 50, '2025-06-25', '09:00:00'),
(3, 50, '2025-06-25', '09:30:00'),
(4, 50, '2025-06-25', '10:00:00'),
(5, 50, '2025-06-25', '10:30:00'),
(6, 50, '2025-06-25', '11:00:00'),
(7, 50, '2025-06-25', '11:30:00'),
(8, 50, '2025-06-25', '12:00:00'),
(9, 50, '2025-06-25', '12:30:00'),
(10, 50, '2025-06-25', '13:00:00'),
(11, 50, '2025-06-25', '13:30:00'),
(12, 50, '2025-06-25', '14:00:00'),
(13, 50, '2025-06-25', '14:30:00'),
(14, 50, '2025-06-25', '15:00:00'),
(15, 50, '2025-06-25', '15:30:00'),
(16, 50, '2025-06-25', '16:00:00'),
(17, 50, '2025-06-25', '16:30:00'),
(18, 50, '2025-06-22', '09:00:00'),
(19, 50, '2025-06-22', '09:30:00'),
(20, 50, '2025-06-22', '10:00:00'),
(21, 50, '2025-06-22', '10:30:00'),
(22, 50, '2025-06-22', '11:00:00'),
(23, 50, '2025-06-22', '11:30:00'),
(24, 50, '2025-06-22', '12:00:00'),
(25, 50, '2025-06-22', '12:30:00'),
(26, 50, '2025-06-22', '13:00:00'),
(27, 50, '2025-06-22', '13:30:00'),
(28, 50, '2025-06-22', '14:00:00'),
(29, 50, '2025-06-22', '14:30:00'),
(30, 50, '2025-06-22', '15:00:00'),
(31, 50, '2025-06-22', '15:30:00'),
(32, 50, '2025-06-22', '16:00:00'),
(33, 50, '2025-06-22', '16:30:00');

-- --------------------------------------------------------

--
-- Table structure for table `knex_migrations`
--

CREATE TABLE `knex_migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `batch` int(11) DEFAULT NULL,
  `migration_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `knex_migrations`
--

INSERT INTO `knex_migrations` (`id`, `name`, `batch`, `migration_time`) VALUES
(1, '20250524174219_create_medecins_table.js', 1, '2025-05-24 21:58:11');

-- --------------------------------------------------------

--
-- Table structure for table `knex_migrations_lock`
--

CREATE TABLE `knex_migrations_lock` (
  `index` int(10) UNSIGNED NOT NULL,
  `is_locked` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `knex_migrations_lock`
--

INSERT INTO `knex_migrations_lock` (`index`, `is_locked`) VALUES
(1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `medecins`
--

CREATE TABLE `medecins` (
  `id` int(10) UNSIGNED NOT NULL,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `tel` varchar(50) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `experience` int(11) NOT NULL,
  `photo` varchar(50) DEFAULT NULL,
  `modesPaiement` varchar(250) DEFAULT NULL,
  `languesParlees` varchar(250) DEFAULT NULL,
  `adresse` varchar(250) DEFAULT '',
  `tarif` int(11) DEFAULT NULL,
  `specialiteId` int(11) UNSIGNED DEFAULT NULL,
  `villeId` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `medecins`
--

INSERT INTO `medecins` (`id`, `nom`, `prenom`, `email`, `tel`, `password`, `experience`, `photo`, `modesPaiement`, `languesParlees`, `adresse`, `tarif`, `specialiteId`, `villeId`) VALUES
(1, 'Dupont', 'Jean', 'jean.dupont@example.com', '0612345678', 'hashed_pass_1', 10, 'https://example.com/img/jean.jpg', NULL, NULL, NULL, NULL, NULL, NULL),
(2, 'Benali', 'Khadija', 'khadija.benali@example.com', '0623456789', 'hashed_pass_2', 7, 'https://example.com/img/khadija.jpg', NULL, NULL, NULL, NULL, NULL, NULL),
(3, 'El Mansouri', 'Youssef', 'youssef.elmansouri@example.com', '0634567890', 'hashed_pass_3', 12, 'https://example.com/img/youssef.jpg', NULL, NULL, NULL, NULL, NULL, NULL),
(47, 'Ourahioui', 'fabrigass', 'fabrigassourahioui@gmail.com', '0610556752', '$2b$10$bDTJtFtcoTB9Kr1aXX9YUOiUMyReg6G.0fEdLlxc8uCJhV8RxcliC', 3, 'img2.jpg', 'null', NULL, '', 0, 13, 2),
(50, 'Ourahioui', 'fabrigass', 'ourahiouim@gmail.com', '0610556752', '$2b$10$L8V01VdbV8IUlN.ZJT77Qeh5nzdCthl87U9dAsiQAZflKQfW8A2gy', 2, 'Elarif.jpeg', 'null', 'null,Arabe,Anglais', 'riyad rue 5', 0, 14, 3),
(51, 'tazi', 'mohamed', 'mohamed.tazi@example.com', '0798637654', '$2b$10$MJA9moFqSl0NY7/xGN8uCeMHAAfz7BfXUmGFPYbPs9Bq/mwf/e7i2', 4, 'usman-yousaf-pTrhfmj2jDA-unsplash.jpg', NULL, NULL, '', NULL, 11, 2),
(52, 'aitlahcen', 'sara', 'sara.aitlahcen@example.com', '0645678901', '$2b$10$RlnnzFatayu6wZIM6MRI7uQT0BPNwT.gyjmUkirreAUYxkMpnFPQm', 2, 'Female-Doctor-Transparent-PNG.png', NULL, NULL, '', NULL, 1, 5),
(53, 'El Amrani', 'Ahmed', 'ahmed.amrani@example.com', '0612345678', 'hashed_pwd1', 10, 'ahmed.jpg', 'Carte bancaire', 'Français, Arabe', 'Avenue Mohammed V, Rabat', 300, 1, 1),
(54, 'Benzekri', 'Salma', 'salma.benzekri@example.com', '0623456789', 'hashed_pwd2', 7, 'salma.jpg', 'Espèces', 'Français, Arabe', 'Rue des hôpitaux, Casablanca', 350, 2, 2),
(55, 'Mouline', 'Yassine', 'yassine.mouline@example.com', '0634567890', 'hashed_pwd3', 12, 'yassine.jpg', 'Carte bancaire, Espèces', 'Français, Arabe', 'Quartier Agdal, Rabat', 400, 3, 1),
(56, 'Naciri', 'Rania', 'rania.naciri@example.com', '0645678901', 'hashed_pwd4', 5, 'rania.jpg', 'Espèces', 'Arabe, Français', 'Avenue Hassan II, Marrakech', 250, 4, 3),
(57, 'Ait Said', 'Omar', 'omar.aitsaid@example.com', '0656789012', 'hashed_pwd5', 9, 'omar.jpg', 'Carte bancaire', 'Français, Anglais', 'Centre-ville, Fès', 380, 5, 4),
(58, 'Essafi', 'Lamia', 'lamia.essafi@example.com', '0667890123', 'hashed_pwd6', 6, 'lamia.jpg', 'Carte bancaire', 'Français, Arabe', 'Bd Zerktouni, Casablanca', 300, 6, 2),
(59, 'Belkacem', 'Karim', 'karim.belkacem@example.com', '0678901234', 'hashed_pwd7', 8, 'karim.jpg', 'Espèces', 'Français', 'Hay Ryad, Rabat', 320, 7, 1),
(60, 'Kabbaj', 'Nadia', 'nadia.kabbaj@example.com', '0689012345', 'hashed_pwd8', 15, 'nadia.jpg', 'Carte bancaire', 'Français, Arabe', 'Route d’Agadir, Marrakech', 450, 8, 3),
(61, 'Ouazzani', 'Hassan', 'hassan.ouazzani@example.com', '0690123456', 'hashed_pwd9', 11, 'hassan.jpg', 'Espèces', 'Français, Espagnol', 'Avenue des FAR, Tanger', 370, 9, 5),
(62, 'Fassi', 'Amina', 'amina.fassi@example.com', '0601234567', 'hashed_pwd10', 4, 'amina.jpg', 'Carte bancaire', 'Français, Arabe', 'Bd Mohammed VI, Fès', 290, 10, 4),
(63, 'Talbi', 'Anas', 'anas.talbi@example.com', '0619876543', 'hashed_pwd11', 6, 'Image 2025-06-24 at 14.29.43 (2).jpeg', 'Espèces', 'Arabe, Français', 'Place Jemaa El-Fna, Marrakech', 310, 11, 3),
(64, 'Zahiri', 'Siham', 'siham.zahiri@example.com', '0621987654', 'hashed_pwd12', 7, 'siham.jpg', 'Carte bancaire', 'Français, Arabe', 'Avenue Oujda, Oujda', 280, 12, 6),
(65, 'Abkari', 'Tarik', 'tarik.abkari@example.com', '0632098765', 'hashed_pwd13', 14, ' Image 2025-06-24 at 14.29.43', 'Espèces', 'Français, Amazigh', 'Hay Salam, Agadir', 300, 13, 7),
(66, 'Hajji', 'Loubna', 'loubna.hajji@example.com', '0643209876', 'hashed_pwd14', 9, 'Female-Doctor-PNG-Free-Download', 'Carte bancaire', 'Français, Arabe', 'Avenue Al Massira, Meknès', 260, 14, 8),
(67, 'Chakiri', 'Reda', 'reda.chakiri@example.com', '0654310987', 'hashed_pwd15', 13, 'reda.jpg', 'Espèces', 'Français', 'Centre-ville, Ouarzazate', 230, 15, 9),
(68, 'Zouhairi', 'Ilham', 'ilham.zouhairi@example.com', '0665421098', 'hashed_pwd16', 12, 'Female-Doctor-PNG-Photos', 'Carte bancaire, Espèces', 'Français, Arabe', 'Avenue My Ismail, Tétouan', 310, 16, 10),
(69, 'Rhani', 'Mohamed', 'mohamed.rhani@example.com', '0676532109', 'hashed_pwd17', 10, 'img2.jpg', 'Espèces', 'Français', 'Route de Safi, El Jadida', 340, 17, 11),
(70, 'Sebaï', 'Houda', 'houda.sebai@example.com', '0687643210', 'hashed_pwd18', 6, 'istockphoto-1168372978-1024x1024', 'Carte bancaire', 'Français, Arabe', 'Bd Zerktouni, Mohammedia', 320, 18, 12);

-- --------------------------------------------------------

--
-- Table structure for table `medecin_modes_paiement`
--

CREATE TABLE `medecin_modes_paiement` (
  `id` int(11) NOT NULL,
  `mode_paiement_id` int(11) DEFAULT NULL,
  `medecin_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `modes_paiement`
--

CREATE TABLE `modes_paiement` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `modes_paiement`
--

INSERT INTO `modes_paiement` (`id`, `nom`) VALUES
(1, 'Carte bancaire'),
(2, 'Espèces'),
(3, 'Chèque'),
(4, 'PayPal');

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

CREATE TABLE `patient` (
  `id` int(11) NOT NULL,
  `nom` varchar(50) DEFAULT NULL,
  `prenom` varchar(50) DEFAULT NULL,
  `tel` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patient`
--

INSERT INTO `patient` (`id`, `nom`, `prenom`, `tel`, `email`, `password`) VALUES
(57, 'Ourahioui', 'hass', '0610556752', 'fabrigassourahioui@gmail.com', '$2b$10$zJsnd9xi45gyebnVCqIvi.mLThCBeHk/kdADQiAS64EtUvOfnEPZW');

-- --------------------------------------------------------

--
-- Table structure for table `rendez_vous`
--

CREATE TABLE `rendez_vous` (
  `id` int(11) NOT NULL,
  `patientId` int(11) NOT NULL,
  `medecinId` int(10) UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `Heure` time NOT NULL,
  `statut` enum('EnAttente','Accepte','Refuse') DEFAULT 'EnAttente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `specialites`
--

CREATE TABLE `specialites` (
  `id` int(11) UNSIGNED NOT NULL,
  `specialite` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `specialites`
--

INSERT INTO `specialites` (`id`, `specialite`) VALUES
(1, 'médecin général\n'),
(2, 'Radiologue'),
(3, 'Gynécologie-Obstétrique'),
(4, 'Pédiatre'),
(5, 'Dermatologie'),
(6, 'Ophtalmologie'),
(7, 'Oto-rhino-laryngologie (ORL)'),
(8, 'Orthopédie-Traumatologie'),
(9, 'Neurologue'),
(10, 'Endocrinologie'),
(11, 'Urologie'),
(12, 'Gastro-entérologie'),
(13, 'Psychiatre'),
(14, 'Oncologie'),
(15, 'Radiologie'),
(16, 'Gynécologue'),
(17, 'Cardiologie'),
(18, 'Orthopédiste');

-- --------------------------------------------------------

--
-- Table structure for table `verification_codes`
--

CREATE TABLE `verification_codes` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `code` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `villes`
--

CREATE TABLE `villes` (
  `id` int(10) UNSIGNED NOT NULL,
  `ville` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `villes`
--

INSERT INTO `villes` (`id`, `ville`) VALUES
(1, 'Casablanca'),
(2, 'Rabat'),
(3, 'Fès'),
(4, 'Marrakech'),
(5, 'Tanger'),
(6, 'Agadir'),
(7, 'Meknès'),
(8, 'Oujda'),
(9, 'Tétouan'),
(10, 'Nador'),
(11, 'Khouribga'),
(12, 'Kénitra'),
(13, 'El Jadida'),
(14, 'Beni Mellal'),
(15, 'Taza');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `codes`
--
ALTER TABLE `codes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `disponibilites`
--
ALTER TABLE `disponibilites`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fr_disponabilite_medecin` (`medecinId`);

--
-- Indexes for table `knex_migrations`
--
ALTER TABLE `knex_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `knex_migrations_lock`
--
ALTER TABLE `knex_migrations_lock`
  ADD PRIMARY KEY (`index`);

--
-- Indexes for table `medecins`
--
ALTER TABLE `medecins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `medecins_email_unique` (`email`),
  ADD KEY `fk_medecins_specialites` (`specialiteId`),
  ADD KEY `fr_medecins_villes` (`villeId`);

--
-- Indexes for table `medecin_modes_paiement`
--
ALTER TABLE `medecin_modes_paiement`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_mode_paiement` (`mode_paiement_id`),
  ADD KEY `fk_medecin` (`medecin_id`);

--
-- Indexes for table `modes_paiement`
--
ALTER TABLE `modes_paiement`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `rendez_vous`
--
ALTER TABLE `rendez_vous`
  ADD PRIMARY KEY (`id`),
  ADD KEY `patientId` (`patientId`),
  ADD KEY `medecinId` (`medecinId`);

--
-- Indexes for table `specialites`
--
ALTER TABLE `specialites`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `verification_codes`
--
ALTER TABLE `verification_codes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `villes`
--
ALTER TABLE `villes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `codes`
--
ALTER TABLE `codes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=192;

--
-- AUTO_INCREMENT for table `disponibilites`
--
ALTER TABLE `disponibilites`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `knex_migrations`
--
ALTER TABLE `knex_migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `knex_migrations_lock`
--
ALTER TABLE `knex_migrations_lock`
  MODIFY `index` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `medecins`
--
ALTER TABLE `medecins`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `medecin_modes_paiement`
--
ALTER TABLE `medecin_modes_paiement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `modes_paiement`
--
ALTER TABLE `modes_paiement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `patient`
--
ALTER TABLE `patient`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `rendez_vous`
--
ALTER TABLE `rendez_vous`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `verification_codes`
--
ALTER TABLE `verification_codes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `villes`
--
ALTER TABLE `villes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `disponibilites`
--
ALTER TABLE `disponibilites`
  ADD CONSTRAINT `fr_disponabilite_medecin` FOREIGN KEY (`medecinId`) REFERENCES `medecins` (`id`);

--
-- Constraints for table `medecins`
--
ALTER TABLE `medecins`
  ADD CONSTRAINT `fk_medecins_specialites` FOREIGN KEY (`specialiteId`) REFERENCES `specialites` (`id`),
  ADD CONSTRAINT `fr_medecins_villes` FOREIGN KEY (`villeId`) REFERENCES `villes` (`id`);

--
-- Constraints for table `medecin_modes_paiement`
--
ALTER TABLE `medecin_modes_paiement`
  ADD CONSTRAINT `fk_medecin` FOREIGN KEY (`medecin_id`) REFERENCES `medecins` (`id`),
  ADD CONSTRAINT `fk_mode_paiement` FOREIGN KEY (`mode_paiement_id`) REFERENCES `modes_paiement` (`id`);

--
-- Constraints for table `rendez_vous`
--
ALTER TABLE `rendez_vous`
  ADD CONSTRAINT `rendez_vous_ibfk_1` FOREIGN KEY (`patientId`) REFERENCES `patient` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `rendez_vous_ibfk_2` FOREIGN KEY (`medecinId`) REFERENCES `medecins` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
