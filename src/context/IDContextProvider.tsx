"use client"

import { IDContext } from "./IDContext"

export function IDContextProvider({id, children} : {id:string, children : any}) {
    return (<IDContext.Provider value={id}>{children}</IDContext.Provider>)
}