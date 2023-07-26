import { connectToDB } from "utils/database";
import Prompt from "app/models/prompt";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({
      creator: params.id,
    }).populate("creator");
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to fetch all prompts :(", { status: 500 });
  }
};