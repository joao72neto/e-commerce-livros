-- Clientes
INSERT INTO clientes
(clt_nome, clt_genero, clt_dataNasc, clt_cpf, clt_telefone, clt_email, clt_senha, clt_ranking, clt_status, clt_logado)
VALUES
('Ana Souza', 'F', '1990-05-12', '123.456.789-00', '+55 (11) 91234-5678', 'ana.souza@email.com', '$2b$10$CmQWqcdWQ9e.J1ShE9RPZ.nqMj7dEHOH.CxXfrIY.H7BNkgP0qY8O', 10, 1, 0),
('Bruno Lima', 'M', '1985-08-30', '987.654.321-00', '+55 (21) 99876-5432', 'bruno.lima@email.com', '$2b$10$CmQWqcdWQ9e.J1ShE9RPZ.nqMj7dEHOH.CxXfrIY.H7BNkgP0qY8O', 15, 1, 0),
('Carla Mendes', 'F', '1992-12-01', '111.222.333-44', '+55 (31) 98765-4321', 'carla.mendes@email.com', '$2b$10$CmQWqcdWQ9e.J1ShE9RPZ.nqMj7dEHOH.CxXfrIY.H7BNkgP0qY8O', 20, 1, 0),
('Diego Costa', 'M', '1988-03-15', '555.666.777-88', '+55 (41) 91234-1234', 'diego.costa@email.com', '$2b$10$CmQWqcdWQ9e.J1ShE9RPZ.nqMj7dEHOH.CxXfrIY.H7BNkgP0qY8O', 12, 1, 0),
('Eduarda Ribeiro', 'F', '1995-07-20', '999.888.777-66', '+55 (51) 93456-7890', 'eduarda.ribeiro@email.com', '$2b$10$CmQWqcdWQ9e.J1ShE9RPZ.nqMj7dEHOH.CxXfrIY.H7BNkgP0qY8O', 8, 1, 0);

-- Endereços
INSERT INTO enderecos
(end_clt_id, end_nome, end_tipoResidencia, end_tipoLogradouro, end_logradouro, end_numero, end_bairro, end_cep, end_cidade, end_estado, end_pais, end_frete, end_residencia, end_cobranca, end_entrega)
VALUES
(1, 'Residência Principal', 'Apartamento', 'Rua', 'das Flores', 123, 'Jardim Primavera', '01234-567', 'São Paulo', 'SP', 'Brasil', 15.50, 1, 0, 1),
(1, 'Trabalho', 'Comercial', 'Avenida', 'Paulista', 1000, 'Bela Vista', '01311-200', 'São Paulo', 'SP', 'Brasil', 25.00, 0, 1, 1),
(2, 'Casa dos Pais', 'Casa', 'Avenida', 'Brasil', 456, 'Centro', '22345-678', 'Rio de Janeiro', 'RJ', 'Brasil', 12.75, 0, 1, 1),
(2, 'Apartamento Temporário', 'Apartamento', 'Rua', 'das Laranjeiras', 78, 'Laranjeiras', '22240-003', 'Rio de Janeiro', 'RJ', 'Brasil', 18.30, 1, 0, 1),
(3, 'Residência Carla', 'Apartamento', 'Travessa', 'das Oliveiras', 789, 'Bela Vista', '33456-789', 'Belo Horizonte', 'MG', 'Brasil', 22.40, 1, 1, 1),
(3, 'Casa da Mãe', 'Casa', 'Rua', 'dos Jasmins', 321, 'Santa Efigênia', '30130-110', 'Belo Horizonte', 'MG', 'Brasil', 10.00, 0, 0, 1),
(4, 'Endereço Principal', 'Casa', 'Rua', 'do Sol', 321, 'Vila Nova', '44567-890', 'Curitiba', 'PR', 'Brasil', 19.90, 1, 1, 1),
(4, 'Trabalho', 'Comercial', 'Avenida', 'Sete de Setembro', 999, 'Centro', '80060-070', 'Curitiba', 'PR', 'Brasil', 30.00, 0, 0, 1),
(5, 'Apartamento Eduarda', 'Apartamento', 'Alameda', 'das Palmeiras', 654, 'Parque Verde', '55678-901', 'Brasília', 'DF', 'Brasil', 27.50, 1, 0, 1),
(5, 'Casa da Avó', 'Casa', 'Rua', 'dos Ipês', 88, 'Taguatinga', '72000-000', 'Brasília', 'DF', 'Brasil', 14.25, 0, 1, 1);

-- Cartões
INSERT INTO cartoes
(car_clt_id, car_nome, car_numero, car_bandeira, car_cvv, car_principal)
VALUES
(1, 'Ana Souza', '4111 1111 1111 1111', 'Visa', '123', 1),
(1, 'Ana Souza', '5500 0000 0000 0004', 'Mastercard', '456', 0),
(2, 'Bruno Lima', '4000 0566 5566 5556', 'Visa', '321', 1),
(2, 'Bruno Lima', '6011 1111 1111 1117', 'Discover', '789', 0),
(3, 'Carla Mendes', '3782 8224 6310 005', 'American Express', '159', 1),
(3, 'Carla Mendes', '3056 9309 0259 04', 'Diners Club', '753', 0),
(4, 'Diego Costa', '6011 0009 9013 9424', 'Elo', '852', 1),
(4, 'Diego Costa', '3000 0000 0000 04', 'Hipercard', '951', 0),
(5, 'Eduarda Ribeiro', '3530 1113 3330 0000', 'JCB', '147', 1),
(5, 'Eduarda Ribeiro', '6304 0000 0000 0000', 'Aura', '258', 0);

