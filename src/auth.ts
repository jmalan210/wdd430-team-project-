import NextAuth from "next-auth";
import bcrypt from "bcrypt";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "@/lib/users";



export const { auth, signIn, signOut, handlers } = NextAuth({
    providers: [
        Credentials({
            name: "Credentials",

            credentials: {
                email: {},
                password: {},
            },

            async authorize(credentials) {
                const email = credentials?.email as string;
                const password = credentials?.password as string;

                if (!email || !password) {
                    return null;
                }
                const user = await getUserByEmail(email);
                if (!user) {
                    return null;
                }
                const passwordsMatch = await bcrypt.compare(
                    password,
                    user.password_hash
                );
                if (!passwordsMatch) {
                    return null;
                }

                return {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                };
            },
        }),
    ], 
    session: { strategy: "jwt" },

    
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.role = user.role;
            } return token;
        },
        session({ session, token }) {
            session.user.role = token.role as string;
            return session;
        },
    },
});