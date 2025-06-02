from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from config.chat import create_ai_chat
from apis.clientes import clt_id_logado
from apis.pedidos import pedidos_contexto
from build.context_builder import build_chat_context

#Criando o app do FastAPI
app = FastAPI()

#Configurando o CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

#Guardando os chats dos clientes
chats_por_cliente = {}

#Criando um modelo para receber a msg do Cliente
class Pergunta(BaseModel):
    msg: str

#Criando um endpoint para teste
@app.post('/ai')
def chatbot(pergunta: Pergunta):
    global chats_por_cliente
    
    #Gerando msg para enviar para a IA
    user_message = pergunta.msg
    mensagem_chatbot = f'[MENSAGEM DO CLIENTE]\n{user_message}\n[PEDIDOS DO CLIENTE]\n{pedidos_contexto()}\n'
    
    #Criando novo chat caso o cliente logado mude
    cliente_id_logado = clt_id_logado()
    if cliente_id_logado not in chats_por_cliente:
        chats_por_cliente[cliente_id_logado] = create_ai_chat()
        
    #Definindo o char do cliente atual
    chat = chats_por_cliente[cliente_id_logado]
    
    #Retornando a resposta da IA
    resposta = chat.send_message(mensagem_chatbot).text
    return {'ai_res': resposta}
