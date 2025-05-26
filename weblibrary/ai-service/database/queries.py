from sqlalchemy.orm import Session
from sqlalchemy import text

#Cache para os livros
livro_cache = []

#Buscando todos os livros do banco
def buscar_livros(db: Session):
    global livro_cache
    
    if not livro_cache:
        livros = db.execute(text('select * from livros'))
        return [list(row) for row in livros]
    
    return livro_cache
