import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "app/models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });
      session.user.id = sessionUser._id.toString();
      return session;
    },

    async signIn({ profile }) {
      try {
        await connectToDB();
        // check if that user already exist
        const isUserExist = await User.findOne({
          email: profile.email,
        });
        // if not, create a new user
        if (!isUserExist) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(/\s/g, "").toLowerCase(),
            image: profile.picture,
          });
        }
        return true;
      } catch (error) {
        console.error(error);
      }
    },
  },
});

export { handler as GET, handler as POST };
