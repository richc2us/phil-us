"use client"
import {Tab, TabDetail, TabDetailContainer, TabItem, TabItemContainer} from "@/components/Tabs/index";
import { IDContextProvider } from "@/context/IDContextProvider";
import { DetailTab } from "./DetailTab";


export default function PageClient({ id, document } : {id: string, document:any}) {
    return(
        <IDContextProvider id={id}>
            <Tab>
                <TabItemContainer>
                    <TabItem index={0} >
                        Overview
                    </TabItem>
                    <TabItem index={1} active={true}>
                        Details
                    </TabItem>
                    <TabItem index={2}>
                        Buyers
                    </TabItem>
                </TabItemContainer>

                <TabDetailContainer>
                    <TabDetail index={0} >
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
                            Real Estate Linked
                        </div>
                    </TabDetail>

                    <TabDetail index={1} active={true}>
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