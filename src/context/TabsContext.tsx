import { createContext, useContext } from "react";

const TabsParam = {
    counter: 0,
    setCounter: (c:any) => { }
}

const TabsContext = createContext(TabsParam)

function useTab() {
    return useContext(TabsContext)
}

export { TabsContext, useTab, TabsParam }