import numpy as np

#Definindo as intenções
intents = {
    "search_book": [
        "Quais livros vocês têm disponíveis?",
        "Você pode me mostrar alguns livros?",
        "Tem alguma recomendação de leitura?",
        "Me indique um livro, por favor.",
        "Quero ver os livros disponíveis.",
        "O que você tem aí para eu ler?",
        "Pode me sugerir algo para ler?",
        "Mostra alguns títulos interessantes.",
        "Quero comprar um livro.",
        "Você recomenda algum título hoje?",
        "Tem alguma novidade em livros?",
        "Me fala mais sobre os livros que você tem.",
        "Estou procurando algo para ler.",
        "Pode mostrar alguns livros de ficção?",
        "Estou em dúvida, o que você sugere?",
        "Você pode me ajudar a escolher um livro?",
        "Tem algum livro bom para mim?",
        "O que está em alta na loja?",
        "Tem alguma promoção de livro?",
        "Pode me mostrar mais opções de livros?",
        "Tem algo de ação?",
        "Queria algo de suspense.",
        "Tem romance?",
        "Procuro algo leve.",
        "Tem livro sobre guerra?",
        "Queria uma fantasia épica.",
        "Tem alguma coisa estilo thriller?",
        "Você tem algo tipo Game of Thrones?",

    ]
}

#Funções que classificam as intenções
def cosine_similarity(v1, v2):
    return np.dot(v1, v2.T) / (np.linalg.norm(v1) * np.linalg.norm(v2))

def classificar_intencao(msg_usuario, gerar_embedding):
    intent_embeddings = {
        intent: gerar_embedding([exemplo])[0]
        for intent, exemplo in intents.items()
    }
    
    user_embedding = gerar_embedding([msg_usuario])[0]
    
    scores = {
        intent: cosine_similarity(user_embedding, emb)
        for intent, emb in intent_embeddings.items()
    }
    
    melhor_intent = max(scores, key=scores.get)
    
    if scores[melhor_intent] < 0.6:
        return "indefinida"
    
    return melhor_intent
