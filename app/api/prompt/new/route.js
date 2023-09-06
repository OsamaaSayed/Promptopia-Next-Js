import { connectToDB } from "@utils/database";
import Prompt from '@models/prompt'

export const POST = async (req) => {
    const { userId, prompt, tag } = await req.json();

    try {
        await connectToDB();

        //~ create a new prompt
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        })

        //~ save the new prompt into database
        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), { status: 201 })

    } catch (err) {
        console.log("🚀 ~ file: route.js:24 ~ POST ~ err:", err)
        return new Response(JSON.stringify({ message: "Failed to create a new prompt", err: [err.errors.prompt, err.errors.tag] }), { status: 500 })
    }
}


