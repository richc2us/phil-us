import { createContext, useContext } from "react";
const TabsContext = createContext("0")

function useTab() {
    return useContext(TabsContext)
}

export { TabsContext, useTab }