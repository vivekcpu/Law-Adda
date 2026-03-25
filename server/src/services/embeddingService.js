// Embedding:- Conversion of the chunk data into vector arrays so, that they are understandable by machine.

import crypto from "crypto";
const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434/api/embeddings';

// Text embedding feature
export async function embedText(text){
    try{
        const response = await fetch(OLLAMA_URL,{
            method: 'POST',
            headers: {
            "Content-Type":"application/json", // header for JSON type format
        },
        body: JSON.stringify({
    model:"nomic-embed-text", // Model for ollama text embedding
    prompt:text,
}),
        });

const data = await response.json();
console.log("Ollama response",data);

if(!data.embedding){
    throw new Error('No embedding returned from Ollama');
}
return data.embedding; 
    }catch(error){
console.error('Error embedding text:', error);
throw error;
    }
};

// Embed chunks to embed ecery chunk using text embedding
export async function embedChunks(chunks,docId,fileName){
    try{
        const embeddings = await Promise.all(
            chunks.map(async(chunk,index)=>{
                const vector = await embedText(chunk);
                return {
            id: crypto.randomUUID(),
            text:chunk,
            vector,
            file: fileName || "unknown",
            docId: docId,             
            chunkIndex: index ,        
                };
            })
        );
        return embeddings;
    }catch(error){
        console.log("An error occurred while embedding chunks.",error);
        throw error;
    }
}

