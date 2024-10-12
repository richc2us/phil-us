"use client"

import { TabsContext } from "./TabsContext"

export function TabsContextProvider({id, children} : {id:string, children : any}) {
    return (<TabsContext.Provider value={id}>{children}</TabsContext.Provider>)
}