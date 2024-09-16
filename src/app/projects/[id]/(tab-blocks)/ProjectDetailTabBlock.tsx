"use client"
import { useEffect, useState } from "react"
import { initTWE, Collapse } from "tw-elements";
import ProjectDetailTabBlockProvider from "./ProjectDetailTabBlockProvider"
import ProjectDetailTabBlockWrapper from "./ProjectDetailTabBlockWrapper"
import { useProject } from "../ProjectContext";

export default function ProjectDetailTabBlock() {
    const {projectID} = useProject()
    const r : any[] = []
    const [blocks, setBlocks] = useState(r)

    async function getBlocks() {
        const b = await (await fetch('/api/projects/blocks/'+ projectID)).json()
        setBlocks(b)
        initTWE({ Collapse });
    }

    useEffect( () => {
        getBlocks()
    }, [])

    return(
        <ProjectDetailTabBlockProvider parentBlocks={blocks} refreshBlocks={() => { getBlocks() } }>
            <ProjectDetailTabBlockWrapper ></ProjectDetailTabBlockWrapper>
        </ProjectDetailTabBlockProvider>
    )
}