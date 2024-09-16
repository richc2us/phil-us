"use client"
import { useEffect, useState } from "react"
import { initTWE, Collapse } from "tw-elements";
import ProjectDetailTabBlockProvider from "./ProjectDetailTabBlockProvider"
import ProjectDetailTabBlockWrapper from "./ProjectDetailTabBlockWrapper"

export default function ProjectDetailTabBlock({projectID = ""}: {projectID: string}) {

    // const [loading, setLoading] = useState(true)
    const r : any[] = []
    const [blocks, setBlocks] = useState(r)

    async function getBlocks() {
        // setLoading(true)
        const b = await (await fetch('/api/projects/blocks/'+ projectID)).json()
        setBlocks(b)
        // setLoading(false)
        initTWE({ Collapse });
    }

    useEffect( () => {
        getBlocks()
    }, [])

    return(
        <ProjectDetailTabBlockProvider projectID={projectID} parentBlocks={blocks} refreshBlocks={() => { getBlocks() } }>
            <ProjectDetailTabBlockWrapper projectID={projectID}></ProjectDetailTabBlockWrapper>
        </ProjectDetailTabBlockProvider>
    )
}