-- MySQL dump 10.13  Distrib 5.5.53, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: yuiapp
-- ------------------------------------------------------
-- Server version	5.5.53-0ubuntu0.14.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `pass`
--

DROP TABLE IF EXISTS `pass`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pass` (
  `pass_id` int(11) NOT NULL AUTO_INCREMENT,
  `AOS` datetime DEFAULT NULL,
  `LOS` datetime DEFAULT NULL,
  `El` double DEFAULT NULL,
  `AzAOS` double DEFAULT NULL,
  `AzLOS` double DEFAULT NULL,
  `memo` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`pass_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pass`
--

LOCK TABLES `pass` WRITE;
/*!40000 ALTER TABLE `pass` DISABLE KEYS */;
INSERT INTO `pass` VALUES (1,'2015-08-27 08:07:00','2015-08-27 08:17:00',4.3,54.2,115.6,'this is a test pass'),(2,'0000-00-00 00:00:00','0000-00-00 00:00:00',0,0,0,''),(3,'0000-00-00 00:00:00','0000-00-00 00:00:00',0,0,0,'nfenoev'),(4,'0000-00-00 00:00:00','0000-00-00 00:00:00',0,0,0,'nfenoev'),(5,'0000-00-00 00:00:00','0000-00-00 00:00:00',0,0,0,'nfenoev'),(6,'0000-00-00 00:00:00','0000-00-00 00:00:00',0,0,0,'test');
/*!40000 ALTER TABLE `pass` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reports`
--

DROP TABLE IF EXISTS `reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reports` (
  `report_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `longitude` double(9,6) DEFAULT NULL,
  `latitude` double(9,6) DEFAULT NULL,
  `data` varchar(1024) DEFAULT NULL,
  `mail_address` varchar(1024) DEFAULT NULL,
  `rst` int(11) DEFAULT NULL,
  `antenna` varchar(1024) DEFAULT NULL,
  `receiver` varchar(1024) DEFAULT NULL,
  `comment` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`report_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reports`
--

LOCK TABLES `reports` WRITE;
/*!40000 ALTER TABLE `reports` DISABLE KEYS */;
INSERT INTO `reports` VALUES (1,'2016-10-30 08:18:25',135.000000,38.000000,'hogehoge','dai0531m@gmail.com',NULL,NULL,NULL,NULL),(2,'2016-10-30 08:21:15',136.000000,38.000000,'fugafuga','dai0531m@gmail.com',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `reports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test`
--

DROP TABLE IF EXISTS `test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test` (
  `pass_id` int(11) DEFAULT NULL,
  `AOS` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test`
--

LOCK TABLES `test` WRITE;
/*!40000 ALTER TABLE `test` DISABLE KEYS */;
/*!40000 ALTER TABLE `test` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `password` text NOT NULL,
  `mail` text,
  `belongings` text,
  `birthplace` text,
  `etc` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (3,'hogehoge','5fc56c77c17f2134d7d1ad2ac737efed0aa6c92dfffcf0dd8cd81faba048d406','fuga@piyo.com','piyo','piyo','hogefuga'),(4,'test','b95676cc2b9b8d224bfdd4560d3509f17f4c02dd89c577a7575eab2aa109949f','fuga@piyo.com','piyo','piyo','hogefuga'),(5,'test','42baa0b24efd09931659e8b40c8eed74d95c8574ff8cacdd057d899f49cd92a2','fuga@piyo.com','piyo','piyo','hogefuga'),(6,'testuser','a4b8114a5e3cfaad5e0ccb36ddf1de975f5e501c1ab53448a35815391c482f2f','fuga@piyo.com','piyo','piyo','hogefuga'),(7,'testuser2','c0fa2ca8f9773949b08871b5ab688ed3e46da9fc93d26663776181c658cf68b3','fuga@piyo.com','piyo','piyo','hogefuga'),(8,'daiz','23dd0e313d2c9e6f8756f90625affaf363bd7db978b8ad7b826e038cb84175b0','daiz@fuga.com','hoge','hoge','hoge'),(9,'iamtest','7847b957c989948c1e659589542418aa705f818e42b718d5833ff110e3639580','test@hoge.com','fuga','fuga','fuga'),(10,'JE6HBC','2a075e597aa07218c4048026d16d24ac9f576684996b994f089a7ae9ae30b938','je6hbc@d-io.com','???','Kagoshima','???????????'),(11,'daiz','23dd0e313d2c9e6f8756f90625affaf363bd7db978b8ad7b826e038cb84175b0','daiz@daiz.com','hoge','hoge','fuga'),(12,'testuser','5032be6667ebb26847529bb38d9bea69d07a024a24029059a4a2b88dc1f3eda8','testuser@hoge.com','fuga','fuga','fuga'),(13,'testuser','7cbfb09dc29f7fb52ab768ba8997c94331515cbf1a5a4d1bfa11bf6b88e6d525','testuser@hoge.com','fuga','fuga','fuga'),(14,'je6hbc','f5c073ae4eb7690e5e1db7f506a8e1cc8b1ebee03d5942be0e6017b106155de7','je6hbc@d-io.com','MAST','Kagoshima','hello');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-10-30 17:30:28
