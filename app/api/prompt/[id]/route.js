import { connectToDB } from "@utils/database";
import Prompt from '@models/prompt';

//~ GET (read) , get one prompt by id (For UpdatePrompt Form page - to put the prompt values into inputs)
export const GET = async (req, { params }) => {
    try {
        await connectToDB();

        const prompt = await Prompt.findById(params.id).populate('creator');
        if (!prompt) return new Response("Prompt not found", { status: 404 })
        return new Response(JSON.stringify(prompt), { status: 200 });

    } catch (err) {
        console.log("🚀 ~ file: route.js:13 ~ GET ~ err:", err);
        return new Response("Failed to fetch prompt", { status: 500 });
    }

}

//~ PATCH (update)
export const PATCH = async (req, { params }) => {
    const { prompt, tag } = await req.json()
    try {
        await connectToDB();

        const existingPrompt = await Prompt.findById(params.id);
        if (!existingPrompt) return new Response("Prompt not found", { status: 404 })

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), { status: 200 })

    } catch (err) {
        console.log("🚀 ~ file: route.js:37 ~ PATCH ~ err:", err);
        return new Response("Failed to update the prompt", { status: 500 })
    }
}

//~ Delete (delete)
export const DELETE = async (req, { params }) => {
    try {
        await connectToDB();

        await Prompt.findByIdAndRemove(params.id);
        return new Response("Prompt deleted successfully", { status: 200 });

    } catch (err) {
        console.log("🚀 ~ file: route.js:46 ~ DELETE ~ err:", err);
        return new Response("Failed to delete the prompt", { status: 500 })
    }
}

