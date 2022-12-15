CREATE DATABASE  IF NOT EXISTS `proppal` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `proppal`;
-- MySQL dump 10.13  Distrib 8.0.31, for macos12 (x86_64)
--
-- Host: 127.0.0.1    Database: proppal
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `incident`
--

DROP TABLE IF EXISTS `incident`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `incident` (
  `incidentId` int NOT NULL AUTO_INCREMENT,
  `eventDate` date NOT NULL,
  `propertyId` int NOT NULL,
  `desc` varchar(255) DEFAULT NULL,
  `officerName` varchar(255) DEFAULT NULL,
  `policeReportDate` date DEFAULT NULL,
  `policeReportId` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`incidentId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `incident`
--

LOCK TABLES `incident` WRITE;
/*!40000 ALTER TABLE `incident` DISABLE KEYS */;
INSERT INTO `incident` VALUES (1,'2022-10-10',100,'fight in common area','Snow White','2022-10-10','7894512'),(2,'2022-10-10',101,'cat in the tree','Teddy Roosevelt','2022-10-10','45621'),(3,'2023-09-09',102,'Tree fall down to the car',NULL,NULL,NULL);
/*!40000 ALTER TABLE `incident` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `maintenance`
--

DROP TABLE IF EXISTS `maintenance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `maintenance` (
  `event_id` int NOT NULL AUTO_INCREMENT,
  `mainDate` date NOT NULL,
  `description` varchar(255) NOT NULL,
  `charge` int NOT NULL,
  `contractorName` varchar(255) NOT NULL,
  `incidentId` int DEFAULT NULL,
  PRIMARY KEY (`event_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maintenance`
--

LOCK TABLES `maintenance` WRITE;
/*!40000 ALTER TABLE `maintenance` DISABLE KEYS */;
INSERT INTO `maintenance` VALUES (11,'2021-12-12','Plumbing for the restroom and kitchen',1200,'John Snow',1),(12,'2015-10-10','Roof cleaning',8000,'Handy Mandy ',2),(13,'2015-10-10','Roof cleaning',8000,'Handy Mandy ',3),(14,'2023-09-09','Gutter cleaning ',9000,'Snow White LLC',NULL);
/*!40000 ALTER TABLE `maintenance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manager`
--

DROP TABLE IF EXISTS `manager`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `manager` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manager`
--

LOCK TABLES `manager` WRITE;
/*!40000 ALTER TABLE `manager` DISABLE KEYS */;
/*!40000 ALTER TABLE `manager` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `paymentId` int NOT NULL AUTO_INCREMENT,
  `amount` int DEFAULT NULL,
  `receiptNum` varchar(45) NOT NULL,
  `propertyId` int DEFAULT NULL,
  `paymentDate` date DEFAULT NULL,
  PRIMARY KEY (`paymentId`)
) ENGINE=InnoDB AUTO_INCREMENT=1004 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (1000,3000,'2552',104,'2022-11-11'),(1001,8500,'124578',NULL,'2010-10-21'),(1002,8500,'2023-12-23',NULL,'2023-12-23'),(1003,2589,'45698',NULL,'2023-09-09');
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `property`
--

DROP TABLE IF EXISTS `property`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `property` (
  `propertyId` int NOT NULL AUTO_INCREMENT,
  `apartmentNum` int NOT NULL,
  `address` varchar(255) NOT NULL,
  `bedrooms` int NOT NULL,
  `sqFeet` int NOT NULL,
  `rent` int NOT NULL,
  `leaseStart` date DEFAULT NULL,
  `leaseEnd` date DEFAULT NULL,
  `damage` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`propertyId`)
) ENGINE=InnoDB AUTO_INCREMENT=134 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `property`
--

LOCK TABLES `property` WRITE;
/*!40000 ALTER TABLE `property` DISABLE KEYS */;
INSERT INTO `property` VALUES (100,101,'123 King street',2,2000,2000,NULL,NULL,NULL),(104,506,'45 Spring street',3,1500,3000,NULL,NULL,NULL),(110,555,'34 Madison street',3,500,1500,'2009-09-22','2009-09-23','carpet spots'),(112,567,'Westlake ave NE ',1,2500,2500,'2020-11-11','2020-12-12',NULL),(114,888,'45 Stevens drive',3,2500,25200,'2010-10-21','2010-10-22',NULL),(115,999,'543 Lake Street',3,9000,10000,'2010-11-23','2010-11-24',NULL),(117,852,'999 Costco way NE',3,1800,6000,'2025-09-09','2026-09-09',NULL),(119,752,'lake drive',3,1800,18000,'2021-09-09','2023-09-09',NULL),(128,990,'56 Lake Drive',6,5000,45500,'2022-09-09','2023-09-09',NULL),(129,1011,'67 Drive SE ',9,9000,18000,'2023-09-09','2024-09-09',NULL),(132,852,'999 Costco way NE',3,1800,6000,'2025-09-09','2026-09-09',NULL),(133,856,'67 Lake Street',3,2500,25800,'2020-09-08','2025-09-08',NULL);
/*!40000 ALTER TABLE `property` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resident`
--

DROP TABLE IF EXISTS `resident`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resident` (
  `residentId` int NOT NULL AUTO_INCREMENT,
  `first` varchar(45) DEFAULT NULL,
  `last` varchar(45) DEFAULT NULL,
  `ssn` int DEFAULT NULL,
  `phone` bigint DEFAULT NULL,
  `credit` int DEFAULT NULL,
  `prevAdress` varchar(255) DEFAULT NULL,
  `employerContact` varchar(255) DEFAULT NULL,
  `emergencyContact` varchar(255) DEFAULT NULL,
  `income` int DEFAULT NULL,
  `propertyId` int DEFAULT NULL,
  PRIMARY KEY (`residentId`),
  KEY `propertyId_idx` (`residentId`,`first`,`last`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resident`
--

LOCK TABLES `resident` WRITE;
/*!40000 ALTER TABLE `resident` DISABLE KEYS */;
INSERT INTO `resident` VALUES (2,'Teddy','Roosevelt',789456123,4258962525,720,'220 Lake Street NE ','Chase bank in Seattle ','898565546',100000,110),(3,'Beyonce','Jay-Z',78945126,2064875263,850,'98 Union street','Boeing company in Everett','mother, 2064956778',90000,112),(4,'Brad','Pitt',45623658,2587984612,890,'900 Hollywood drive ','James Cameron LLC','A.Jolie 9086785645',180000,117);
/*!40000 ALTER TABLE `resident` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-15 14:16:08
