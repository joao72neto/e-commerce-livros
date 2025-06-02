import requests as req
from clientes import clt_id_logado

def buscar_enderecos_clt_logado():
    
    #Monstando a url
    clt_id = clt_id_logado()
    url = f'http://localhost:3000/api/address/clt_id/{clt_id}'
    
    #Obtendo a respota do servidor
    res = req.get(url)
    
    if not res.status_code == 200:
        print(f'Não foi possível obter os endereços do cliente: {res.status_code}')
        return
    
    #Pegando os dados em json
    cartoes = res.json()
    return cartoes


def endereco_contexto():
    
    context = ''
    enderecos = buscar_enderecos_clt_logado()
    for endereco in enderecos:
        context += (
            f'Nome: {endereco['end_nome']}\n'
            f'Tipo de Residência: {endereco['end_tipoResidencia']}\n' 
            f'Tipo de Logradouro: {endereco['end_tipoLogradouro']}\n'
            f'Logradouro: {endereco['end_logradouro']}\n'
            f'Número: {endereco['end_numero']}\n'
            f'Bairro: {endereco['end_bairro']}\n'
            f'CEP: {endereco['end_cep']}\n'
            f'Cidade: {endereco['end_cidade']}\n'
            f'Estado: {endereco['end_estado']}\n\n'
        )
        
    return str(context)
