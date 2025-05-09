-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema e_commerce_books
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Table `clientes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clientes` (
  `clt_id` INT NOT NULL AUTO_INCREMENT,
  `clt_nome` VARCHAR(45) NOT NULL,
  `clt_genero` CHAR(1) NOT NULL,
  `clt_dataNasc` DATE NOT NULL,
  `clt_cpf` VARCHAR(14) NOT NULL,
  `clt_telefone` VARCHAR(20) NOT NULL,
  `clt_email` VARCHAR(45) NOT NULL,
  `clt_senha` VARCHAR(255) NOT NULL,
  `clt_ranking` SMALLINT UNSIGNED NOT NULL,
  `clt_status` TINYINT(1) NOT NULL DEFAULT 1,
  `clt_logado` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`clt_id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `enderecos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `enderecos` (
  `end_id` INT NOT NULL AUTO_INCREMENT,
  `end_clt_id` INT NOT NULL,
  `end_nome` VARCHAR(45) NOT NULL,
  `end_tipoResidencia` VARCHAR(45) NOT NULL,
  `end_tipoLogradouro` VARCHAR(45) NOT NULL,
  `end_logradouro` VARCHAR(45) NOT NULL,
  `end_numero` SMALLINT UNSIGNED NOT NULL,
  `end_bairro` VARCHAR(45) NOT NULL,
  `end_cep` VARCHAR(20) NOT NULL,
  `end_cidade` VARCHAR(45) NOT NULL,
  `end_estado` VARCHAR(45) NOT NULL,
  `end_pais` VARCHAR(45) NOT NULL,
  `end_status` TINYINT(1) NULL DEFAULT 0,
  PRIMARY KEY (`end_id`),
  CONSTRAINT `fk_end_clt`
    FOREIGN KEY (`end_clt_id`)
    REFERENCES `clientes` (`clt_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `autores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `autores` (
  `aut_id` INT NOT NULL AUTO_INCREMENT,
  `aut_nome` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`aut_id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `editora`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `editora` (
  `edt_id` INT NOT NULL AUTO_INCREMENT,
  `edt_nome` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`edt_id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `livros`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `livros` (
  `lvr_id` INT NOT NULL AUTO_INCREMENT,
  `lvr_edt_id` INT NOT NULL,
  `lvr_aut_id` INT NOT NULL,
  `lvr_ano` SMALLINT NOT NULL,
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
  `lvr_capa` VARCHAR(255) NULL,
  `lvr_preco` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`lvr_id`),
  CONSTRAINT `fk_lvr_aut`
    FOREIGN KEY (`lvr_aut_id`)
    REFERENCES `autores` (`aut_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_lvr_edt`
    FOREIGN KEY (`lvr_edt_id`)
    REFERENCES `editora` (`edt_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `grupo_precificacao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `grupo_precificacao` (
  `gpp_id` INT NOT NULL AUTO_INCREMENT,
  `gpp_nome` VARCHAR(45) NOT NULL,
  `gpp_margemLucro` DECIMAL(5,2) NOT NULL,
  PRIMARY KEY (`gpp_id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `categoria` (
  `cat_id` INT NOT NULL AUTO_INCREMENT,
  `cat_nome` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`cat_id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `cartoes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cartoes` (
  `car_id` INT NOT NULL AUTO_INCREMENT,
  `car_clt_id` INT NOT NULL,
  `car_nome` VARCHAR(45) NOT NULL,
  `car_numero` VARCHAR(20) NOT NULL,
  `car_bandeira` VARCHAR(45) NOT NULL,
  `car_cvv` VARCHAR(4) NOT NULL,
  `car_principal` TINYINT(1) NOT NULL DEFAULT 0,
  `car_status` TINYINT(1) NOT NULL DEFAULT 0,
  `car_valorPag` DECIMAL(10,2) NULL,
  PRIMARY KEY (`car_id`),
  CONSTRAINT `fk_car_clt`
    FOREIGN KEY (`car_clt_id`)
    REFERENCES `clientes` (`clt_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `fornecedor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fornecedor` (
  `for_id` INT NOT NULL AUTO_INCREMENT,
  `for_nome` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`for_id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `estoque`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `estoque` (
  `est_id` INT NOT NULL AUTO_INCREMENT,
  `est_for_id` INT NOT NULL,
  `est_lvr_id` INT NOT NULL,
  `est_gpp_id` INT NOT NULL,
  `est_qtd` INT NOT NULL,
  `est_data` DATE NOT NULL,
  `est_valorCompra` DECIMAL(10,2) NOT NULL,
  `est_origem` VARCHAR(45) NOT NULL DEFAULT 'COMPRA',
  PRIMARY KEY (`est_id`),
  CONSTRAINT `fk_est_for`
    FOREIGN KEY (`est_for_id`)
    REFERENCES `fornecedor` (`for_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_est_lvr`
    FOREIGN KEY (`est_lvr_id`)
    REFERENCES `livros` (`lvr_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_est_gpp`
    FOREIGN KEY (`est_gpp_id`)
    REFERENCES `grupo_precificacao` (`gpp_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `vendas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vendas` (
  `vnd_id` INT NOT NULL AUTO_INCREMENT,
  `vnd_clt_id` INT NOT NULL,
  `vnd_lvr_id` INT NOT NULL,
  `vnd_numPedido` VARCHAR(255) NULL,
  `vnd_data` DATE NOT NULL,
  `vnd_status` ENUM('Em Processamento', 'Aprovado', 'Reprovado', 'Cancelado', 'Em Transporte', 'Entregue', 'Troca Solicitada', 'Troca Aceita', 'Troca Concluída', 'Troca Recusada', 'Devolução Solicitada', 'Devolução Aceita', 'Devolução Concluída', 'Devolução Recusada') NOT NULL DEFAULT 'em processamento',
  `vnd_valorTotal` DECIMAL(5,2) NOT NULL,
  `vnd_frete` DECIMAL(5,2) NULL,
  `vnd_qtd` SMALLINT NULL,
  `vnd_qtd_trocada` SMALLINT NULL DEFAULT NULL,
  PRIMARY KEY (`vnd_id`),
  CONSTRAINT `fk_vnd_clt`
    FOREIGN KEY (`vnd_clt_id`)
    REFERENCES `clientes` (`clt_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_vnd_lvr`
    FOREIGN KEY (`vnd_lvr_id`)
    REFERENCES `livros` (`lvr_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `carrinho`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `carrinho` (
  `crr_id` INT NOT NULL AUTO_INCREMENT,
  `crr_clt_id` INT NOT NULL,
  `crr_lvr_id` INT NOT NULL,
  `crr_qtd` SMALLINT NULL,
  `crr_adicao` DATE NULL,
  `crr_status` ENUM('adicionado', 'removido', 'comprado') NULL DEFAULT 'adicionado',
  `crr_total` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`crr_id`),
  CONSTRAINT `fk_crr_clt`
    FOREIGN KEY (`crr_clt_id`)
    REFERENCES `clientes` (`clt_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_crr_lvr`
    FOREIGN KEY (`crr_lvr_id`)
    REFERENCES `livros` (`lvr_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `cupons`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cupons` (
  `cup_id` INT NOT NULL AUTO_INCREMENT,
  `cup_clt_id` INT NOT NULL,
  `cup_codigo` VARCHAR(45) NOT NULL,
  `cup_tipo` ENUM('troca', 'promocional') NOT NULL,
  `cup_valor` DECIMAL(10,2) NOT NULL,
  `cup_usado` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`cup_id`),
  CONSTRAINT `fk_cup_clt`
    FOREIGN KEY (`cup_clt_id`)
    REFERENCES `clientes` (`clt_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `trocas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `trocas` (
  `trc_id` INT NOT NULL AUTO_INCREMENT,
  `trc_clt_id` INT NOT NULL,
  `trc_lvr_id` INT NOT NULL,
  `trc_vnd_id` INT NOT NULL,
  `trc_qtd` SMALLINT NULL,
  `trc_preco` DECIMAL(10,2) NULL,
  `trc_tipo` ENUM('troca', 'devolucao') NULL,
  PRIMARY KEY (`trc_id`),
  CONSTRAINT `fk_trc_clt`
    FOREIGN KEY (`trc_clt_id`)
    REFERENCES `clientes` (`clt_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_trc_lvr`
    FOREIGN KEY (`trc_lvr_id`)
    REFERENCES `livros` (`lvr_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_trc_vnd`
    FOREIGN KEY (`trc_vnd_id`)
    REFERENCES `vendas` (`vnd_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `pagamento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pagamento` (
  `pag_id` INT NOT NULL AUTO_INCREMENT,
  `pag_vnd_id` INT NOT NULL,
  `pag_metodo` ENUM('cartao_credito', 'cupom_troca', 'cupom_promocional') NOT NULL,
  `pag_valorPago` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`pag_id`),
  CONSTRAINT `fk_pag_vnd`
    FOREIGN KEY (`pag_vnd_id`)
    REFERENCES `vendas` (`vnd_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `transacoes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `transacoes` (
  `trs_id` INT NOT NULL AUTO_INCREMENT,
  `trs_clt_id` INT NOT NULL,
  `trs_dataHora` DATETIME NOT NULL,
  `trs_tipo` VARCHAR(45) NOT NULL,
  `trs_status` ENUM('confirmado', 'pendente') NOT NULL,
  `trs_acao` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`trs_id`),
  CONSTRAINT `fk_trs_clt`
    FOREIGN KEY (`trs_clt_id`)
    REFERENCES `clientes` (`clt_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `historico_vendas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `historico_vendas` (
  `hvd_id` INT NOT NULL AUTO_INCREMENT,
  `hvd_lvr_id` INT NOT NULL,
  `hvd_qtd` INT NOT NULL,
  `hvd_data` DATE NOT NULL,
  `hvd_totalVendido` INT NOT NULL,
  PRIMARY KEY (`hvd_id`),
  CONSTRAINT `fk_hvd_lvr`
    FOREIGN KEY (`hvd_lvr_id`)
    REFERENCES `livros` (`lvr_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `log`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `log` (
  `log_id` INT NOT NULL AUTO_INCREMENT,
  `log_clt_id` INT NOT NULL,
  `log_dataHora` DATETIME NOT NULL,
  `log_usuario` VARCHAR(45) NOT NULL,
  `log_operacao` ENUM('insercao', 'escrita') NOT NULL,
  PRIMARY KEY (`log_id`),
  CONSTRAINT `fk_log_clt`
    FOREIGN KEY (`log_clt_id`)
    REFERENCES `clientes` (`clt_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `livros_categorias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `livros_categorias` (
  `lvc_id` INT NOT NULL AUTO_INCREMENT,
  `lvc_lvr_id` INT NOT NULL,
  `lvc_cat_id` INT NOT NULL,
  PRIMARY KEY (`lvc_id`),
  CONSTRAINT `fk_lvc_lvr`
    FOREIGN KEY (`lvc_lvr_id`)
    REFERENCES `livros` (`lvr_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_lvc_cat`
    FOREIGN KEY (`lvc_cat_id`)
    REFERENCES `categoria` (`cat_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
