import OpenAI, { ClientOptions } from "openai";

// Null check .ENV var
if (!process.env.OPENROUTER_API_KEY) {
  throw new Error("Missing variable: OPENROUTER_API_KEY");
}

// Null check .ENV var
if (!process.env.OPENROUTER_API_BASE_URL) {
  throw new Error("Missing variable: OPENROUTER_API_BASE_URL");
}

// Create config object
const config: ClientOptions = {
  baseURL: process.env.OPENROUTER_API_BASE_URL,
  apiKey: process.env.OPENROUTER_API_KEY,
};

// Create OpenAI instance
const openai = new OpenAI(config);

export default openai;

