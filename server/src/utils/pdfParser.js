import fs from "fs";

export const parsePdf = async(filePath)=>{
const pdfModule = await import("pdf-parse");
     const pdf =
    pdfModule.default?.default || 
    pdfModule.default ||
    pdfModule;

    const buffer = fs.readFileSync(filePath);
    const data = await pdf(buffer);
    return data.text;
}