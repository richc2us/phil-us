"use client"
import TabBlock from "./(tab-blocks)/TabBlock";
import TabInfo from "./(tab-details)/TabInfo";
import TabMedia from "./(tab-media)/TabMedia";
import {Tab, TabDetail, TabDetailContainer, TabItemContainer} from "@/components/Tabs/index";
import TabBuyer from "./(tab-buyers)/TabBuyer";
import TabPost from "./(tab-posts)/TabPost";
import TabDocuments from "./(tab-documents)/TabDocuments";
import { TabOverview } from "./(tab-overview)/TabOverview";
import { IDContextProvider } from "@/context/IDContextProvider";


export default function PageClient({projectID} : { projectID : string}) {

return (<div className="p-4">
        <IDContextProvider id={projectID}>
                <Tab>
                        <TabItemContainer
                            items={[
                                "Overview",
                                "Details",
                                "Blocks/Lots",
                                "Buyers",
                                "Documents and Geographical",
                                "Post",
                                "Media"
                            ]}
                        />
                    
                    <TabDetailContainer>
                        <TabDetail index={0} active={true}>
                            <TabOverview projectID={projectID} />
                        </TabDetail>

                        <TabDetail index={1}>
                            <TabInfo />
                        </TabDetail>

                        <TabDetail index={2}>
                            <TabBlock/>
                        </TabDetail>

                        <TabDetail index={3}>
                            <TabBuyer/>
                        </TabDetail>

                        <TabDetail index={4}>
                            <TabDocuments/>
                        </TabDetail>

                        <TabDetail index={5}>
                            <TabPost/>
                        </TabDetail>

                        <TabDetail index={6}>
                            <TabMedia></TabMedia>
                        </TabDetail>

                    </TabDetailContainer>

                </Tab>
        </IDContextProvider>
    </div>
    )
}