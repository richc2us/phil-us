import  { auth } from "@/lib/nextAuthOptions"
import React  from "react"
import { AuthSessionProvider } from "./authSessionProvider"
import { redirect } from "next/navigation"

export interface AuthProviderProps {
    children: React.ReactNode
}
export const AuthProvider = async({children} : AuthProviderProps) => {
    const session = await auth()
    if(!session) {
        redirect("/user/signin")
    }
    return (<AuthSessionProvider session={session}>{children}</AuthSessionProvider>)
}