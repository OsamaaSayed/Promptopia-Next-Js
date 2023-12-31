import { connectToDB } from "@utils/database";
import Prompt from '@models/prompt';

//~ get all prompts for all creators (For Home Page , Feed component)
export const GET = async (req) => {
    try {
        await connectToDB();

        const prompts = await Prompt.find({}).populate('creator');
        return new Response(JSON.stringify(prompts), { status: 200 });

    } catch (err) {
        console.log("🚀 ~ file: route.js:13 ~ GET ~ err:", err);
        return new Response("Failed to fetch all prompts", { status: 500 });
    }

}

