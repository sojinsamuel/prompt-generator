import { connectToDB } from "utils/database";
import Prompt from "app/models/prompt";

export const POST = async (req, res) => {
  const { userId, prompt, tag } = await req.json();
  try {
    await connectToDB();
    const newPrompt = await Prompt({
      creator: userId,
      prompt,
      tag,
    }).save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(error.message, { status: 500 });
  }
};
