#Imports para lidar com o servidor
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

#Imports para lidar com a IA generativa
from google import genai
from google.genai import types
import os
from dotenv import load_dotenv


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

# #Dados fictícios dos livros
# livros = [
#     {"titulo": "O Senhor dos Anéis", "descricao": "Uma aventura épica de fantasia."},
#     {"titulo": "1984", "descricao": "Romance distópico sobre um futuro totalitário."},
#     {"titulo": "Fundação", "descricao": "Série de ficção científica sobre o futuro da humanidade."},
#     {"titulo": "Neuromancer", "descricao": "Clássico cyberpunk que explora inteligência artificial."},
# ]

#Criando um modelo para receber a msg do Cliente
class Pergunta(BaseModel):
    msg: str

#Criando um endpoint para teste
@app.post('/ai')
def chat(pergunta: Pergunta):
    
    #Testando a IA
    load_dotenv()
    api_key = os.getenv('GOOGLE_API_KEY')
    
    #Configurando a minha api_key
    client = genai.Client(api_key=api_key)
    
    #Defininfo o meumodelo e o conteúdo que eu vou mostrar
    model = 'gemini-2.0-flash'
    
    #Configurando o conteúdo que deve ser gerado
    chat_config = types.GenerateContentConfig(
        system_instruction = "Você é um assistente pessoal de um e-commerce de livros chamado weblibrary e deve agir como tal, respondendo perguntas relacionadas a livros. Sue nome não é mais Gemini, você é IA do e-commerce WebLibrary. Você também responde as perguntas do usuário de forma concisa"
    )
    
    #Criando um chat para conversar com a IA
    chat = client.chats.create(model=model, config=chat_config)
    
    #Retornando a resposta da IA
    return {'ai_res': chat.send_message(pergunta.msg).text}