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
const genai_1 = require("@google/genai");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const ai = new genai_1.GoogleGenAI({ apiKey: process.env.API_KEY });
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield ai.models.generateContent({
                model: "gemini-2.0-flash",
                contents: [
                    { role: "user", parts: [{ text: `Strictly give the JSON format answere Give the moderate math 4 questions and attach with ans and options. And only in JSON format like {question: "Linear algebra solves the which problem", options: [{id: 1, option: "this problem" }, {id: 2, option: "that problem}], correctAnsId: 2 }`, }] }
                ]
            });
            console.log(response.text);
        }
        catch (error) {
            console.log("Something went wrong", error);
        }
    });
}
main();
