-- SQL seed file generated from JS mock files
-- Create tables and insert mock data

/*
DROP TABLE IF EXISTS `entries`;
DROP TABLE IF EXISTS `evenement`;
DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` INT NOT NULL PRIMARY KEY,
  `last_name` VARCHAR(100) NOT NULL,
  `first_name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `MDP` VARCHAR(255) NOT NULL,
  `youthclubs_id` INT DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `entries` (
  `id` INT NOT NULL PRIMARY KEY,
  `description` TEXT,
  `montant` DECIMAL(12,2),
  `date_` DATE,
  `users_id` INT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `evenement` (
  `id` INT NOT NULL PRIMARY KEY,
  `last_name` VARCHAR(150),
  `date_` DATE,
  `users_id` INT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
*/

-- Insert users
INSERT INTO `users` (`id`, `last_name`, `first_name`, `email`, `MDP`, `youthclubs_id`) VALUES
(1, 'Bamert', 'Mathieu', 'mathieu.bamert@gmail.com', '**********', 10),
(2, 'Wirth', 'Kévin', 'kevin.wirth@gmail.com', '**********', 11);

-- Insert entries
INSERT INTO `entries` (`id`, `description`, `montant`, `date_`, `users_id`) VALUES
(1, 'Vente de tickets', 150.50, '2026-06-15', 1),
(2, 'Achat boissons', -45.00, '2026-06-16', 1),
(3, 'Location salle', -100.00, '2026-07-10', 12);

-- Insert events
INSERT INTO `evenement` (`id`, `last_name`, `date_`, `users_id`) VALUES
(1, 'Tournoi de Foot', '2026-06-20', 1),
(2, 'Sortie Cinéma', '2026-07-12', 2);
