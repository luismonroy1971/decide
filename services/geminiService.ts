
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY for Gemini is not set in environment variables. AI features will be disabled.");
}

const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

export const generatePersonalizedMessage = async (project: string, name: string, interest: string): Promise<string> => {
  if (!ai) {
    return `Hola equipo de Decide, mi nombre es ${name}. Estoy muy interesado/a en el proyecto ${project}. Me gustaría saber más sobre ${interest}. ¡Gracias!`;
  }
  
  try {
    const prompt = `Eres un asistente amigable y profesional para la inmobiliaria "Decide". Un cliente potencial llamado "${name}" está interesado en el proyecto "${project}". Su interés específico es: "${interest}". Escribe un mensaje corto y cordial (en español, máximo 4 oraciones) para que esta persona pueda copiar y pegar en un formulario de contacto. El mensaje debe sonar natural y humano.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error generating message with Gemini:", error);
    // Fallback message
    return `Hola equipo de Decide, mi nombre es ${name}. Estoy muy interesado/a en el proyecto ${project}. Me gustaría saber más sobre ${interest}. ¡Gracias!`;
  }
};
