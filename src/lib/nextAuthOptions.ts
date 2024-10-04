import { AuthOptions, getServerSession } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import dbConnect from "./mongodb"
import User from "@/models/users"
import bcrypt from "bcryptjs";
import { registerAfterSignIn } from "@/actions/actions"
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next"

const nextAuthOptions : AuthOptions = {
    // useSecureCookies:true,
    providers :[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID?? "",
            clientSecret: process.env?.GOOGLE_CLIENT_SECRET ?? ""
        }),
        Credentials({
            credentials: {
                email : {
                    label: "Email", type : "text"
                },
                password: {label: "Password", type : "password" }
            },
            authorize : async(credentials) => {
                await dbConnect()
                // console.dir({credentials, asd : 'asd'})
                const user = await User.findOne({
                    email: credentials?.email,
                }).select("+password")

                if(!user) {
                    return null
                    // throw new Error("Email not found! Please register")
                }
                if(!credentials?.password) {
                    throw new Error ("Password is empty")
                }

                const match = await bcrypt.compare(
                    credentials?.password,
                     user?.password
                )

                return user
            } ,
        })
    ],
    session : {
        strategy : "jwt"
    },
    callbacks: {
        async jwt({token, account}) {
            await dbConnect() 
            // console.dir({'jwt callbacks' : 'jwt',token, account})
            if(account?.provider === "google") {
                const registerIfNotExists = await registerAfterSignIn(token)
            }
            const dbUser = await User.findOne({email: token?.email})
            if(dbUser) {
                token.user_id = dbUser._id.toString()
            }
            return token ?? account?.access_token
        },
        async session({session, token, user}) {
            // console.dir({'sessions callbacks' : 'sessions',session, token, user})
            return {...session, user_id: token?.user_id}
        },
        async signIn({ user,  profile}) {
            // console.dir({'signIn callbacks' : 'signIn',user, profile})
            // if(account?.provider == "google") {
            //     return profile?.email && profile.email?.endsWith("@gmail.com")
            // }
            return true
        },
        // async signOut({session, token}) {
        //     console.dir({'signOut' : 'signOut', session, token })
        //     return true
        // },
    },
    events : {
        async signIn(message) {
            // console.dir({'signin events':'signin', message})
        },
        async signOut(message) {
            // console.dir({'signOut events':'signOut', message})
        },
        async createUser(message) {
            // console.dir({'createUser events':'createUser', message})
        },
        async updateUser(message) {
            // console.dir({'updateUser events':'updateUser', message})
        },
        async linkAccount(message){
            // console.dir({'linkAccount events':'linkAccount', message})
        },
        async session(message) {
            // console.dir({'session events':'session', message})
        }
    },
    // pages: {
    //     signIn : "/auth/signin",
    //     signOut: "/auth/signout",
    //     error: "/auth/error",
    //     verifyRequest: "/auth/verify-request",
    //     newUser : "/auth/new-user"
    // },
    logger : {
        error(code, metadata){
            // console.dir({
            //     'error' : 'error', code, metadata
            // })
        },
        warn(code) {
            // console.dir({
            //     'warn' : 'warn', code
            // })
        },
        debug(code, metadata) {
            // console.dir({
            //     'debug' : 'debug', code, metadata
            // })
        }
    }
}
// const b = NextAuth(nextAuthOptions);
// console.dir(b);
// export const { handlers, auth, signIn, signOut } =  b

export default nextAuthOptions

export async function auth(...args :  [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []) {
    return await getServerSession(...args, nextAuthOptions)
}