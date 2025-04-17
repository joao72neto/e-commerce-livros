
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
  lvr_gpp_id, lvr_edt_id, lvr_aut_id, lvr_ano, lvr_titulo,
  lvr_edicao, lvr_isbn, lvr_numPaginas, lvr_sinopse,
  lvr_codigoBarras, lvr_largura, lvr_altura, lvr_peso, lvr_profundidade,
  lvr_capa, lvr_preco
) VALUES
(6, 1, 1, 1954, 'O Senhor dos Anéis: A Sociedade do Anel', 1, '9788595084742', 576, 
 'Primeiro volume da trilogia épica de J.R.R. Tolkien, onde um hobbit recebe a missão de destruir um anel poderoso e perigoso.', 
 '9788595084742', 15.50, 23.00, 0.65, 4.00, '/images/capas/sociedade_anel.jpg', 69.90),

(2, 2, 2, 1949, '1984', 1, '9788535914849', 416, 
 'Romance distópico de George Orwell que aborda vigilância extrema, manipulação da informação e a opressão de um regime totalitário.', 
 '9788535914849', 14.00, 21.00, 0.40, 3.00, '/images/capas/1984.jpg', 49.90),

(5, 3, 3, 1881, 'Memórias Póstumas de Brás Cubas', 1, '9788520931836', 208, 
 'Narrado por um defunto, o livro de Machado de Assis combina ironia, crítica social e uma profunda reflexão sobre a existência.', 
 '9788520931836', 13.50, 20.00, 0.35, 2.50, '/images/capas/bras_cubas.jpg', 39.90),

(3, 4, 4, 1943, 'O Pequeno Príncipe', 1, '9788522031442', 96, 
 'Fábula poética de Antoine de Saint-Exupéry que trata de amizade, amor e do essencial que é invisível aos olhos.', 
 '9788522031442', 13.00, 18.00, 0.25, 1.80, '/images/capas/pequeno_principe.jpg', 34.90),

(4, 5, 5, 1813, 'Orgulho e Preconceito', 1, '9788583862504', 424, 
 'Romance clássico de Jane Austen que explora relações humanas, classe social e os desafios do amor na Inglaterra do século XIX.', 
 '9788583862504', 14.50, 21.50, 0.55, 3.00, '/images/capas/orgulho_preconceito.jpg', 44.90),

(2, 6, 6, 1915, 'A Metamorfose', 1, '9788525421523', 104, 
 'Obra-prima de Franz Kafka em que o protagonista acorda transformado em inseto, revelando a alienação e rejeição familiar.', 
 '9788525421523', 13.00, 18.00, 0.30, 2.20, '/images/capas/metamorfose.jpg', 29.90),

(5, 3, 7, 1937, 'Capitães da Areia', 1, '9788503010903', 272, 
 'Narrativa de Jorge Amado sobre um grupo de meninos de rua que enfrentam a miséria, a marginalização e a busca por liberdade.', 
 '9788503010903', 14.00, 20.50, 0.48, 2.80, '/images/capas/capitaes_areia.jpg', 42.90),

(6, 7, 8, 2007, 'O Nome do Vento', 1, '9788599296493', 656, 
 'Primeiro livro da Crônica do Matador do Rei, de Patrick Rothfuss, que narra a trajetória do jovem músico e mago Kvothe.', 
 '9788599296493', 15.50, 23.50, 0.72, 4.20, '/images/capas/nome_do_vento.jpg', 64.90),

(1, 2, 1, 1955, 'O Senhor dos Anéis: As Duas Torres', 1, '9788595084759', 448, 
 'Continuação da jornada épica de Frodo e seus companheiros, agora divididos em múltiplos caminhos rumo ao destino final.', 
 '9788595084759', 15.00, 22.50, 0.60, 4.00, '/images/capas/duas_torres.jpg', 69.90),

(1, 2, 1, 1956, 'O Senhor dos Anéis: O Retorno do Rei', 1, '9788595084766', 576, 
 'Desfecho da trilogia com batalhas épicas e a conclusão da missão para destruir o Um Anel e derrotar Sauron.', 
 '9788595084766', 15.50, 23.00, 0.65, 4.00, '/images/capas/retorno_rei.jpg', 69.90);

-- Cupons

INSERT INTO `e_commerce_books`.`cupons` (cup_clt_id, cup_codigo, cup_tipo, cup_valor, cup_usado) VALUES
(1, 'PROMO10', 'promocional', 10.00, 0),
(1, 'PROMO20', 'promocional', 20.00, 0),
(1, 'TROCA15', 'troca', 15.00, 0),
(1, 'PROMO5', 'promocional', 5.00, 1),
(1, 'TROCA30', 'troca', 30.00, 0),
(1, 'FRETEGRATIS', 'promocional', 0.00, 0),
(1, 'DESCONTO25', 'promocional', 25.00, 1),
(1, 'TROCA50', 'troca', 50.00, 0);

