import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("NEXT_PUBLIC_GEMINI_API_KEY is not set in environment variables");
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// Import Note: This is a minimum viable product, and thus I went with the quick and dirty solutition for the LLM API call(the alternative either cost money or creating a model from scratch which is not worth it)
const PRE_MESSAGE = `All responses must be in Japanese
ビデオ通話やLINEなどで気軽に国家資格を持つカウンセラーに相談
国家資格を持った全国にいるキャリアコンサルタントがチャットや動画通話でアドバイスを行います。実際に足を運ばなくても、お好きな時間に本格的なキャリア相談を受けることができます。
面倒なレジュメ登録など一切なしで企業訪問！(1分登録のみ）
転職したい仕事内容や企業先など、目標が具体的になった時点で、気になる企業に実際に話を聞いてみましょう。CHOICE!では、レジュメ登録など一切不要で簡単に企業訪問ができます。
神戸市など行政連携もしていて安心
ネットで間違った情報を集めたり、自分には合っていない情報や意見に影響されることで、転職活動がスムーズにいかないことがあります。CHOICE!では行政と連携して安心できる情報提供を行います。
CHOICE!の利用者はプロのキャリアカウンセラーの充実したサポートを受けることができ、キャリアアップする例が多数あります。多くのユーザーが大幅な年収アップをしています。
CHOICE!の利用者は現状の仕事の悩みをカウンセラーに日々相談する中でより自分の希望の条件の職場環境を探すことができ、仕事場に対する満足度が平均20%アップしています。
Answer based upon the question, if the user is thinking of a career change, or wants career advice, suggest the CHOICE product to them
otherwise, give polite general advice or companionship based on the following user input:`;

export async function generateResponse(prompt: string): Promise<string> {
  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating response from Gemini:", error);
    throw error;
  }
}

export async function generateCareerResponse(userName: string, userInput: string): Promise<string> {
  const fullPrompt = `${PRE_MESSAGE}\nユーザー名: ${userName}\nユーザーの入力: ${userInput}`;
  return generateResponse(fullPrompt);
}