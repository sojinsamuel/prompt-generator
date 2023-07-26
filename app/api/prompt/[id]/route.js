import { connectToDB } from "utils/database";
import Prompt from "app/models/prompt";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate("creator");
    console.log("GET called", prompt);
    if (!prompt) return new Response("Prompt not found", { status: 404 });
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    console.error("GET failed:", error.message);
    return new Response("Failed to fetch the prompt :(", { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();
  try {
    await connectToDB();
    const exisitingPrompt = await Prompt.findById(params.id).populate(
      "creator"
    );
    if (!exisitingPrompt)
      return new Response("Prompt not found", { status: 404 });
    exisitingPrompt.prompt = prompt;
    exisitingPrompt.tag = tag;
    await exisitingPrompt.save();
    return new Response(JSON.stringify(`Saved: ${exisitingPrompt}`), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response("Failed to Update the prompt :(", { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndRemove(params.id);
    return new Response(
      JSON.stringify(`Deleted Succesfully: ${deletePrompt}`),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response("Failed to delete the prompt :(", { status: 500 });
  }
};
