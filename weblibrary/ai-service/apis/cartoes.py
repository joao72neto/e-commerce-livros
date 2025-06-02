import requests as req
from clientes import clt_id_logado

def buscar_cartoes_clt_logado():
    
    #Monstando a url
    clt_id = clt_id_logado()
    url = f'http://localhost:3000/api/card/clt_id/{clt_id}'
    
    #Obtendo a respota do servidor
    res = req.get(url)
    
    if not res.status_code == 200:
        print(f'Não foi possível obter os cartões do cliente: {res.status_code}')
        return
    
    #Pegando os dados em json
    cartoes = res.json()
    return cartoes


def cartoes_contexto():
    
    context = ''
    cartoes = buscar_cartoes_clt_logado()
    for cartao in cartoes:
        context += (
            f'Nome Impresso no Cartão: {cartao['car_nome']}\n'
            f'Bandeira: {cartao['car_bandeira']}\n\n' 
        )
        
    return str(context)