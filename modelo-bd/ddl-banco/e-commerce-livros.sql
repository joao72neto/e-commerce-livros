-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema e_commerce_books
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema e_commerce_books
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `e_commerce_books` DEFAULT CHARACTER SET utf8 ;
USE `e_commerce_books` ;

-- -----------------------------------------------------
-- Table `e_commerce_books`.`Clientes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `e_commerce_books`.`Clientes` (
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
  PRIMARY KEY (`clt_id`),
  UNIQUE INDEX `clt_email_uk` (`clt_email` ASC) VISIBLE,
  UNIQUE INDEX `clt_cpf_uk` (`clt_cpf` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `e_commerce_books`.`Enderecos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `e_commerce_books`.`Enderecos` (
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
  INDEX `fk_end_clt_idx` (`end_clt_id` ASC) VISIBLE,
  CONSTRAINT `fk_end_clt`
    FOREIGN KEY (`end_clt_id`)
    REFERENCES `e_commerce_books`.`Clientes` (`clt_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `e_commerce_books`.`GrupoPrecificacao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `e_commerce_books`.`GrupoPrecificacao` (
  `gpp_id` INT NOT NULL AUTO_INCREMENT,
  `gpp_nome` VARCHAR(45) NOT NULL,
  `gpp_margemLucro` DECIMAL(5,2) NOT NULL,
  PRIMARY KEY (`gpp_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `e_commerce_books`.`Autores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `e_commerce_books`.`Autores` (
  `aut_id` INT NOT NULL AUTO_INCREMENT,
  `aut_nome` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`aut_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `e_commerce_books`.`Editora`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `e_commerce_books`.`Editora` (
  `edt_id` INT NOT NULL AUTO_INCREMENT,
  `edt_nome` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`edt_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `e_commerce_books`.`Livros`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `e_commerce_books`.`Livros` (
  `lvr_id` INT NOT NULL AUTO_INCREMENT,
  `lvr_gpp_id` INT NOT NULL,
  `lvr_edt_id` INT NOT NULL,
  `lvr_aut_id` INT NOT NULL,
  `lvr_ano` YEAR NOT NULL,
  `lvr_titulo` VARCHAR(45) NOT NULL,
  `lvr_edicao` SMALLINT UNSIGNED NOT NULL,
  `lvr_isbn` VARCHAR(17) NOT NULL,
  `lvr_numPaginas` SMALLINT UNSIGNED NOT NULL,
  `lvr_sinopse` TEXT NOT NULL,
  `lvr_codigoBarras` VARCHAR(20) NOT NULL,
  `lvr_largura` DECIMAL(5,2) NOT NULL,
  `lvr_altura` DECIMAL(5,2) NOT NULL,
  `lvr_peso` DECIMAL(5,2) NOT NULL,
  `lvr_profundidade` DECIMAL(5,2) NOT NULL,
  `lvr_status` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`lvr_id`),
  INDEX `fk_lvr_gpp_idx` (`lvr_gpp_id` ASC) VISIBLE,
  INDEX `fk_lvr_aut_idx` (`lvr_aut_id` ASC) VISIBLE,
  INDEX `fk_lvr_edt_idx` (`lvr_edt_id` ASC) INVISIBLE,
  CONSTRAINT `fk_lvr_gpp`
    FOREIGN KEY (`lvr_gpp_id`)
    REFERENCES `e_commerce_books`.`GrupoPrecificacao` (`gpp_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_lvr_aut`
    FOREIGN KEY (`lvr_aut_id`)
    REFERENCES `e_commerce_books`.`Autores` (`aut_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_lvr_edt`
    FOREIGN KEY (`lvr_edt_id`)
    REFERENCES `e_commerce_books`.`Editora` (`edt_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `e_commerce_books`.`Categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `e_commerce_books`.`Categoria` (
  `cat_id` INT NOT NULL AUTO_INCREMENT,
  `cat_nome` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`cat_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `e_commerce_books`.`Cartoes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `e_commerce_books`.`Cartoes` (
  `car_id` INT NOT NULL AUTO_INCREMENT,
  `car_clt_id` INT NOT NULL,
  `car_nome` VARCHAR(45) NOT NULL,
  `car_numero` VARCHAR(20) NOT NULL,
  `car_bandeira` VARCHAR(45) NOT NULL,
  `car_cvv` VARCHAR(4) NOT NULL,
  `car_principal` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`car_id`),
  INDEX `fk_car_clt_idx` (`car_clt_id` ASC) VISIBLE,
  CONSTRAINT `fk_car_clt`
    FOREIGN KEY (`car_clt_id`)
    REFERENCES `e_commerce_books`.`Clientes` (`clt_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `e_commerce_books`.`Fornecedor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `e_commerce_books`.`Fornecedor` (
  `for_id` INT NOT NULL AUTO_INCREMENT,
  `for_nome` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`for_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `e_commerce_books`.`Estoque`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `e_commerce_books`.`Estoque` (
  `est_id` INT NOT NULL AUTO_INCREMENT,
  `est_for_id` INT NOT NULL,
  `est_lvr_id` INT NOT NULL,
  `est_qtd` INT NOT NULL,
  `est_data` DATE NOT NULL,
  `est_valorVenda` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`est_id`),
  INDEX `fk_est_for_idx` (`est_for_id` ASC) VISIBLE,
  INDEX `fk_est_lvr_idx` (`est_lvr_id` ASC) VISIBLE,
  CONSTRAINT `fk_est_for`
    FOREIGN KEY (`est_for_id`)
    REFERENCES `e_commerce_books`.`Fornecedor` (`for_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_est_lvr`
    FOREIGN KEY (`est_lvr_id`)
    REFERENCES `e_commerce_books`.`Livros` (`lvr_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `e_commerce_books`.`Vendas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `e_commerce_books`.`Vendas` (
  `vnd_id` INT NOT NULL AUTO_INCREMENT,
  `vnd_clt_id` INT NOT NULL,
  `vnd_lvr_id` INT NOT NULL,
  `vnd_data` DATE NOT NULL,
  `vnd_status` ENUM('em processamento', 'em transito', 'entregue', 'em troca', 'troca autorizada') NOT NULL,
  `vnd_valorTotal` DECIMAL(5,2) NOT NULL,
  `vnd_frete` DECIMAL(5,2) NULL,
  PRIMARY KEY (`vnd_id`),
  INDEX `fk_vnd_lvr_idx` (`vnd_lvr_id` ASC) VISIBLE,
  INDEX `fk_vnd_clt_idx` (`vnd_clt_id` ASC) VISIBLE,
  CONSTRAINT `fk_vnd_clt`
    FOREIGN KEY (`vnd_clt_id`)
    REFERENCES `e_commerce_books`.`Clientes` (`clt_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_vnd_lvr`
    FOREIGN KEY (`vnd_lvr_id`)
    REFERENCES `e_commerce_books`.`Livros` (`lvr_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `e_commerce_books`.`Carrinho`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `e_commerce_books`.`Carrinho` (
  `crr_id` INT NOT NULL AUTO_INCREMENT,
  `crr_clt_id` INT NOT NULL,
  `crr_lvr_id` INT NOT NULL,
  `crr_qtd` INT NULL,
  `crr_adicao` DATE NULL,
  `crr_status` ENUM('adicionado', 'removido', 'comprado') NULL DEFAULT 'adicionado',
  PRIMARY KEY (`crr_id`),
  INDEX `fk_crr_lvr_idx` (`crr_lvr_id` ASC) VISIBLE,
  INDEX `fk_crr_clt_idx` (`crr_clt_id` ASC) VISIBLE,
  CONSTRAINT `fk_crr_clt`
    FOREIGN KEY (`crr_clt_id`)
    REFERENCES `e_commerce_books`.`Clientes` (`clt_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_crr_lvr`
    FOREIGN KEY (`crr_lvr_id`)
    REFERENCES `e_commerce_books`.`Livros` (`lvr_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `e_commerce_books`.`Cupons`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `e_commerce_books`.`Cupons` (
  `cup_id` INT NOT NULL AUTO_INCREMENT,
  `cup_clt_id` INT NOT NULL,
  `cup_codigo` VARCHAR(45) NOT NULL,
  `cup_tipo` ENUM('troca', 'promocional') NOT NULL,
  `cup_valor` DECIMAL(10,2) NOT NULL,
  `cup_usado` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`cup_id`),
  INDEX `fk_cup_clt_idx` (`cup_clt_id` ASC) VISIBLE,
  CONSTRAINT `fk_cup_clt`
    FOREIGN KEY (`cup_clt_id`)
    REFERENCES `e_commerce_books`.`Clientes` (`clt_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `e_commerce_books`.`Trocas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `e_commerce_books`.`Trocas` (
  `trc_id` INT NOT NULL AUTO_INCREMENT,
  `trc_clt_id` INT NOT NULL,
  `trc_lvr_id` INT NOT NULL,
  `trc_status` ENUM('em troca', 'troca autorizada', 'finalizada') NULL,
  `trc_voltouEtoque` TINYINT(1) NULL,
  PRIMARY KEY (`trc_id`),
  INDEX `fk_trd_lvr_idx` (`trc_lvr_id` ASC) VISIBLE,
  INDEX `fk_trc_clt_idx` (`trc_clt_id` ASC) VISIBLE,
  CONSTRAINT `fk_trc_clt`
    FOREIGN KEY (`trc_clt_id`)
    REFERENCES `e_commerce_books`.`Clientes` (`clt_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_trc_lvr`
    FOREIGN KEY (`trc_lvr_id`)
    REFERENCES `e_commerce_books`.`Livros` (`lvr_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `e_commerce_books`.`Pagamento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `e_commerce_books`.`Pagamento` (
  `pag_id` INT NOT NULL AUTO_INCREMENT,
  `pag_vnd_id` INT NOT NULL,
  `pag_metodo` ENUM('cartao_credito', 'cupom_troca', 'cupom_promocional') NOT NULL,
  `pag_valorPago` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`pag_id`),
  INDEX `fk_pag_vnd_idx` (`pag_vnd_id` ASC) VISIBLE,
  CONSTRAINT `fk_pag_vnd`
    FOREIGN KEY (`pag_vnd_id`)
    REFERENCES `e_commerce_books`.`Vendas` (`vnd_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `e_commerce_books`.`Transacoes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `e_commerce_books`.`Transacoes` (
  `trs_id` INT NOT NULL AUTO_INCREMENT,
  `trs_clt_id` INT NOT NULL,
  `trs_dataHora` DATETIME NOT NULL,
  `trs_tipo` VARCHAR(45) NOT NULL,
  `trs_status` ENUM('confirmado', 'pendente') NOT NULL,
  PRIMARY KEY (`trs_id`),
  INDEX `fk_trc_clt_idx` (`trs_clt_id` ASC) VISIBLE,
  CONSTRAINT `fk_trs_clt`
    FOREIGN KEY (`trs_clt_id`)
    REFERENCES `e_commerce_books`.`Clientes` (`clt_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `e_commerce_books`.`HistoricoVendas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `e_commerce_books`.`HistoricoVendas` (
  `hvd_id` INT NOT NULL AUTO_INCREMENT,
  `hvd_lvr_id` INT NOT NULL,
  `hvd_qtd` INT NOT NULL,
  `hvd_data` DATE NOT NULL,
  `hvd_totalVendido` INT NOT NULL,
  PRIMARY KEY (`hvd_id`),
  INDEX `fk_hvd_lvr_idx` (`hvd_lvr_id` ASC) VISIBLE,
  CONSTRAINT `fk_hvd_lvr`
    FOREIGN KEY (`hvd_lvr_id`)
    REFERENCES `e_commerce_books`.`Livros` (`lvr_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `e_commerce_books`.`Log`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `e_commerce_books`.`Log` (
  `log_id` INT NOT NULL AUTO_INCREMENT,
  `log_clt_id` INT NOT NULL,
  `log_dataHora` DATETIME NOT NULL,
  `log_usuario` VARCHAR(45) NOT NULL,
  `log_operacao` ENUM('insercao', 'escrita') NOT NULL,
  PRIMARY KEY (`log_id`),
  INDEX `fk_log_clt_idx` (`log_clt_id` ASC) VISIBLE,
  CONSTRAINT `fk_log_clt`
    FOREIGN KEY (`log_clt_id`)
    REFERENCES `e_commerce_books`.`Clientes` (`clt_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `e_commerce_books`.`livrosCategorias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `e_commerce_books`.`livrosCategorias` (
  `lvc_id` INT NOT NULL AUTO_INCREMENT,
  `lvc_lvr_id` INT NOT NULL,
  `lvc_cat_id` INT NOT NULL,
  PRIMARY KEY (`lvc_id`),
  INDEX `fk_lvc_cat_idx` (`lvc_cat_id` ASC) VISIBLE,
  INDEX `fk_lvc_lvr_idx` (`lvc_lvr_id` ASC) VISIBLE,
  CONSTRAINT `fk_lvc_lvr`
    FOREIGN KEY (`lvc_lvr_id`)
    REFERENCES `e_commerce_books`.`Livros` (`lvr_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_lvc_cat`
    FOREIGN KEY (`lvc_cat_id`)
    REFERENCES `e_commerce_books`.`Categoria` (`cat_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
