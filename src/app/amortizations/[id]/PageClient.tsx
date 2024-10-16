"use client"
import {Tab, TabDetail, TabDetailContainer, TabItem, TabItemContainer} from "@/components/Tabs/index";
import { IDContextProvider } from "@/context/IDContextProvider";
import TabOverview from "./TabOverview";
import TabSchedules from "./TabSchedules";
import TablDetails from "./TabDetails";
import TabPayments from "./TabPayments";
import { useSearchParams } from "next/navigation";


export default function PageClient({ id, document } : {id: string, document:any}) {

    return(
        <IDContextProvider id={id}>
            <Tab>
                <TabItemContainer >
                    <TabItem index={0}>
                        Overview
                    </TabItem>
                    <TabItem index={1} >
                        Details
                    </TabItem>
                    <TabItem index={2}>
                        Schedules
                    </TabItem>
                    <TabItem index={3}>
                        Payment
                    </TabItem>
                </TabItemContainer>

                <TabDetailContainer>
                    <TabDetail index={0}  >
                        {/* <div className="grid"> */}
                            <TabOverview document={document}/>
                        {/* </div> */}
                    </TabDetail>
                    <TabDetail index={1}>
                            <TablDetails/>
                    </TabDetail>
                    <TabDetail index={2} >
                            <TabSchedules/>
                    </TabDetail>
                    <TabDetail index={3} >
                            <TabPayments/>
                    </TabDetail>
                </TabDetailContainer>

            </Tab>
        </IDContextProvider>
    )
}