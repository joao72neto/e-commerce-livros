import requests as req

#Função que busca o cliente logado no sistema
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


#Função que retorna apenas o ID do cliente logado
def clt_id_logado():
      cliente = buscar_cliente_logado()
      return cliente[0]['clt_id'] if len(cliente) != 0 else None
  
  
#Função que retorna os livros organizados para a IA
def cliente_contexto():
    
    context = ''
    cliente = buscar_cliente_logado()
    for clt in cliente:
        context += (
            f'Nome: {clt['clt_nome']}\n'
            f'Genero: {clt['clt_genero']}\n'
            f'Data de Nascimento: {clt['clt_dataNasc']}\n'
            f'Telefone: {clt['clt_telefone']}'
            f'E-mail: {clt['clt_email']}\n'
            f'Ranking: {clt['clt_ranking']}\n'  
        )
        
    return str(context)

