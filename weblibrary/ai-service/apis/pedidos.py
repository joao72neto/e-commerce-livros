import requests as req
from apis.clientes import clt_id_logado

#Função que busca os pedidos do cliente logado
def buscar_pedidos_clt_logado():
    
    #Obtendo o id do cliente logado
    clt_logado = clt_id_logado()
    url=f'http://localhost:3000/api/pedidos/{clt_logado}'
    
    #Obtendo os pedidos do cliente logado
    res = req.get(url)
    
    if not res.status_code == 200:
        print(f'Não foi possível obter os pedidos do cliente: {res.status_code}')
        return 
    
    pedidos = res.json()
    return pedidos
    

#Função que retorna os pedidos organizados para a IA
def pedidos_contexto():
    
    context = ''
    pedidos = buscar_pedidos_clt_logado()

    #Verificando se já pedidos para o cliente
    if not pedidos: return 'O cliente ainda não fez nenhum pedido';
    
    for pedido in pedidos:
    
        context  += (
            f'Nome do livro: {pedido['lvr_titulo']}\n'
            f'Número do Pedido: {pedido['vnd_numPedido']}\n'
            f'Data do Pedido: {pedido['vnd_data']}\n'
            f'Status do Pedido: {pedido['vnd_status']}\n'
            f'Valor Total: {pedido['vnd_valorTotal']}\n'
            f'Valo do Frete: {pedido['vnd_frete']}\n'
            f'Quantidade Comprada: {pedido['vnd_qtd']}\n'
            f'Quantidade Trocada: {pedido['vnd_qtd_trocada']}\n\n' 
        )
        
    return str(context)
