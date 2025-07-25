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
  `end_frete` DECIMAL(10,2) NULL,
  `end_cidade` VARCHAR(45) NOT NULL,
  `end_estado` VARCHAR(45) NOT NULL,
  `end_pais` VARCHAR(45) NOT NULL,
  `end_status` TINYINT(1) NULL DEFAULT 0,
  `end_residencia` TINYINT NULL DEFAULT 0,
  `end_entrega` TINYINT NULL DEFAULT 0,
  `end_cobranca` TINYINT NULL DEFAULT 0,
  PRIMARY KEY (`end_id`),
  CONSTRAINT `fk_end_clt`
    FOREIGN KEY (`end_clt_id`)
    REFERENCES `clientes` (`clt_id`)
    ON DELETE CASCADE
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
    ON DELETE CASCADE
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
  `est_data` DATETIME NOT NULL,
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
  `vnd_data` DATETIME NOT NULL,
  `vnd_status` ENUM('Em Processamento', 'Aprovado', 'Reprovado', 'Cancelado', 'Em Transporte', 'Entregue', 'Troca Solicitada', 'Troca Aceita', 'Troca Concluída', 'Troca Recusada', 'Devolução Solicitada', 'Devolução Aceita', 'Devolução Concluída', 'Devolução Recusada') NOT NULL DEFAULT 'em processamento',
  `vnd_valorTotal` DECIMAL(5,2) NOT NULL,
  `vnd_frete` DECIMAL(5,2) NULL,
  `vnd_qtd` SMALLINT NULL,
  `vnd_qtd_trocada` SMALLINT NULL DEFAULT NULL,
  PRIMARY KEY (`vnd_id`),
  CONSTRAINT `fk_vnd_clt`
    FOREIGN KEY (`vnd_clt_id`)
    REFERENCES `clientes` (`clt_id`)
    ON DELETE CASCADE
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
  `crr_expiration` DATETIME NOT NULL,
  `crr_warned` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`crr_id`),
  CONSTRAINT `fk_crr_clt`
    FOREIGN KEY (`crr_clt_id`)
    REFERENCES `clientes` (`clt_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_crr_lvr`
    FOREIGN KEY (`crr_lvr_id`)
    REFERENCES `livros` (`lvr_id`)
    ON DELETE CASCADE
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
    ON DELETE CASCADE
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
    ON DELETE CASCADE
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
-- Table `transacoes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `transacoes` (
  `trs_id` INT NOT NULL AUTO_INCREMENT,
  `trs_clt_id` INT NOT NULL,
  `trs_dataHora` DATETIME NOT NULL,
  `trs_tipo` VARCHAR(45) NOT NULL,
  `trs_user_type` VARCHAR(45) NOT NULL,
  `trs_acao` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`trs_id`),
  CONSTRAINT `fk_trs_clt`
    FOREIGN KEY (`trs_clt_id`)
    REFERENCES `clientes` (`clt_id`)
    ON DELETE CASCADE
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
  `log_operacao` VARCHAR(45) NOT NULL,
  `log_desc` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`log_id`),
  CONSTRAINT `fk_log_clt`
    FOREIGN KEY (`log_clt_id`)
    REFERENCES `clientes` (`clt_id`)
    ON DELETE CASCADE
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

-- -----------------------------------------------------
-- Table `log_history`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `log_history` (
  `hlog_id` INT NOT NULL AUTO_INCREMENT,
  `hlog_log_id` INT NULL,
  `hlog_clt_id` INT NOT NULL,
  `hlog_dataHora` DATETIME NOT NULL,
  `hlog_usuario` VARCHAR(45) NOT NULL,
  `hlog_operacao` VARCHAR(45) NOT NULL,
  `hlog_desc` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`hlog_id`),
  CONSTRAINT `fk_hlog_log`
    FOREIGN KEY (`hlog_log_id`)
    REFERENCES `log` (`log_id`)
    ON DELETE SET NULL
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `vendas_history`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vendas_history` (
  `hvnd_id` INT NOT NULL AUTO_INCREMENT,
  `hvnd_vnd_id` INT NULL,
  `hvnd_clt_id` INT NOT NULL,
  `hvnd_lvr_id` INT NOT NULL,
  `hvnd_numPedido` VARCHAR(255) NULL,
  `hvnd_data` DATETIME NOT NULL,
  `hvnd_status` ENUM('Em Processamento', 'Aprovado', 'Reprovado', 'Cancelado', 'Em Transporte', 'Entregue', 'Troca Solicitada', 'Troca Aceita', 'Troca Concluída', 'Troca Recusada', 'Devolução Solicitada', 'Devolução Aceita', 'Devolução Concluída', 'Devolução Recusada') NOT NULL DEFAULT 'em processamento',
  `hvnd_valorTotal` DECIMAL(5,2) NOT NULL,
  `hvnd_frete` DECIMAL(5,2) NULL,
  `hvnd_qtd` SMALLINT NULL,
  `hvnd_qtd_trocada` SMALLINT NULL DEFAULT NULL,
  PRIMARY KEY (`hvnd_id`),
  CONSTRAINT `fk_hvnd_vnd`
    FOREIGN KEY (`hvnd_vnd_id`)
    REFERENCES `vendas` (`vnd_id`)
    ON DELETE SET NULL
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `notifications`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `notifications` (
  `not_id` INT NOT NULL AUTO_INCREMENT,
  `not_clt_id` INT NOT NULL,
  `not_datetime` DATETIME NOT NULL,
  `not_title` VARCHAR(45) NOT NULL,
  `not_msg` VARCHAR(255) NOT NULL,
  `not_status` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`not_id`),
  CONSTRAINT `fk_not_clt`
    FOREIGN KEY (`not_clt_id`)
    REFERENCES `clientes` (`clt_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- View `vw_historico_vendas`
-- -----------------------------------------------------
CREATE OR REPLACE VIEW vw_historico_vendas AS
SELECT
	l.lvr_id,
	l.lvr_titulo,
	c.cat_id,
	c.cat_nome,
	vh.hvnd_id,
	CONVERT_TZ(vh.hvnd_data, '+00:00', '-03:00') hvnd_data,
	vh.hvnd_qtd
FROM 
	vendas_history vh
	JOIN livros l ON l.lvr_id = vh.hvnd_lvr_id
	JOIN livros_categorias lc ON lc.lvc_lvr_id = l.lvr_id 
	JOIN categoria  c ON c.cat_id = lc.lvc_cat_id
WHERE
  vh.hvnd_status = 'entregue';

-- -----------------------------------------------------
-- View `vw_ranking`
-- -----------------------------------------------------
CREATE OR REPLACE VIEW vw_ranking AS
SELECT
	clt_id,
    clt_nome,
    total_spent,
    rank() OVER (ORDER BY total_spent DESC) position
FROM (
	SELECT
		c.clt_id,
		c.clt_nome,
		sum(hv.hvnd_valorTotal) total_spent
	FROM
		vendas_history hv
		JOIN clientes c ON c.clt_id = hv.hvnd_clt_id
	WHERE
		hvnd_status IN ('aprovado', 'em transporte', 'entregue')
	GROUP BY
		c.clt_id
) ranking;

-- -----------------------------------------------------
-- View `vw_estoque`
-- -----------------------------------------------------
CREATE OR REPLACE VIEW vw_estoque AS
SELECT
	e.est_id,
	f.for_id,
	f.for_nome,
	l.lvr_id,
	l.lvr_titulo,
	g.gpp_id,
	g.gpp_nome,
	g.gpp_margemLucro,
	e.est_qtd,
	e.est_data,
	e.est_valorCompra,
	e.est_origem,
	round((((g.gpp_margemLucro / 100) + 1) * e.est_valorCompra), 2) valorVenda
FROM 
	estoque e
	JOIN grupo_precificacao g ON g.gpp_id = e.est_gpp_id
	JOIN fornecedor f ON f.for_id = e.est_for_id
	JOIN livros l ON l.lvr_id = e.est_lvr_id
ORDER BY e.est_id DESC;

-- -----------------------------------------------------
-- Procedure `seed_sales_history`
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS seed_sales_history;
CREATE PROCEDURE seed_sales_history()
BEGIN
	DELETE FROM vendas_history
  WHERE hvnd_vnd_id IN (
		SELECT vnd_id from vendas
	);

	INSERT INTO vendas_history (
		hvnd_vnd_id,
    hvnd_clt_id,
    hvnd_lvr_id,
    hvnd_numPedido,
    hvnd_data,
    hvnd_status,
    hvnd_valorTotal,
    hvnd_frete,
    hvnd_qtd,
    hvnd_qtd_trocada
  )
  SELECT
    vnd_id,
    vnd_clt_id,
    vnd_lvr_id,
    vnd_numPedido,
    vnd_data,
    vnd_status,
    vnd_valorTotal,
    vnd_frete,
    vnd_qtd,
    vnd_qtd_trocada
  FROM
    vendas;
END;

-- -----------------------------------------------------
-- Procedure `seed_log_history`
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS seed_log_history;
CREATE PROCEDURE seed_log_history(IN p_log_id INT)
BEGIN

  -- Inserting on log_history table
	INSERT INTO log_history (
		hlog_log_id,
    hlog_clt_id,
    hlog_dataHora,
    hlog_usuario,
    hlog_operacao,
    hlog_desc
  )
  SELECT
		log_id,
		log_clt_id,
    log_dataHora,
    log_usuario,
    log_operacao,
    log_desc
	FROM log
  WHERE log_id = p_log_id;

  -- Inserting on transaction table
  INSERT INTO transacoes (
    trs_clt_id,
    trs_dataHora,
    trs_tipo,
    trs_user_type,
    trs_acao
  )
  SELECT
    log_clt_id,
    log_dataHora,
    log_operacao,
    log_usuario,
    log_desc
  FROM log
  WHERE log_id = p_log_id;

END;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
