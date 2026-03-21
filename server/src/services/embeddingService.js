// Embedding:- Conversion of the chunk data into vector arrays so, that they are understandable by machine.

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
export async function embedChunks(chunks){
    try{
        const embeddings = await Promise.all(
            chunks.map(async(chunk)=>{
                const vector = await embedText(chunk);
                return {
            text:chunk,
            vector,
                };
            })
        );
        return embeddings;
    }catch(error){
        console.log("An error occurred while embedding chunks.",error);
        throw error;
    }
}

