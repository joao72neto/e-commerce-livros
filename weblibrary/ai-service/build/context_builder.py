from apis.pedidos import pedidos_contexto
from apis.enderecos import endereco_contexto
from apis.cartoes import cartoes_contexto
from apis.cupons import cupons_ativos_contexto, cupons_inativos_contexto

def build_chat_context(msg):
    
    mensagem_chatbot = f'''
    
    [MENSAGEM DO CLIENTE]

    {msg}

    [PEDIDOS DO CLIENTE]

    {pedidos_contexto()}

    [ENDEREÇOS DO CLIENTE]

    {endereco_contexto()}

    [CARTÕES DO CLIENTE]

    {cartoes_contexto()}

    [CUPONS DO CLIENTE]

    {cupons_ativos_contexto()}
    {cupons_inativos_contexto()}

    '''
    
    return mensagem_chatbot