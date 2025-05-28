#Imports para lidar com o servidor
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

#Imports para lidar com a IA generativa
from google import genai
from google.genai import types
import os
from dotenv import load_dotenv

#importando funções própria
from apis import livros as lvr
from filtro import embeddings as ebd
from filtro import faiss_index as fid

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

#Criando o index faiss filtrado
livros = lvr.buscar_todos_livros()
text = [livro['lvr_titulo'] + " com custo de " + livro['lvr_preco'] + " " + livro['lvr_sinopse'] for livro in livros]
books_embedding = ebd.gerar_embedding(text)
index = fid.criar_index_faiss(books_embedding)
    
#Configurando a IA
load_dotenv()
api_key = os.getenv('GOOGLE_API_KEY')

#Configurando a minha api_key
client = genai.Client(api_key=api_key)

#Defininfo o meumodelo e o conteúdo que eu vou mostrar
model = 'gemini-2.0-flash'
    
#Preparando a intrução para a IA
system_instruction = (
    "Você é um assistente pessoal de um e-commerce de livros chamado weblibrary e deve agir como tal, respondendo perguntas relacionadas a livros. Sue nome não é mais Gemini, você é IA do e-commerce WebLibrary. Além disso você deve agir de forma amígavel e persuasiva ao mesmo tempo, a fim de fazer com que o vendedor se interesse em comprar determinado tipo de livro \n------------------------------------\nUse as informações que serão enviadas via chat precedidas do seguinte texto 'Dados a serem considerados na conversa: ', você não responde nada sobre esses dados a não ser que o cliente requisite, eles vão servir de base para as respostas, o cliente pergunta alguma coisa sobre um livro, você olha os dados e com base neles responde o cliente. As respostar precisam ser respondidas de forma concisa, evite responder algum muito grande na primeira msg que o cliente mandar, se for um oi, ola, responda sucintamente. Novos dados virão conforme a conversa é desenrolada, você apenas considera eles conforme a conversa vai seguindo, nunca fuja dos dados, qualquer desvio não deixaria claro o que o e-commerce de fato tem e não tem para o cliente:\n\n"
)
       
#Configurando o conteúdo que deve ser gerado
chat_config = types.GenerateContentConfig(
    system_instruction = system_instruction
)

#Criando um chat para conversar com a IA
chat = client.chats.create(model=model, config=chat_config)
        
#Criando um modelo para receber a msg do Cliente
class Pergunta(BaseModel):
    msg: str

#Criando um endpoint para teste
@app.post('/ai')
def chatbot(pergunta: Pergunta):
    
    #Gerando embedding da pergunta do usuário
    query_embedding = ebd.gerar_embedding([pergunta.msg])
    
    #Buscando os três livros mais próximos
    k = 3
    _, indices = index.search(query_embedding, k)

    #Montando um contexto para a IA
    context = 'Dados a serem considerados na conversa: \n\n'
    for i in indices[0]:
        livro = livros[i]
        context += f'Título: {livro['lvr_titulo']}\nDescrição: {livro['lvr_sinopse']}\n\nPreço {livro['lvr_preco']}\n'
    
    line = '-------------------------------'
    
    #Retornando a resposta da IA
    return {'ai_res': chat.send_message(f'{pergunta.msg}\n{line}\n{context}').text}
