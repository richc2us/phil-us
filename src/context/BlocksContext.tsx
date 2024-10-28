import { initialStateLot } from "@/actions/state";
import { createContext, useContext } from "react";

const initialBlock = {
    projectID:"",
    name:"",
    description: "",
    id: "",
    _id: "",
    active: false
}
const initialBlocks = {
    currentBlock:initialBlock,
    currentLot: initialStateLot,
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

export {initialBlocks, initialStateLot, BlocksContext, BlocksDispatchContext, useBlocks, useBlocksDispatchContext }