-- Autores
INSERT INTO autores (aut_id, aut_nome) VALUES
(1, 'J.R.R. Tolkien'),
(2, 'George Orwell'),
(3, 'Machado de Assis'),
(4, 'Antoine de Saint-Exupéry'),
(5, 'Jane Austen'),
(6, 'Franz Kafka'),
(7, 'Jorge Amado'),
(8, 'Patrick Rothfuss');

-- Editora
INSERT INTO editora (edt_id, edt_nome) VALUES
(1, 'Martins Fontes'),
(2, 'Companhia das Letras'),
(3, 'Nova Fronteira'),
(4, 'Agir'),
(5, 'Penguin'),
(6, 'L&PM'),
(7, 'Arqueiro');

-- Precificação
INSERT INTO grupo_precificacao (gpp_id, gpp_nome, gpp_margemLucro) VALUES
(1, 'Lançamentos', 5.00),
(2, 'Clássicos', 10.00),
(3, 'Infantil', 15.00),
(4, 'Romance', 8.00),
(5, 'Literatura Nacional', 12.00),
(6, 'Fantasia', 5.00);

-- Livros
INSERT INTO livros (
  lvr_edt_id, lvr_aut_id, lvr_ano, lvr_titulo,
  lvr_edicao, lvr_isbn, lvr_numPaginas, lvr_sinopse,
  lvr_codigoBarras, lvr_largura, lvr_altura, lvr_peso, lvr_profundidade,
  lvr_capa, lvr_preco
) VALUES
(1, 1, 1954, 'O Senhor dos Anéis: A Sociedade do Anel', 1, '9788595084742', 576, 
 'Primeiro volume da trilogia épica de J.R.R. Tolkien, onde um hobbit recebe a missão de destruir um anel poderoso e perigoso.', 
 '9788595084742', 15.50, 23.00, 0.65, 4.00, '/images/capas/sociedade_anel.jpg', 69.90),
(2, 2, 1949, '1984', 1, '9788535914849', 416, 
 'Romance distópico de George Orwell que aborda vigilância extrema, manipulação da informação e a opressão de um regime totalitário.', 
 '9788535914849', 14.00, 21.00, 0.40, 3.00, '/images/capas/1984.jpg', 49.90),
(3, 3, 1881, 'Memórias Póstumas de Brás Cubas', 1, '9788520931836', 208, 
 'Narrado por um defunto, o livro de Machado de Assis combina ironia, crítica social e uma profunda reflexão sobre a existência.', 
 '9788520931836', 13.50, 20.00, 0.35, 2.50, '/images/capas/bras_cubas.jpg', 39.90),
(4, 4, 1943, 'O Pequeno Príncipe', 1, '9788522031442', 96, 
 'Fábula poética de Antoine de Saint-Exupéry que trata de amizade, amor e do essencial que é invisível aos olhos.', 
 '9788522031442', 13.00, 18.00, 0.25, 1.80, '/images/capas/pequeno_principe.jpg', 34.90),
(5, 5, 1813, 'Orgulho e Preconceito', 1, '9788583862504', 424, 
 'Romance clássico de Jane Austen que explora relações humanas, classe social e os desafios do amor na Inglaterra do século XIX.', 
 '9788583862504', 14.50, 21.50, 0.55, 3.00, '/images/capas/orgulho_preconceito.jpg', 44.90),
(6, 6, 1915, 'A Metamorfose', 1, '9788525421523', 104, 
 'Obra-prima de Franz Kafka em que o protagonista acorda transformado em inseto, revelando a alienação e rejeição familiar.', 
 '9788525421523', 13.00, 18.00, 0.30, 2.20, '/images/capas/metamorfose.jpg', 29.90),
(3, 7, 1937, 'Capitães da Areia', 1, '9788503010903', 272, 
 'Narrativa de Jorge Amado sobre um grupo de meninos de rua que enfrentam a miséria, a marginalização e a busca por liberdade.', 
 '9788503010903', 14.00, 20.50, 0.48, 2.80, '/images/capas/capitaes_areia.jpg', 42.90),
(7, 8, 2007, 'O Nome do Vento', 1, '9788599296493', 656, 
 'Primeiro livro da Crônica do Matador do Rei, de Patrick Rothfuss, que narra a trajetória do jovem músico e mago Kvothe.', 
 '9788599296493', 15.50, 23.50, 0.72, 4.20, '/images/capas/nome_do_vento.jpg', 64.90),
