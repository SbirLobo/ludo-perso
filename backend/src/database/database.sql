-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/sVli7c
-- NOTE! If you have used non-SQL datatypes in your desig, you will have to change these here.


CREATE TABLE `user` (
    `id` int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `userName` varchar(50) NOT NULL,
    `email` varchar(255) NOT NULL,
    `admin` bool NOT NULL,
    `hashedPassword` varchar(255) NOT NULL
);

CREATE TABLE `boardgame` (
    `id` int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `title` varchar(50) NOT NULL,
    `nbPlayerMin` int NOT NULL,
    `nbPlayerMax` int NOT NULL,
    `playingTime` varchar(50) NOT NULL,
    `timeNature` varchar(50) NOT NULL,
    `standalone` bool NOT NULL,
    `year` int NOT NULL,
    `language` varchar(50) NOT NULL,
    `boxImg` varchar(255) NOT NULL
);

CREATE TABLE `editor` (
    `id` int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `name` varchar(50) NOT NULL
);

CREATE TABLE `creator` (
    `id` int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `firstname` varchar(50) NOT NULL,
    `lastname` varchar(50) NOT NULL
);

CREATE TABLE `created_by` (
    `boardgame_id` int NOT NULL,
    `creator_id` int NOT NULL,
    CONSTRAINT `fk_creator_boardgame` FOREIGN KEY(`creator_id`) REFERENCES `creator` (`id`),
    CONSTRAINT `fk_boardgame_creator` FOREIGN KEY(`boardgame_id`) REFERENCES `boardgame` (`id`)
);

CREATE TABLE `owned_by` (
    `user_id` int NOT NULL,
    `boardgame_id` int NOT NULL,
    `favorite` bool NOT NULL,
    `note` int NOT NULL,
    `comment` text NOT NULL,
    CONSTRAINT `fk_user_boardgame` FOREIGN KEY(`user_id`) REFERENCES `user` (`id`),
    CONSTRAINT `fk_boardgame_user` FOREIGN KEY(`boardgame_id`) REFERENCES `boardgame` (`id`)
);

CREATE TABLE `edited_by` (
    `boardgame_id` int NOT NULL,
    `editor_id` int NOT NULL,
    CONSTRAINT `fk_boardgame_editor` FOREIGN KEY(`boardgame_id`) REFERENCES `boardgame` (`id`),
    CONSTRAINT `fk_editor_boardgame` FOREIGN KEY(`editor_id`) REFERENCES `editor` (`id`)
);

INSERT INTO `user` 
(userName,email,admin,hashedPassword)
VALUES 
('admin','admin@admin.fr',1,'hashedPassword'),
('user','user@user.fr',0,'hashedPassword');


