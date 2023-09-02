import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';

import { connectToDB } from '@utils/database'

import User from '@models/user';


const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],

    //~ Callbacks are asynchronous functions you can use to control what happens when an action is performed.
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({ email: session.user.email });

            //* Update id
            session.user.id = sessionUser._id.toString();

            return session;
        },
        async signIn({ profile }) {
            try {
                await connectToDB();

                //~ check if user already exists
                const userExists = await User.findOne({ email: profile.email })

                //~ if not , create a new user and save it into database
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture
                    })
                }

                //* if we sign in successfully return true
                return true;
            } catch (err) {
                console.log("🚀 ~ file: route.js:47 ~ signIn ~ err:", err)
                return false;
            }
        }
    }

})

export { handler as GET, handler as POST };


