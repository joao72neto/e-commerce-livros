import requests as req
from clientes import clt_id_logado

#Obtendo o id do cliente logado
clt_logado = clt_id_logado()

#Função que busca os pedidos do cliente logado
def pedidos_clt_logado(url=f'http://localhost:3000/api/pedidos/{clt_logado}'):
    print(url)
    
pedidos_clt_logado()