export default function TabDetail({children, index = 0, active = false} : {children: any, index : number, active?: boolean}) {
    const isActive = active ? {"data-twe-tab-active": true} : {}

    return (<div
        className={"hidden " + ( active ? "opacity-100" : "opacity-0") + " transition-opacity duration-150 ease-linear data-[twe-tab-active]:block"}
        id={"tabs-"+index}
        role="tabpanel"
        aria-labelledby={"tabs-"+ index +"-tab"}
        {...isActive}
        >
            {children}
        </div>)
}