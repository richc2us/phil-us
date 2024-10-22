import { createContext, useContext } from "react";

const initialBlock = {
    projectID:"",
    name:"",
    description: "",
    id: "",
    _id: "",
    active: false
}
const initialLot = {
    id:"",
    _id:"",
    block_id:"",
    agent_id:"",
    projectID:"",
    name:"",
    area:0,
    price_per_sqm: 0,
    status: "available",
    active: false,
    agentName: "",
    remark: "regular"
}
const initialBlocks = {
    currentBlock:initialBlock,
    currentLot: initialLot,
    projectID: "",
    blocks:[]
}

const BlocksContext = createContext(initialBlocks)
const BlocksDispatchContext = createContext<any>(null)

function useBlocks() {
    return useContext(BlocksContext)
}

function useBlocksDispatchContext() {
    const dispatch = useContext(BlocksDispatchContext)
    if(!dispatch) {
        throw new Error("value has to be added in BlocksDispatchContext Provider")
    }
    return dispatch
}

export {initialBlocks, initialLot, BlocksContext, BlocksDispatchContext, useBlocks, useBlocksDispatchContext }