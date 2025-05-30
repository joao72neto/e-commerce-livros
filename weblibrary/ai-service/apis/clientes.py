import requests as req

def buscar_cliente_logado(url='http://localhost:3000/api/clientes/logado'):
   
    #Obtendo a resposta da API
    res = req.get(url)
    
    #Verificando a requisição
    if not res.status_code == 200:
        print(f'Não foi possível obter os dados da API: {res.status_code}')
        return;
    
    #Retornando o cliente
    cliente = res.json()
    return cliente
    

