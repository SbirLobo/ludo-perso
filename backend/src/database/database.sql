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
    `nbPlayer` varchar(25) NOT NULL,
    `playingTime` varchar(50) NOT NULL,
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
    `favorite` bool NULL,
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
('user','user@user.fr',0,'hashedPassword'),
('sbir','sbir@email.fr',0,'hashedPassword'),
('dam','dam@email.fr',0,'hashedPassword'),
('omar','omar@email.fr',0,'hashedPassword'),
('bozo','bozo@email.fr',0,'hashedPassword');

INSERT INTO `boardgame`
(title,nbPlayer,playingTime,standalone,year,language,boxImg)
VALUES
('APEX : Collected Edition','1-6','60-160',1,2021,'english','/img'),
('Ultimate Railroads','1-4','120-180',1,2022,'français','/img'),
('Mage Knight Ultimate Edition','1-5','90-180',1,2019,'français','/img'),
('Clash of cultures Monumental Edition','2-4','180',1,2021,'français','/img'),
('Champ d''honneur','2-4','30-60',1,2019,'français','/img'),
('Combat! Volume 1','1','120-240',1,2022,'english','/img');

INSERT INTO `editor`
(name)
VALUES
('Die-Hard Games'),
('Z-Man Games'),
('Wizkids'),
('Intrafin Games'),
('Matagot'),
('Gigamic'),
('Compass Games');

INSERT INTO `creator`
(firstname,lastname)
VALUES
('Ross','Mortell'),
('David','Thompson'),
('Trevor','Benjamin'),
('Christian','Marcussen'),
('Vlaada','Chvátil'),
('Chris','Raimo'),
('Helmut','Ohley'),
('Leonhard','Orgler'),
('Herschel','Hoffmayer');

INSERT INTO `edited_by`
(boardgame_id,editor_id)
VALUES
(1,1),
(2,2),
(3,3),
(3,4),
(4,5),
(5,6),
(6,7);

INSERT INTO `created_by`
(boardgame_id,creator_id)
VALUES
(1,9),
(2,8),
(2,7),
(3,6),
(3,5),
(4,4),
(5,2),
(5,3),
(6,1);

INSERT INTO `owned_by`
(user_id,boardgame_id)
VALUES
(2,1),
(2,2),
(2,3),
(2,4),
(2,5),
(2,6),
(3,1),
(3,2),
(3,3),
(4,2),
(4,3),
(4,4),
(5,3),
(5,4),
(5,5),
(6,4),
(6,5),
(6,6);