import nextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/userModel";
import {connect} from "@/dbConfig/dbConfig";
import bcryptjs from "bcryptjs";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {label: "Email", type: "text", placeholder: "email"},
        password: {label: "Password", type: "password"},
      },
      async authorize(credentials) {
        connect();

        const {email, password} = credentials;
        const user = await User.findOne({email});
        if (user) {
          const validPassword = await bcryptjs.compare(password, user.password);
          if (!validPassword) {
            return null;
          }
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({token, user, session}) {
      if (user) {
        return {
          ...token,
          id: user._id,
          role: user.role,
          rewards: user.rewards,
        };
      }
      return token;
    },
    async session({session, token, user}) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.rewards = token.rewards;
      return session;
    },
  },
  secret: process.env.TOKEN_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  debug: process.env.NODE_ENV === "development",
};

const handler = nextAuth(authOptions);
export {handler as GET, handler as POST};