(2, 1, 1955, 'O Senhor dos Anéis: As Duas Torres', 1, '9788595084759', 448, 
 'Continuação da jornada épica de Frodo e seus companheiros, agora divididos em múltiplos caminhos rumo ao destino final.', 
 '9788595084759', 15.00, 22.50, 0.60, 4.00, '/images/capas/duas_torres.jpg', 69.90),
(2, 1, 1956, 'O Senhor dos Anéis: O Retorno do Rei', 1, '9788595084766', 576, 
 'Desfecho da trilogia com batalhas épicas e a conclusão da missão para destruir o Um Anel e derrotar Sauron.', 
 '9788595084766', 15.50, 23.00, 0.65, 4.00, '/images/capas/retorno_rei.jpg', 69.90);

-- Fornecedores
INSERT INTO fornecedor (for_nome) VALUES
('Distribuidora Literária Brasileira'),
('Livraria Cultura'),
('Saraiva Distribuidora'),
('Editora Arqueiro'),
('Grupo Editorial Record'),
('Editora Intrínseca'),
('Companhia das Letras');

-- Estoque
INSERT INTO estoque (est_for_id, est_lvr_id, est_gpp_id, est_qtd, est_data, est_valorCompra) VALUES
(4, 1, 5, 35, '2023-10-15 09:15:00', 46.60),
(2, 1, 5, 20, '2023-11-05 14:30:00', 47.67),
(7, 2, 2, 45, '2023-09-20 11:45:00', 38.38),
(3, 2, 2, 30, '2023-12-10 16:20:00', 39.92),
(1, 3, 6, 25, '2023-08-15 08:10:00', 29.56),
(5, 3, 6, 15, '2024-01-05 10:25:00', 30.74),
(7, 4, 2, 60, '2023-07-22 13:50:00', 26.85),
(2, 4, 2, 40, '2023-11-18 15:05:00', 28.38),
(6, 5, 2, 30, '2023-10-10 12:30:00', 34.54),
(3, 5, 2, 25, '2023-12-15 17:40:00', 35.77),
(7, 6, 2, 50, '2023-09-05 09:55:00', 23.00),
(1, 6, 2, 20, '2024-01-20 18:15:00', 24.23),
(5, 7, 6, 40, '2023-08-30 07:20:00', 31.78),
(1, 7, 6, 35, '2023-11-25 19:30:00', 32.96),
(4, 8, 1, 30, '2023-10-25 10:45:00', 46.60),
(6, 8, 1, 25, '2023-12-05 14:10:00', 44.60),
(4, 9, 5, 35, '2023-11-15 11:25:00', 46.60),
(2, 9, 5, 20, '2024-01-10 16:50:00', 47.67),
(4, 10, 5, 35, '2023-11-20 08:35:00', 46.60),
(2, 10, 5, 20, '2024-01-15 13:00:00', 47.67);

-- Tabela de Categorias
INSERT INTO categoria (cat_nome) VALUES 
('Fantasia'),
('Distopia'),
('Clássico Brasileiro'),
('Fábula'),
('Romance Clássico'),
('Literatura Estrangeira'),
('Aventura');

-- Tabela que relaciona a categoria com os livros
INSERT INTO livros_categorias (lvc_lvr_id, lvc_cat_id) VALUES
(1, 1),
(1, 7),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 3),
(8, 1),
(9, 1),
(9, 7),
(10, 1),
(10, 7);

-- Inserting into vendas_history table
INSERT INTO vendas_history
(hvnd_clt_id, hvnd_lvr_id, hvnd_numPedido, hvnd_data, hvnd_status, hvnd_valorTotal, hvnd_frete, hvnd_qtd)
VALUES 
-- Livro 1: vendido em 3 datas diferentes
(5, 1, 'PED-20250601-19283', '2025-06-01 14:30:45', 'Entregue', 59.90, 5.00, 1),
(4, 1, 'PED-20250605-48271', '2025-06-05 10:15:22', 'Entregue', 59.90, 5.00, 2),
(3, 1, 'PED-20250610-30896', '2025-06-10 16:45:10', 'Entregue', 59.90, 5.00, 1),

-- Livro 2: vendido duas vezes no mesmo dia
(5, 2, 'PED-20250603-73612', '2025-06-03 09:30:00', 'Entregue', 39.90, 5.00, 1),
(4, 2, 'PED-20250603-55029', '2025-06-03 18:20:15', 'Entregue', 39.90, 5.00, 2),

-- Livro 3: vendido em dias diferentes
(4, 3, 'PED-20250602-86431', '2025-06-02 11:10:30', 'Entregue', 29.90, 5.00, 1),
(3, 3, 'PED-20250609-21844', '2025-06-09 13:25:40', 'Entregue', 29.90, 5.00, 3),

-- Livro 4: uma venda só
(5, 4, 'PED-20250607-10957', '2025-06-07 15:50:05', 'Entregue', 49.90, 5.00, 1),

-- Livro 5: vendido com quantidade maior
(3, 5, 'PED-20250611-67130', '2025-06-11 08:05:55', 'Entregue', 69.90, 5.00, 4);
