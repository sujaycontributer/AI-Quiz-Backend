
import {GoogleGenAI} from "@google/genai";
import dotenv from 'dotenv'

dotenv.config();
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY});

async function main() {
  try{
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: [
            {role: "user", parts: [{text: `Strictly give the JSON format answere Give the moderate math 4 questions and attach with ans and options. And only in JSON format like {question: "Linear algebra solves the which problem", options: [{id: 1, option: "this problem" }, {id: 2, option: "that problem}], correctAnsId: 2 }`,}]}
        ]
    });
    console.log(response.text);
  }catch (error) {
    console.log("Something went wrong", error)
  }
}

main();

