#Imports para lidar com o servidor
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from config import chat as c
from apis import clientes as clt

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

#Obtendo chat da IA
chat = c.ai_chat()
clt_id_atual = None

#Criando um modelo para receber a msg do Cliente
class Pergunta(BaseModel):
    msg: str

#Criando um endpoint para teste
@app.post('/ai')
def chatbot(pergunta: Pergunta):
    global chat, clt_id_atual
    
    #Gerando msg para enviar para a IA
    user_message = pergunta.msg
    mensagem_chatbot = f'[MENSAGEM DO USUÁRIO]\n{user_message}\n'
        
    #Criando novo chat caso o cliente logado mude
    if clt_id_atual != clt.clt_id_logado():
        chat = c.ai_chat()
        clt_id_atual = clt.clt_id_logado()
        
    #Retornando a resposta da IA
    resposta = chat.send_message(mensagem_chatbot).text
    return {'ai_res': resposta}
