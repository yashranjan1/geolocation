import "next-auth"

declare module "next-auth" {
    interface User {
        _id?: string;
        isVerified?: boolean;
        username?: string;
        avatar?:string;
        role?:string;
    }
    interface Session {
        user: {
            id?: string;
            isVerified?: boolean;
            username?: string;
            avatar?:string;
            role?:string;
        } & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        _id?: string;
        isVerified?: boolean;
        username?: string;
        avatar?:string;
        role?:string;
    }
}