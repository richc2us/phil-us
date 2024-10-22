import { useSearchParams } from "next/navigation"

export default function TabDetail({children, index = 0, defaultTab = 0} : {children: any, index : number, active?: boolean, defaultTab?: number}) {
    const searchParams = useSearchParams()
    const tabDefault = searchParams.get('tab')?? defaultTab
    const finalActive = index == tabDefault
    const isActive = finalActive ? {"data-twe-tab-active" : "true" } :  {}
    
    return (<div
        className={"hidden " + ( finalActive ? "opacity-100" : "opacity-0") + " transition-opacity duration-150 ease-linear data-[twe-tab-active]:block"}
        id={"tabs-"+index}
        role="tabpanel"
        aria-labelledby={"tabs-"+ index +"-tab"}
        aria-selected={finalActive ? "true" : "false"}
        key={"tab-index-"+index}
        {...isActive}
        >
            {children}
        </div>)
}