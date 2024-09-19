export default function TabItemContainer({children} : any) {
    return ( <ul 
                className="mb-5 flex list-none flex-row flex-wrap border-b-0 ps-0" 
                role="tablist"
                data-twe-nav-ref> {children}
            </ul>)
}