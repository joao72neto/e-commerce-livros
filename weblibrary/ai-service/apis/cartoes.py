import requests as req
from clientes import clt_id_logado

def buscar_cartoes_clt_logado():
    
    #Monstando a url
    clt_id = clt_id_logado()
    url = f'http://localhost:3000/api/card/clt_id/{clt_id}'
    
    #Obtendo a respota do servidos
    res = req.get(url)
    
    if not res.status_code == 200:
        print(f'Não foi possível obter os cartões do cliente: {res.status_code}')
        return
    
    #Pegando os dados em json
    cartoes = res.json()
    return cartoes
