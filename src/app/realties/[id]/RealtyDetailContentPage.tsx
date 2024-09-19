"use client"
import {  useEffect } from "react";
import {
    Tab as T,
    initTWE
} from "tw-elements";

import { IDContextProvider } from "@/context/IDContextProvider";
import DetailsTab from "./DetailsTab";

import {Tab, TabDetail, TabDetailContainer, TabItem, TabItemContainer} from "@/components/Tabs/index";

export default function RealtyDetailContentPage({id, company} : {id: string, company:any}) {

    useEffect(() => {
        initTWE({ T })
    }, [])

    return (
        <IDContextProvider id={id}>
            <Tab>
                <TabItemContainer>
                    <TabItem index={0} active={true}>
                        Overview
                    </TabItem>
                    <TabItem index={1}>
                        Details
                    </TabItem>
                    <TabItem index={2}>
                    Agents
                    </TabItem>
                </TabItemContainer>

                <TabDetailContainer>
                    <TabDetail index={0}>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
                                Realty Overview, Comissions , Sales etc
                        </div>
                    </TabDetail>

                    <TabDetail index={1}>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
                            <DetailsTab company={company} />
                        </div>
                    </TabDetail>

                    <TabDetail index={3}>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
                            <p>Show list of agents</p>
                        </div>
                    </TabDetail>
                </TabDetailContainer>

                </Tab>
        </IDContextProvider>
    )
}