import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import GitHub from "next-auth/providers/github"
import "dotenv/config"

export const { handlers, auth, signIn, signOut } = NextAuth({
  session:{ strategy:'jwt' },
  adapter: PrismaAdapter(prisma),
  //setting provider when usign OAuth
  /* providers: [ GitHub({    
      clientId: process.env.GITHUB_ID ,
      clientSecret: process.env.GITHUB_SECRET ,
     }),
   ],
  */
  providers:[GitHub],
  callbacks:{
    async jwt({token,user}){
        if(user){
            token.id =user.id;
            token.name= user.name;
        }
        return token;
    },
    async session({session,token}){
        if(session.user){
            session.user.id! = token.id as string;
            session.user.name=token.name as string;
        }
        return session;
    }
  }
})
