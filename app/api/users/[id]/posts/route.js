import { connectToDB } from "@utils/database";
import Prompt from '@models/prompt';

//~ get all prompts related to the logged in creator , (For Profile Page)
export const GET = async (req, { params }) => {
    try {
        await connectToDB();

        const prompts = await Prompt.find({
            creator: params.id
        }).populate('creator');
        return new Response(JSON.stringify(prompts), { status: 200 });

    } catch (err) {
        console.log("🚀 ~ file: route.js:13 ~ GET ~ err:", err);
        return new Response("Failed to fetch all prompts", { status: 500 });
    }

}

