import requests as req
from apis.clientes import clt_id_logado

#Obtendo os dados dos cupons
def buscar_cupons_ativos_clt_logado():
    
    #Monstando a url
    clt_id = clt_id_logado()
    url = f'http://localhost:3000/api/cupons/ativos/{clt_id}'
    
    #Obtendo a respota do servidor
    res = req.get(url)
    
    if not res.status_code == 200:
        print(f'Não foi possível obter os cupons ativos do cliente: {res.status_code}')
        return
    
    #Pegando os dados em json
    cupons_ativos = res.json()
    return cupons_ativos

def buscar_cupons_inativos_clt_logado():
    
    #Monstando a url
    clt_id = clt_id_logado()
    url = f'http://localhost:3000/api/cupons/inativos/{clt_id}'
    
    #Obtendo a respota do servidor
    res = req.get(url)
    
    if not res.status_code == 200:
        print(f'Não foi possível obter os cupons inativos do cliente: {res.status_code}')
        return
    
    #Pegando os dados em json
    cupons_inativos = res.json()
    return cupons_inativos


#Dados organizados para a IA
def cupons_inativos_contexto():
    
    context = 'CUPONS INATIVOS: \n\n'
    cupons = buscar_cupons_inativos_clt_logado()
    
    #Verificando se já pedidos para o cliente
    if not cupons: return 'O cliente não possui nenhum cupom para uso (inativo)';
    
    for cupom in cupons:
        context += (
            f'Código: {cupom['cup_codigo']}\n'
            f'Valor: {cupom['cup_valor']}\n\n' 
        )
        
    return str(context)

def cupons_ativos_contexto():
    
    context = 'CUPONS ATIVOS: \n\n'
    cupons = buscar_cupons_ativos_clt_logado()
    
    #Verificando se já pedidos para o cliente
    if not cupons: return 'O cliente não possui nenhum cupom em uso (ativo)';
    
    for cupom in cupons:
        context += (
            f'Código: {cupom['cup_codigo']}\n'
            f'Valor: {cupom['cup_valor']}\n\n' 
        )
        
    return str(context)