import { createContext, useContext } from "react";

const initialBlock = {
    projectID:null,
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
    name:"",
    area:0,
    active: false
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