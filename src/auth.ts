import NextAuth from "next-auth";
import bcrypt from "bcrypt";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "@/lib/users";



export const { auth, signIn, signOut, handlers } = NextAuth({
    secret: process.env.AUTH_SECRET,
    providers: [
        Credentials({
            name: "Credentials",

            credentials: {
                email: {},
                password: {},
            },

            async authorize(credentials) {

                console.log("AUTH_SECRET EXISTS:", !!process.env.AUTH_SECRET);

                const email = credentials?.email as string;
                const password = credentials?.password as string;

                

                if (!email || !password) 
                    return null;
                
                const user = await getUserByEmail(email);

               
                
                if (!user) 
                    return null;
                
                const passwordsMatch = await bcrypt.compare(
                    password,
                    user.password_hash
                );
                if (!passwordsMatch) 
                    return null;
                

                return {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                    firstname: user.firstname,
                    lastname: user.lastname
                };
            },
        }),
    ], 
    session: { strategy: "jwt" },

    
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.firstname = user.firstname;
                token.lastname = user.lastname;
            } return token;
        },
        session({ session, token }) {
          

            session.user = session.user ?? ({} as any);
            
            session.user.id = token.id as string;
            session.user.role = token.role as string;
            session.user.firstname = token.firstname as string;
            session.user.lastname = token.lastname as string;

           
            return session;
        },
    },
});