import requests as req

#Criando cache para todos os livros
livros_cache = []

def buscar_todos_livros(url='http://localhost:3000/api/books'):
    
    global livros_cache;
    if not livros_cache:
    
        #Obtendo a resposta da API
        res = req.get(url)
        
        #Verificando a requisição
        if not res.status_code == 200:
            print(f'Não foi possível obter os dados da API: {res.status_code}')
            return;
        
        livros_cache = res.json()
        
    return livros_cache
