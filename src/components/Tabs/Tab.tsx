import { useEffect } from "react"
import {
    Tab as T,
    initTWE
} from "tw-elements";

export default function Tab({children} : any) {

    useEffect(() => {
        initTWE({ Tab : T })
    }, [])
    
    return (<>{ children }</>)
}