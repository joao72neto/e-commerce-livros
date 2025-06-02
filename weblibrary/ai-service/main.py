from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from config.chat import create_ai_chat
from apis.clientes import clt_id_logado
from build.context_builder import build_chat_context
from utils.genai_retry import retry_api_call

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
    mensagem_chatbot = build_chat_context(pergunta.msg)
    
    #Criando novo chat caso o cliente logado mude
    cliente_id_logado = clt_id_logado()
    if cliente_id_logado not in chats_por_cliente:
        chats_por_cliente[cliente_id_logado] = create_ai_chat()
        
    #Definindo o char do cliente atual
    chat = chats_por_cliente[cliente_id_logado]
    
    #Retornando a resposta da IA
    resposta = retry_api_call(lambda: chat.send_message(mensagem_chatbot))
    return {'ai_res': resposta.text}
