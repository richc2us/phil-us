"use client"
import { useEffect, useState } from "react"
import { initTWE, Collapse } from "tw-elements";
import BlockProvider from "./BlockProvider"
import BlockDetail from "./BlockDetail"
import { usePageID } from "@/context/IDContext";
import { getProjectBlocksApi } from "@/components/common/api";

export default function TabBlock() {
    const projectID = usePageID()
    const r : any[] = []
    const [blocks, setBlocks] = useState(r)

    async function getBlocks() {
        getProjectBlocksApi(projectID, (blocks:any) => {
            setBlocks(blocks)
            initTWE({ Collapse });
        })
    }

    useEffect( () => {
        getBlocks()
    }, [])

    return(
        <BlockProvider parentBlocks={blocks} refreshBlocks={() => { getBlocks() } }>
            <BlockDetail ></BlockDetail>
        </BlockProvider>
    )
}