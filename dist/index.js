"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const generative_ai_1 = require("@google/generative-ai");
const dotenv_1 = __importDefault(require("dotenv"));
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
]`;
dotenv_1.default.config();
const genAI = new generative_ai_1.GoogleGenerativeAI(`${process.env.API_KEY}`);
function main() {
    return __awaiter(this, void 0, void 0, function* () {
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
            const result = yield chat.sendMessage("Linked list");
            let response = result.response.text();
            response = response.trim();
            if (response.startsWith("```json") && response.endsWith("```")) {
                response = response.substring("```json".length, response.length - "```".length).trim();
            }
            console.log(response);
        }
        catch (error) {
            console.error("Something went wrong:", error);
        }
    });
}
main();
