"use client"
import { SessionProvider } from "next-auth/react"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"

export interface AuthProviderProps {
    children: React.ReactNode
}
export const AuthProvider = ({children} : AuthProviderProps) => {
    const [session , setSession] = useState()
    const router = useRouter()

    useEffect( () => {
        fetch('/api/auth/session').then(r => r.json()).then( (r) => {
            if(Object.keys(r).length > 0) {
                setSession(r)
            } else {
                router.push("/user/signin")
            }
        })
    } , [] )

    return (<SessionProvider session={session} refetchOnWindowFocus={true} refetchWhenOffline={false} refetchInterval={0} >{children}</SessionProvider>)
}