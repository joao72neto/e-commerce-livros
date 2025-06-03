from apis.pedidos import pedidos_contexto
from apis.cupons import cupons_ativos_contexto, cupons_inativos_contexto
from apis.livros import livros_contexto
from apis.clientes import cliente_contexto
from apis.enderecos import endereco_contexto
from apis.cartoes import cartoes_contexto

def buil_base_context():
    
    return f'''

[LIVROS DO SISTEMA]
{livros_contexto()}

[DADOS DO CLIENTE]
{cliente_contexto()}

[ENDEREÇOS DO CLIENTE]
{endereco_contexto()}

[CARTÕES DO CLIENTE]
{cartoes_contexto()}

[PÁGINA DE PEDIDOS DO CLIENTE]
[Pedidos](http://localhost:3000/pedidos)

[CARRINHO DO CLIENTE]
[Carrinho](http://localhost:3000/pedidos)

'''
    

def build_chat_context(msg):
    
    return f'''
    
[MENSAGEM DO CLIENTE]
{msg}

[PEDIDOS DO CLIENTE]
{pedidos_contexto()}

[CUPONS DO CLIENTE]
{cupons_ativos_contexto()}
{cupons_inativos_contexto()}

'''