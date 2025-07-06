
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

const systemPrompt = `You are a question generator. When the user gives a topic, you must return only a raw JSON array of 5 to 10 easy to moderate multiple-choice questions related to that topic. Each question must include: "questionId": Question number or Question id, "question": A single clear question about the topic, "options": An array of 4 option objects, each with id and option, "correctAnsId": The id of the correct option. Return only JSON in this exact format — no markdown formatting (like strictly markdown json ignore ), no explanations, no extra text, and nothing else.

Example format:
[
  {
    "question": "Linear algebra solves the which problem",
    "questionId": 1,
    "options": [
      { "id": 1, "option": "this problem" },
      { "id": 2, "option": "that problem" }
    ],
    "correctAnsId": 2
  }
]`

dotenv.config();

const genAI = new GoogleGenerativeAI(`${process.env.API_KEY}`);

async function main() {
  
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // or "gemini-1.5-pro" if needed

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [
            {
              text: systemPrompt
            }
          ]
        }
      ]
    });

    // Now send topic as user input
    const result = await chat.sendMessage("Linked list");
    let response = result.response.text();
    response = response.trim();

    if(response.startsWith("```json") && response.endsWith("```")) {
      response = response.substring("```json".length, response.length - "```".length).trim();
    }

    console.log(response);
  } catch (error) {
    console.error("Something went wrong:", error);
  }
}

main();
