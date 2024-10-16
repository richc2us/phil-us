
export default function TabItem({children,  index = 0, tabDefault = 0} : {children: any, index : number,tabDefault? : number}) {
    const finalActive = tabDefault == index
    const isActive =  finalActive ? {"data-twe-nav-active" : "true" } :  {}

    return (
        <li role="presentation">
            <a
            href={"#tabs-" + index}
            className="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[twe-nav-active]:border-primary data-[twe-nav-active]:text-primary dark:text-white/50 dark:hover:bg-neutral-700/60 dark:data-[twe-nav-active]:text-primary"
            data-twe-toggle="pill"
            data-twe-target={"#tabs-" + index}
            aria-controls={"tabs-" + index}
            aria-selected={finalActive ? "true" : "false"}
            role="tab"
            {...isActive}
            >
                {children}
            </a>
        </li>
    )
}