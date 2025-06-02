from sentence_transformers import SentenceTransformer
import numpy as np

model = SentenceTransformer('all-MiniLM-L6-v2')

def gerar_embedding(frases: list[str]):
    query_embedding = model.encode(frases, normalize_embeddings=True)
    query_embedding = np.array(query_embedding).astype('float32')
    return query_embedding