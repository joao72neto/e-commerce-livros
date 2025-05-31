import requests as req
from clientes import clt_id_logado

#Obtendo o id do cliente logado
clt_logado = clt_id_logado()

#Função que busca os pedidos do cliente logado
def pedidos_clt_logado(url=f'http://localhost:3000/api/pedidos/{clt_logado}'):
    
    #Obtendo os pedidos do cliente logado
    res = req.get(url)
    
    if not res.status_code == 200:
        print(f'Não foi possível obter os pedidos do cliente: {res.status_code}')
        return 
    
    pedidos = res.json()
    return pedidos
    
