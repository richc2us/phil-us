import { createContext, useContext } from "react";

const IDContext = createContext("")

function usePageID() {
    return useContext(IDContext)
}

export { IDContext, usePageID }