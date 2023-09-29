-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/sVli7c
-- NOTE! If you have used non-SQL datatypes in your desig, you will have to change these here.


CREATE TABLE `user` (
    `id` int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `userName` varchar(50) NOT NULL,
    `email` varchar(255) NOT NULL,
    `admin` bool DEFAULT 0 NOT NULL,
    `hashedPassword` varchar(255) NOT NULL
);

CREATE TABLE `boardgame` (
    `id` int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `title` varchar(75) NOT NULL,
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
    `favorite` bool DEFAULT 0 NOT NULL,
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
(id,userName,email,admin,hashedPassword)
VALUES 
(1,'admin','admin@email.fr',1,'$argon2id$v=19$m=65536,t=5,p=1$PuZ8xyq2Eyi2SYGGhX2Q/w$7r16HskpeMT3++xbrSdiFe9cT24kZJ5wLhqCxIyFGmc'),(2,'user','user@email.fr',0,'$argon2id$v=19$m=65536,t=5,p=1$sSw3X61wri2MWZAwa+j3gg$AY54QRXVpdSrFxK/QD8+RFwGNICcmejC2hHN6LYqcAE'),(3,'sbir','sbir@email.fr',0,'$argon2id$v=19$m=65536,t=5,p=1$7vzrboh6HMn6jdvVo2ygTw$udnqwzUr9Tc5h6KtdufJE3gV8KUGLPEbOA0ZqGUpr4w'),(4,'dam','dam@email.fr',0,'$argon2id$v=19$m=65536,t=5,p=1$KiQrizUHesJKHDeGNAFbLg$L6m1KNHQau50c/2h+tzVDMS3qEcxvX9yr4KtEGXsnaQ'),(5,'omar','omar@email.fr',0,'$argon2id$v=19$m=65536,t=5,p=1$ZZ/Gke3aoNG2V9EsYkBYhw$yPCOQdrpt9jkfxeUi1P+1tK1bsqBP1TiKdWFPaOTfFY'),(6,'bozo','bozo@email.fr',0,'$argon2id$v=19$m=65536,t=5,p=1$pnZZv8ULAzQrKdRmiRSftw$YE1fnUL4I6UY7yq8VWcu8fB1NGSOVHL4mp8oSypV1Tg');

INSERT INTO `boardgame`
(id,title,nbPlayer,playingTime,standalone,year,language,boxImg)
VALUES
(1,'APEX : Collected Edition','1-6','60-160',1,2021,'english','https://www.myludo.fr/img/jeux/1654603541/300/bl/37181.png'),(2,'Ultimate Railroads','1-4','120-180',1,2022,'français','https://www.myludo.fr/img/jeux/1680783074/300/cb/53852.png'),(3,'Mage Knight Ultimate Edition','1-5','90-180',1,2019,'français','https://www.myludo.fr/img/jeux/1685216903/300/bu/46344.png'),(4,'Clash of cultures Monumental Edition','2-4','180-180',1,2021,'français','https://www.myludo.fr/img/jeux/1681845942/300/bw/48673.png'),(5,'Champ d\'honneur','2-4','30-60',1,2019,'français','https://www.myludo.fr/img/jeux/1689670078/300/bi/34427.png'),(6,'Combat! Volume 1','1-1','120-240',1,2022,'english','https://www.myludo.fr/img/jeux/1669999835/300/bn/39436.png'),(7,'Dominion - L\'Arrière-Pays ','2-4','30-30',0,2012,'français','https://www.myludo.fr/img/jeux/1589443817/300/bn/39307.png'),(8,'Les Héros de l\'Œil noir ','2-5','90-90',1,1992,'français','https://www.myludo.fr/img/jeux/1567026346/300/am/12950.png'),(9,'Western Legends ','2-6','90-90',1,2018,'français','https://www.myludo.fr/img/jeux/1658843873/300/au/20268.png'),(10,'Andor - Les Légendes Oubliées : Âges Sombres','2-4','60-90',0,2022,'français','https://www.myludo.fr/img/jeux/1646708292/jpg/cd/55744.jpg'),(11,' BattleCON : Trials of Indines','2-4','45-45',1,2016,'english','https://www.myludo.fr/img/jeux/1527345400/300/at/19579.png'),(12,'BattleCON : War Of Indines Remastered ','2-4','45-45',1,2014,'english','https://www.myludo.fr/img/jeux/1654607154/300/au/20650.png'),(13,'BattleCON : Wanderers Of Indines ','2-4','45-45',1,2018,'english','https://www.myludo.fr/img/jeux/1538030743/300/ba/26694.png'),(14,' Galaxy Defenders - 5th Column','1-5','120-120',0,2015,'english','https://www.myludo.fr/img/jeux/1650186503/jpg/cc/54780.jpg'),(15,'Andor - Le Coffret Bonus','1-4','90-90',0,2018,'français','https://www.myludo.fr/img/jeux/1658845739/300/ba/26067.png'),(16,'Galaxy Defenders: Operation Strikeback','1-5','120-120',0,2015,'english','https://www.myludo.fr/img/jeux/1591214200/300/bn/39700.png'),(17,'Galaxy Defenders : Extinction Protocol','1-5','120-120',0,2015,'english','https://www.myludo.fr/img/jeux/1627763312/jpg/bz/51048.jpg'),(18,'Galaxy Defenders','1-5','120-120',1,2013,'english','https://www.myludo.fr/img/jeux/1591214082/300/ab/1977.png'),(19,'Circus Maximus','2-8','120-240',1,1980,'english','https://www.myludo.fr/img/jeux/1501849849/300/aq/16423.png'),(20,'Andor - Le Dernier Espoir','2-4','90-90',1,2017,'français','https://www.myludo.fr/img/jeux/1610381282/300/at/19665.png'),(21,'Andor - Voyage vers le Nord','2-4','60-60',0,2014,'français','https://www.myludo.fr/img/jeux/1610381643/300/ab/1434.png'),(22,'Andor - Les Légendes Oubliées : Esprits Ancestraux','2-4','60-90',0,2019,'français','https://www.myludo.fr/img/jeux/1646708559/jpg/bg/32621.jpg'),(23,'D100 Dungeon','1-1','5-90',1,2017,'english','https://www.myludo.fr/img/jeux/1692987378/jpg/bg/32174.jpg'),(24,'BattleCON - Devastation of Indines','1-5','45-45',1,2013,'english','https://www.myludo.fr/img/jeux/1675423550/300/au/20651.png'),(25,'The Castles of Burgundy','1-4','70-120',1,2019,'français','https://www.myludo.fr/img/jeux/1694524634/jpg/bi/34220.jpg'),(26,'Shadows of Malice','1-8','120-120',1,2014,'english','https://www.myludo.fr/img/jeux/1620654583/300/aw/22362.png'),(27,'Space Hulk - Death Angel','1-6','50-50',1,2010,'english','https://www.myludo.fr/img/jeux/1674510740/jpg/ag/6269.jpg'),(28,' Comancheria','1-1','240-240',1,2016,'english','https://www.myludo.fr/img/jeux/1655222420/300/aw/22749.png'),(29,'Star Realms - Crisis - Flottes et Bastions','2-6','30-60',0,2016,'français','https://www.myludo.fr/img/jeux/1676979544/300/aa/514.png'),(30,'tar Realms - Crisis - Bases et Vaisseaux','2-6','30-60',0,2016,'français','https://www.myludo.fr/img/jeux/1676979563/300/aa/513.png'),(31,'Star Realms - Gambit Set','2-6','30-60',0,2017,'français','https://www.myludo.fr/img/jeux/1674564661/300/aa/253.png'),(32,'Star Realms - United Commandement','2-6','30-60',0,2016,'français','https://www.myludo.fr/img/jeux/1674649699/300/ax/23584.png'),(33,'Star Realms - United - Assault','2-6','30-60',0,2016,'français','https://www.myludo.fr/img/jeux/1676979602/300/ba/26151.png'),(34,' Star Realms - Scenarios','2-6','30-60',0,2019,'français','https://www.myludo.fr/img/jeux/1572379886/300/bj/35644.png'),(35,'Star Realms','2-2','30-60',1,2016,'français','https://www.myludo.fr/img/jeux/1687864084/300/aa/860.png'),(36,'Star Realms - Colony Wars','2-2','30-60',1,2017,'français','https://www.myludo.fr/img/jeux/1681674583/300/aa/107.png'),(37,'Space Empires: Close Encounters','1-4','180-180',0,2012,'english','https://www.myludo.fr/img/jeux/1554475090/300/ab/1742.png'),(38,'Space Empires: Replicators','1-4','180-180',0,2018,'français','https://www.myludo.fr/img/jeux/1554475159/300/bf/31171.png'),(39,'Space Empires: 4X','1-4','180-180',1,2011,'english','https://www.myludo.fr/img/jeux/1554475212/300/af/5311.png'),(40,'Dominion','2-4','45-45',1,2013,'français','https://www.myludo.fr/img/jeux/1617039468/300/ab/1939.png'),(41,'Burger Quiz Deluxe','2-10','30-60',1,2002,'français','https://www.myludo.fr/img/jeux/1594489186/300/am/12177.png'),(42,'Timeline V - Musique et Cinéma','2-8','30-30',1,2013,'français','https://www.myludo.fr/img/jeux/1650391994/300/ac/2299.png'),(43,'Le monde est fou','4-4','40-40',1,2014,'français','https://www.myludo.fr/img/jeux/1611311871/300/ab/1830.png'),(44,'Imagine','3-8','30-30',1,2016,'français','https://www.myludo.fr/img/jeux/1650913493/300/aa/630.png'),(45,'Codenames','2-8','15-15',1,2016,'français','https://www.myludo.fr/img/jeux/1662718808/300/aa/629.png'),(46,'Citadelles','2-8','60-60',1,2010,'français','https://www.myludo.fr/img/jeux/1688313307/jpg/af/5411.jpg'),(47,'Shadow Hunters - Extension Personnages','4-8','30-30',0,2012,'français','https://www.myludo.fr/img/jeux/1673527993/300/ad/3208.png'),(48,'Anima - L\'Ombre d\'Omega','2-5','80-80',1,2006,'français','https://www.myludo.fr/img/jeux/1654090548/300/al/11983.png'),(49,'Anima - Au-delà du Bien et du Mal','2-5','80-80',1,2008,'français','https://www.myludo.fr/img/jeux/1654090472/300/ai/8681.png'),(50,'Anima - Le Crépuscule des Dieux','2-5','80-80',1,2010,'français','https://www.myludo.fr/img/jeux/1654090575/300/ah/7170.png'),(51,'Convoi','2-2','30-30',1,2012,'français','https://www.myludo.fr/img/jeux/1565865148/300/ad/3527.png'),(52,'BattleLore Seconde Édition','2-2','90-90',1,2014,'français','https://www.myludo.fr/img/jeux/1671300763/300/as/18635.png'),(53,'Battlelore Seconde édition - Les Gardiens d\'Hernfar','2-2','60-60',0,2015,'français','https://www.myludo.fr/img/jeux/1659639742/300/at/19181.png'),(54,'BattleLore Seconde Édition - La Horde de Scorne','2-2','60-60',0,2015,'français','https://www.myludo.fr/img/jeux/1659639708/300/at/19182.png'),(55,'Battlelore Seconde édition - Géant des Montagnes','2-2','90-90',0,2015,'français','https://www.myludo.fr/img/jeux/1659643699/300/at/19383.png'),(56,'Battlelore Seconde édition - Hérauts de Briseffroi','2-2','60-60',0,2015,'français','https://www.myludo.fr/img/jeux/1659639815/300/ab/1327.png'),(57,'Battlelore Seconde édition - Terreurs des brumes','2-2','90-90',0,2016,'français','https://www.myludo.fr/img/jeux/1659639783/300/at/19386.png'),(58,'Battlelore Seconde édition - Ailes-Rasoir','2-2','90-90',0,2016,'français','https://www.myludo.fr/img/jeux/1659643761/300/at/19385.png'),(59,'Battlelore Seconde édition - Grand Dragon','2-2','90-90',0,2016,'français','https://www.myludo.fr/img/jeux/1659643727/300/at/19384.png'),(60,' Million Club','2-6','45-45',1,2016,'français','https://www.myludo.fr/img/jeux/1615500401/300/aa/567.png'),(61,'Meeple War','2-4','60-60',1,2016,'français','https://www.myludo.fr/img/jeux/1593961948/300/aa/801.png'),(62,'Andor - La Légende de Gardétoile','2-4','75-75',0,2014,'français','https://www.myludo.fr/img/jeux/1610391737/300/ab/1683.png'),(63,'Andor - Nouveaux Héros','2-6','60-60',0,2015,'français','https://www.myludo.fr/img/jeux/1683615463/300/ab/1263.png'),(64,'7 Wonders Duel','2-2','30-30',1,2015,'français','https://www.myludo.fr/img/jeux/1686408094/jpg/ab/1005.jpg'),(65,'Andor','2-4','60-60',1,2012,'français','https://www.myludo.fr/img/jeux/1667719791/300/ac/2303.png'),(66,'Scotland Yard','3-6','45-45',1,1996,'français','https://www.myludo.fr/img/jeux/1616692425/300/ar/17952.png'),(67,' The Convicted','1-5','90-90',1,2014,'english','https://www.myludo.fr/img/jeux/1599801121/300/ax/23277.png'),(68,'Wanted! - Dead or Alive','3-8','30-30',1,2004,'français','https://www.myludo.fr/img/jeux/1595232602/300/ao/14650.png'),(69,'Shadow Hunters','4-8','60-60',1,2009,'français','https://www.myludo.fr/img/jeux/1659695762/300/ah/7749.png'),(70,'Charterstone','1-6','60-60',1,2017,'français','https://www.myludo.fr/img/jeux/1638606416/300/aw/22173.png'),(71,'Scythe','1-5','115-115',1,2017,'français','https://www.myludo.fr/img/jeux/1694706661/jpg/aa/147.jpg');

INSERT INTO `editor`
(id,name)
VALUES
(1,'Die-Hard Games'),(2,'Z-Man Games'),(3,'Wizkids'),(4,'Intrafin Games'),(5,'Matagot'),(6,'Gigamic'),(7,'Compass Games'),(8,'Ystari Games'),(9,'Schmidt'),(10,'Kolossal Games'),(11,'Iello'),(12,'Kosmos'),(13,'Level 99 Games'),(14,'Ares Games'),(15,'Gremlin Project'),(16,'Avalon Hill'),(17,'Battleline'),(18,'Alea'),(19,'Ravensburger'),(20,'Devious Weasel Games'),(21,'Edge Entertainment'),(22,'Gmt Games'),(23,'White Wizard Games'),(24,'Lansay'),(25,'Asmodee'),(26,'Le Scorpion Masqué'),(27,'Cocktail Games'),(28,'Moonster Games'),(29,'Czech Games Edition'),(30,'Portal Games'),(31,'Playad Games'),(32,'Blue Cocker'),(33,'Repos Production'),(34,'Officina Monstrorum'),(35,'Tilsit'),(36,'Republic of Games'),(37,'Stonemaier Games');

INSERT INTO `creator`
(id,firstname,lastname)
VALUES
(1,'Ross','Mortell'),(2,'David','Thompson'),(3,'Trevor','Benjamin'),(4,'Christian','Marcussen'),(5,'Vlaada','Chvátil'),(6,'Chris','Raimo'),(7,'Helmut','Ohley'),(8,'Leonhard','Orgler'),(9,'Herschel','Hoffmayer'),(10,'Donald X.','Vaccarino'),(11,'Roger','Ford'),(12,'Hervé','Lemaître'),(13,'Michael','Menzel'),(14,'Andreas','Kälber'),(15,'Christoph','Kling'),(16,'D. Brad','Talton Jr.'),(17,'Nunzio','Surace'),(18,'Simone','Romano'),(19,'Michael','Matheny'),(20,'Stefan','Feld'),(21,'Martin','Knight'),(22,'Jim','Felli'),(23,'Corey','Konieczka'),(24,'Joel','Toppen'),(25,'Darwin','Kastle'),(26,'Robert','Dougherty'),(27,'Jim','Krohn'),(28,'Alain','Chabat'),(29,'Frédéric','Henry'),(30,'Chris','James'),(31,'Hiromi','Oikawa'),(32,'Motoyuki','Ohki'),(33,'Shingo','Fujita'),(34,'Bruno','Faidutti'),(35,'Yasutaka','Ikeda'),(36,'Carlos B.','Garcia'),(37,'Ignacy','Trzewiczek'),(38,'Richard','Borg'),(39,'Arnaud','Ladagnous'),(40,'Max','Valembois'),(41,'Antoine','Bauza'),(42,'Bruno','Cathala'),(43,'Groupe','Projet Iii'),(44,'Mateusz','Albricht'),(45,'Emiliano','Sciarra'),(46,'Jamey','Stegmaier');

INSERT INTO `edited_by`
(boardgame_id,editor_id)
VALUES
(1,1),(6,1),(2,2),(3,3),(3,4),(4,5),(5,6),(6,7),(7,8),(8,9),(9,10),(9,5),(10,11),(10,12),(11,13),(12,13),(13,13),(14,15),(14,14),(15,12),(15,11),(16,14),(16,15),(17,15),(17,14),(18,14),(18,15),(19,16),(19,17),(20,11),(21,11),(21,12),(22,12),(22,14),(24,13),(25,18),(25,19),(26,20),(27,21),(28,22),(29,11),(29,23),(30,11),(30,23),(31,11),(31,23),(32,11),(32,23),(33,11),(33,23),(34,11),(34,23),(35,11),(35,23),(36,11),(36,23),(37,22),(38,22),(39,22),(40,8),(41,24),(42,25),(43,26),(44,27),(44,28),(45,11),(45,29),(46,21),(47,5),(48,21),(49,21),(50,21),(51,30),(51,11),(53,21),(54,21),(55,21),(56,25),(56,21),(57,21),(58,21),(59,21),(60,31),(61,32),(62,11),(63,11),(64,33),(65,12),(65,11),(66,19),(67,34),(68,35),(69,36),(69,5),(70,5),(70,37),(71,5),(71,37);

INSERT INTO `created_by`
(boardgame_id,creator_id)
VALUES
(1,9),(2,8),(2,7),(3,6),(3,5),(4,4),(5,2),(5,3),(6,1),(7,10),(8,11),(9,12),(10,14),(10,15),(10,13),(11,16),(12,16),(13,16),(14,17),(14,18),(15,13),(16,17),(16,18),(17,17),(17,18),(18,17),(18,18),(19,19),(20,13),(21,13),(22,13),(23,21),(24,16),(25,20),(26,22),(27,23),(28,24),(29,25),(29,26),(30,25),(30,26),(31,11),(31,25),(32,25),(32,26),(33,26),(33,25),(34,25),(34,26),(35,25),(35,26),(36,25),(36,26),(37,27),(38,27),(39,27),(40,10),(41,28),(42,29),(43,30),(44,31),(44,32),(44,33),(45,5),(46,34),(47,35),(48,36),(49,36),(50,36),(51,37),(53,38),(54,38),(55,38),(56,38),(57,38),(58,38),(59,38),(60,39),(61,40),(62,13),(63,13),(64,41),(64,42),(65,13),(66,43),(67,44),(68,45),(69,35),(70,46),(71,46);

INSERT INTO `owned_by`
(user_id,boardgame_id,favorite)
VALUES
(2,1,0),(2,12,1),(2,32,0),(2,41,1),(2,15,1),(2,60,0),(3,19,0),(3,12,1),(3,1,1),(4,57,0),(4,18,0),(4,48,1),(5,13,1),(5,70,0),(5,2,1),(6,4,0),(6,5,0),(6,6,1);