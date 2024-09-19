export default function TabDetail({children, index = 0} : {children: any, index : number}) {

    return (<div
        className="hidden opacity-100 transition-opacity duration-150 ease-linear data-[twe-tab-active]:block"
        id={"tabs-"+index}
        role="tabpanel"
        aria-labelledby={"tabs-"+ index +"-tab"}>
            {children}
        </div>)
}