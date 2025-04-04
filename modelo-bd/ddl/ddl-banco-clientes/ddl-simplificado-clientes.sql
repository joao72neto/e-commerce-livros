-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema e_commerce_books
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `e_commerce_books` DEFAULT CHARACTER SET utf8;
USE `e_commerce_books`;

-- -----------------------------------------------------
-- Table `e_commerce_books`.`clientes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `e_commerce_books`.`clientes` (
  `clt_id` INT NOT NULL AUTO_INCREMENT,
  `clt_nome` VARCHAR(45) NOT NULL,
  `clt_genero` CHAR(1) NOT NULL,
  `clt_dataNasc` DATE NOT NULL,
  `clt_cpf` CHAR(11) NOT NULL,
  `clt_telefone` CHAR(13) NOT NULL,
  `clt_email` VARCHAR(45) NOT NULL,
  `clt_senha` VARCHAR(45) NOT NULL,
  `clt_ranking` SMALLINT UNSIGNED NOT NULL,
  `clt_status` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`clt_id`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `e_commerce_books`.`enderecos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `e_commerce_books`.`enderecos` (
  `end_id` INT NOT NULL AUTO_INCREMENT,
  `end_clt_id` INT NOT NULL,
  `end_nome` VARCHAR(45) NOT NULL,
  `end_tipoResidencia` VARCHAR(45) NOT NULL,
  `end_tipoLogradouro` VARCHAR(45) NOT NULL,
  `end_logradouro` VARCHAR(45) NOT NULL,
  `end_numero` SMALLINT UNSIGNED NOT NULL,
  `end_bairro` VARCHAR(45) NOT NULL,
  `end_cep` CHAR(8) NOT NULL,
  `end_cidade` VARCHAR(45) NOT NULL,
  `end_estado` VARCHAR(45) NOT NULL,
  `end_pais` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`end_id`),
  CONSTRAINT `fk_end_clt`
    FOREIGN KEY (`end_clt_id`)
    REFERENCES `e_commerce_books`.`clientes` (`clt_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `e_commerce_books`.`cartoes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `e_commerce_books`.`cartoes` (
  `car_id` INT NOT NULL AUTO_INCREMENT,
  `car_clt_id` INT NOT NULL,
  `car_nome` VARCHAR(45) NOT NULL,
  `car_numero` VARCHAR(20) NOT NULL,
  `car_bandeira` VARCHAR(45) NOT NULL,
  `car_cvv` VARCHAR(4) NOT NULL,
  `car_principal` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`car_id`),
  CONSTRAINT `fk_car_clt`
    FOREIGN KEY (`car_clt_id`)
    REFERENCES `e_commerce_books`.`clientes` (`clt_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `e_commerce_books`.`transacoes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `e_commerce_books`.`transacoes` (
  `trs_id` INT NOT NULL AUTO_INCREMENT,
  `trs_clt_id` INT NOT NULL,
  `trs_dataHora` DATETIME NOT NULL,
  `trs_tipo` VARCHAR(45) NOT NULL,
  `trs_status` ENUM('confirmado', 'pendente') NOT NULL,
  `trs_acao` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`trs_id`),
  CONSTRAINT `fk_trs_clt`
    FOREIGN KEY (`trs_clt_id`)
    REFERENCES `e_commerce_books`.`clientes` (`clt_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `e_commerce_books`.`log`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `e_commerce_books`.`log` (
  `log_id` INT NOT NULL AUTO_INCREMENT,
  `log_clt_id` INT NOT NULL,
  `log_dataHora` DATETIME NOT NULL,
  `log_usuario` VARCHAR(45) NOT NULL,
  `log_operacao` ENUM('insercao', 'escrita') NOT NULL,
  PRIMARY KEY (`log_id`),
  CONSTRAINT `fk_log_clt`
    FOREIGN KEY (`log_clt_id`)
    REFERENCES `e_commerce_books`.`clientes` (`clt_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;