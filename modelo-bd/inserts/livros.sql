
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
INSERT INTO grupo_precificacao (gpp_id, gpp_nome, gpp_desconto) VALUES
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
  lvr_capa
) VALUES
(6, 1, 1, 1954, 'O Senhor dos Anéis: A Sociedade do Anel', 1, '9788595084742', 576, 'Primeiro volume da trilogia épica de Tolkien.', '9788595084742', 15.50, 23.00, 0.65, 4.00, 'public/capas/sociedade_anel.jpg'),
(2, 2, 2, 1949, '1984', 1, '9788535914849', 416, 'Distopia clássica sobre vigilância e controle.', '9788535914849', 14.00, 21.00, 0.40, 3.00, 'public/capas/1984.jpg'),
(5, 3, 3, 1881, 'Memórias Póstumas de Brás Cubas', 1, '9788520931836', 208, 'Clássico da literatura brasileira com humor e crítica social.', '9788520931836', 13.50, 20.00, 0.35, 2.50, 'public/capas/bras_cubas.jpg'),
(3, 4, 4, 1943, 'O Pequeno Príncipe', 1, '9788522031442', 96, 'Obra poética e filosófica sobre a infância e a humanidade.', '9788522031442', 13.00, 18.00, 0.25, 1.80, 'public/capas/pequeno_principe.jpg'),
(4, 5, 5, 1813, 'Orgulho e Preconceito', 1, '9788583862504', 424, 'Romance clássico sobre sociedade e relacionamentos.', '9788583862504', 14.50, 21.50, 0.55, 3.00, 'public/capas/orgulho_preconceito.jpg'),
(2, 6, 6, 1915, 'A Metamorfose', 1, '9788525421523', 104, 'Um homem acorda transformado em inseto.', '9788525421523', 13.00, 18.00, 0.30, 2.20, 'public/capas/metamorfose.jpg'),
(5, 3, 7, 1937, 'Capitães da Areia', 1, '9788503010903', 272, 'Grupo de jovens marginalizados em Salvador.', '9788503010903', 14.00, 20.50, 0.48, 2.80, 'public/capas/capitaes_areia.jpg'),
(6, 7, 8, 2007, 'O Nome do Vento', 1, '9788599296493', 656, 'Fantasia épica com narrativa envolvente.', '9788599296493', 15.50, 23.50, 0.72, 4.20, 'public/capas/nome_do_vento.jpg'),
(1, 2, 1, 1955, 'O Senhor dos Anéis: As Duas Torres', 1, '9788595084759', 448, 'Segundo volume da trilogia de Tolkien.', '9788595084759', 15.00, 22.50, 0.60, 4.00, 'public/capas/duas_torres.jpg'),
(1, 2, 1, 1956, 'O Senhor dos Anéis: O Retorno do Rei', 1, '9788595084766', 576, 'Conclusão épica da jornada pela Terra Média.', '9788595084766', 15.50, 23.00, 0.65, 4.00, 'public/capas/retorno_rei.jpg');
