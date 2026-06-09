import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            email: string;
            role: string;
            firstname: string;
            lastname: string;
        }
    }

    interface User {
        id: string;
        email: string;
        role: string;
        firstname: string;
        lastname: string;
    }
}

