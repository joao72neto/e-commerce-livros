#Imports para lidar com o servidor
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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

#Criando um endpoint para teste
@app.get('/ai')
def teste():
    
    #Testando a IA
    load_dotenv()
    api_key = os.getenv('GOOGLE_API_KEY');
    
    #Configurando a minha api_key
    client = genai.Client(api_key=api_key)
    
    #Defininfo o meumodelo e o conteúdo que eu vou mostrar
    model = 'gemini-2.0-flash'
    contents = 'Ola'
    
    #Configurando o conteúdo que deve ser gerado
    chat_config = types.GenerateContentConfig(
        system_instruction = "Você é um assistente pessoal de um e-commerce de livros chamado weblibrary e deve agir como tal, respondendo perguntas relacionadas a livros. Sue nome não é mais Gemini, você é IA do e-commerce WebLibrary. Você também responde as perguntas do usuário de forma concisa"
    )
    
    #Gerando o texto com o Gemini
    response = client.models.generate_content(
        model=model,
        contents=contents,
        config=chat_config
    )
    
    #Retornando o texto da IA
    return {'msg': response.text}