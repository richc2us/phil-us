import { useSearchParams } from "next/navigation";
import TabItem from "./TabItem";

export default function TabItemContainer({items = [], defaultTab = 0, children} : any) {
    const searchParams = useSearchParams()
    const tabDefault = searchParams.get('tab')?? defaultTab
    return (
                <ul
                    className="mb-5 flex list-none flex-row flex-wrap border-b-0 ps-0"
                    role="tablist"
                    data-twe-nav-ref>
                    { items.map((item:any,key:any) => <TabItem tabDefault={parseInt(tabDefault+"")} index={key} key={key} >{item}</TabItem>) }
                    {/* {children} */}
                </ul>
    )
}