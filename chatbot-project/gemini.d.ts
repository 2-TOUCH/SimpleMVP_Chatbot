// types/gemini.d.ts or gemini.d.ts in project root

declare module '@google/generative-ai' {
    export class GoogleGenerativeAI {
      constructor(apiKey: string);
      getGenerativeModel(options: { model: string }): GenerativeModel;
    }
  
    export interface GenerativeModel {
      generateContent(prompt: string): Promise<GenerateContentResult>;
    }
  
    export interface GenerateContentResult {
      response: {
        text(): string;
      };
    }
  }