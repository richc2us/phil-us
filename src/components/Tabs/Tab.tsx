import { TabsContext } from "@/context/TabsContext";
import { useEffect } from "react"
import {
    Tab as T,
    initTWE
} from "tw-elements";

export default function Tab({defaultIndex="0",children} : any) {
    
    useEffect(() => {
        initTWE({ Tab : T })
    }, [])
    
    return (<TabsContext.Provider value={defaultIndex}>{ children }</TabsContext.Provider>)
}