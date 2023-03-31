// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Article } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const keys: (keyof Article)[] = ["topic", "characterLimit", "title", "body"];
const regex =
  /Topic:\s*([\s\S]+?)\n\s*Character\s*limit:\s*([\s\S]+?)\n\s*Title:\s*([\s\S]+?)\n\s*Body:\s*([\s\S]+)/i;

const generateArticleText = (title: string, characterCount: number) => {
  return `As a writer, I want you to create an article on a given topic, ensuring it is Google SEO compatible. When developing the article, provide a suggested title and focus on the content. The answer will use the language type of the topic. Keep the article under ${characterCount} characters. Our first topic is '${title}'. Please provide the specific topic ('${title}') and character limit ('${characterCount}'), and I will generate a title and body for the article. Please explain everything in Turkish.`;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { title, characterCount, token } = req.body;

    const config = new Configuration({
      apiKey: token || process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(config);

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: generateArticleText(title, characterCount) },
      ],
    });

    const text = completion.data.choices
      .map((choice: any) => choice.message.content)
      .join("\n");

    const obj: Article = {
      topic: "",
      characterLimit: "",
      title: "",
      body: "",
    };

    const matches = text.match(regex);

    if (matches) {
      keys.forEach((key, index) => {
        obj[key] = matches[index + 1].trim();
      });
    }

    res.json(obj);
  } catch (error: any) {
    res
      .status(error.status || 500)
      .json({ message: error?.data?.response?.message || error.message });
  }
}
