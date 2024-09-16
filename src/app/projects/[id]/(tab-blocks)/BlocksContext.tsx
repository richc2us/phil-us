import { createContext, useContext } from "react";

const initialBlock = {
    projectID:null,
    name:"",
    description: "",
    id: "",
    _id: ""
}
const initialLot = {
    id:"",
    _id:"",
    block_id:"",
    name:"",
    area:0,
}
const initialBlocks = {
    currentBlock:initialBlock,
    currentLot: initialLot,
    projectID: null,
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