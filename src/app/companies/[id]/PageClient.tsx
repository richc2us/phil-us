"use client"
import { IDContextProvider } from "@/context/IDContextProvider";
import DetailsTab from "./DetailsTab";
import { Tab, TabDetail, TabDetailContainer, TabItem, TabItemContainer } from "@/components/Tabs";

export default function PageClient({id, company} : {id: string, company:any}) {

    return (
        <IDContextProvider id={id}>
                <Tab>
                    <TabItemContainer>
                        <TabItem index={0}>
                            Overview
                        </TabItem>
                        <TabItem index={1}>
                            Details
                        </TabItem>
                        <TabItem index={2}>
                            Projects
                        </TabItem>
                    </TabItemContainer>

                    <TabDetailContainer>
                        <TabDetail index={0}>
                            Overview
                        </TabDetail>

                        <TabDetail index={1}>
                            <DetailsTab company={company} />
                        </TabDetail>

                        <TabDetail index={2}>
                            <p>Show list of projects</p>
                        </TabDetail>
                    </TabDetailContainer>

                </Tab>
        </IDContextProvider>
    )
}