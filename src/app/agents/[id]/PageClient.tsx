"use client"
import {Tab, TabDetail, TabDetailContainer, TabItem, TabItemContainer} from "@/components/Tabs/index";
import { IDContextProvider } from "@/context/IDContextProvider";
import { DetailTab } from "./DetailTab";


export default function PageClient({ id, document } : {id: string, document:any}) {
    return(
        <IDContextProvider id={id}>
            <Tab>
                <TabItemContainer defaultTab={1} items={[
                                "Overview",
                                "Details",
                                "Buyers"]} />

                <TabDetailContainer>
                    <TabDetail index={0} >
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
                            Realty Linked
                        </div>
                    </TabDetail>

                    <TabDetail index={1} defaultTab={1}>
                        <DetailTab document={document} />
                    </TabDetail>

                    <TabDetail index={2}>
                        Buyers
                    </TabDetail>
                </TabDetailContainer>

            </Tab>
        </IDContextProvider>
    )
}