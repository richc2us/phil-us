"use client"
import { Session } from "next-auth"
import {  SessionProvider } from "next-auth/react"
import React  from "react"

export interface AuthProviderProps {
    children: React.ReactNode,
    session: Session | null
}

export const AuthSessionProvider = ({children, session} : AuthProviderProps) => {
    return (<SessionProvider session={session} refetchOnWindowFocus={true} refetchWhenOffline={false} refetchInterval={0} >{children}</SessionProvider>)
}