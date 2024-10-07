// import  { auth } from "@/lib/nextAuthOptions"
import React  from "react"
import { AuthSessionProvider } from "./authSessionProvider"
import { redirect } from "next/navigation"

export interface AuthProviderProps {
    children: React.ReactNode,
    user:any
}
export const AuthProvider = ({children, user} : AuthProviderProps) => {
    // const session = await auth()
    if(!user) {
        redirect("/user/signin")
    }
    return (<AuthSessionProvider session={user}>{children}</AuthSessionProvider>)
}