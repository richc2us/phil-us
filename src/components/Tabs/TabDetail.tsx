
export default function TabDetail({children, index = 0, active = false} : {children: any, index : number, active?: boolean}) {
    const finalActive = active
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