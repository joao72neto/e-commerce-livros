import os
from google import genai
from google.genai import types
from dotenv import load_dotenv
from config import system_instruction as sys

#Configurando a IA
load_dotenv()
api_key = os.getenv('GOOGLE_API_KEY')

#Configurando a minha api_key
client = genai.Client(api_key=api_key)

#Defininfo o meumodelo e o conteúdo que eu vou mostrar
model = 'gemini-2.0-flash'
    
#Configurando o conteúdo que deve ser gerado
chat_config = types.GenerateContentConfig(
    system_instruction = sys.ai_intruction()
)

#Criando um chat para conversar com a IA
def ai_chat():
    chat = client.chats.create(model=model, config=chat_config)
    return chat

