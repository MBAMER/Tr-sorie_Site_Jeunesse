-- SQL seed file generated from JS mock files
-- Create tables and insert mock data


DROP TABLE IF EXISTS `entries`;
DROP TABLE IF EXISTS `evenement`;
DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` INT NOT NULL PRIMARY KEY,
  `last_name` VARCHAR(100) NOT NULL,
  `first_name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `youth_club_id` INT DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `entries` (
  `id` INT NOT NULL PRIMARY KEY,
  `description` TEXT,
  `amount` DECIMAL(12,2),
  `entry_date` DATE,
  `user_id` INT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `evenement` (
  `id` INT NOT NULL PRIMARY KEY,
  `event_name` VARCHAR(150),
  `event_date` DATE,
  `user_id` INT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert users
INSERT INTO `users` (`id`, `last_name`, `first_name`, `email`, `password`, `youth_club_id`) VALUES
(1, 'Bamert', 'Mathieu', 'mathieu.bamert@gmail.com', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', 10),
(2, 'Wirth', 'Kévin', 'kevin.wirth@gmail.com', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', 11);

-- Insert entries
INSERT INTO `entries` (`id`, `description`, `amount`, `entry_date`, `user_id`) VALUES
(1, 'Vente de tickets', 150.50, '2026-06-15', 1),
(2, 'Achat boissons', -45.00, '2026-06-16', 1),
(3, 'Location salle', -100.00, '2026-07-10', 12);

-- Insert events
INSERT INTO `evenement` (`id`, `event_name`, `event_date`, `user_id`) VALUES
(1, 'Tournoi de Foot', '2026-06-20', 1),
(2, 'Sortie Cinéma', '2026-07-12', 2);
