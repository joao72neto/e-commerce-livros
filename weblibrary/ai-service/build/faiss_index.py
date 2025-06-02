import faiss

def criar_index_faiss(vetores):
    dim = vetores.shape[1]
    index = faiss.IndexFlatL2(dim)
    index.add(vetores)
    return index