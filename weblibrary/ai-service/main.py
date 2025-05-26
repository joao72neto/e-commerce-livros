#importando o banco
from database.connection import SessionLocal

#Imports para lidar com o servidor
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

#Imports para lidar com a IA generativa
from google import genai
from google.genai import types
import os
from dotenv import load_dotenv

#Importa para filtro de dados com FAISS
import faiss
from sentence_transformers import SentenceTransformer
import numpy as np


#Criando o app do FastAPI
app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

#Configurando o CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

#Dados fictícios dos livros
livros = [
    {"titulo": "O Senhor dos Anéis", "descricao": "Uma aventura épica de fantasia."},
    {"titulo": "1984", "descricao": "Romance distópico sobre um futuro totalitário."},
    {"titulo": "Fundação", "descricao": "Série de ficção científica sobre o futuro da humanidade."},
    {"titulo": "Neuromancer", "descricao": "Clássico cyberpunk que explora inteligência artificial."},
]

#Gerando embeddings dos livros ao iniciar o sistema
model_embedding = SentenceTransformer('all-MiniLM-L6-v2');
texts = [livro['titulo'] + " " + livro['descricao'] for livro in livros]
embeddings = model_embedding.encode(texts, normalize_embeddings=True)
embeddings = np.array(embeddings).astype('float32')

#Criando o index FAISS
dim = embeddings.shape[1]
index = faiss.IndexFlatL2(dim)
index.add(embeddings)

#Criando um modelo para receber a msg do Cliente
class Pergunta(BaseModel):
    msg: str

#Criando um endpoint para teste
@app.post('/ai')
def chat(pergunta: Pergunta):
    
    #FILTRANDO OS DADOS COM FAISS
    
    #Gerando a query da pergunta do usuário
    query_embedding = model_embedding.encode(
        [pergunta.msg],
        normalize_embeddings=True
    )
    query_embedding = np.array(query_embedding).astype('float32')
    
    #Buscando os três livros mais próximos
    k = 3
    _, indices = index.search(query_embedding, k)

    #Montando um contexto para a IA
    context = ''
    for i in indices[0]:
        livro = livros[i]
        context += f'Título: {livro['titulo']}\nDescrição: {livro['descricao']}\n\n'
    
    #Preparando a intrução para a IA
    system_instruction = (
        "Você é um assistente pessoal de um e-commerce de livros chamado weblibrary e deve agir como tal, respondendo perguntas relacionadas a livros. Sue nome não é mais Gemini, você é IA do e-commerce WebLibrary. \n------------------------------------\nUse as informações dos livros abaixo para responder às perguntas de forma concisa:\n\n" + context
    )
   
    #INICIALIZANDO A IA
   
    #Obtendo a api_key
    load_dotenv()
    api_key = os.getenv('GOOGLE_API_KEY')
    
    #Configurando a minha api_key
    client = genai.Client(api_key=api_key)
    
    #Defininfo o meumodelo e o conteúdo que eu vou mostrar
    model = 'gemini-2.0-flash'
    
    #Configurando o conteúdo que deve ser gerado
    chat_config = types.GenerateContentConfig(
        system_instruction = system_instruction
    )
    
    #Criando um chat para conversar com a IA
    chat = client.chats.create(model=model, config=chat_config)
    
    #Retornando a resposta da IA
    return {'ai_res': chat.send_message(pergunta.msg).text}
