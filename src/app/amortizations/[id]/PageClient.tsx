"use client"
import {Tab, TabDetail, TabDetailContainer, TabItem, TabItemContainer} from "@/components/Tabs/index";
import { IDContextProvider } from "@/context/IDContextProvider";
import Overview from "./Overview";


export default function PageClient({ id, document } : {id: string, document:any}) {
    return(
        <IDContextProvider id={id}>
            <Tab>
                <TabItemContainer>
                    <TabItem index={0}  active={true} >
                        Overview
                    </TabItem>
                </TabItemContainer>

                <TabDetailContainer>
                    <TabDetail index={0}  active={true} >
                        {/* <div className="grid"> */}
                            <Overview document={document}/>
                        {/* </div> */}
                    </TabDetail>
                </TabDetailContainer>

            </Tab>
        </IDContextProvider>
    )
}