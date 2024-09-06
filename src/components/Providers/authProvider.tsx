"use client"
import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import React, { useEffect, useState } from "react"

export interface AuthProviderProps {
    children: React.ReactNode
}
export const AuthProvider = ({children} : AuthProviderProps) => {

    const [session , setSession] = useState()
    useEffect(() => {
        fetch('/api/auth/session').then(r => r.json()).then( (r) => setSession(r) )
    },[])

    return (<SessionProvider session={session} refetchOnWindowFocus={true} refetchWhenOffline={false} refetchInterval={0} >{children}</SessionProvider>)
}