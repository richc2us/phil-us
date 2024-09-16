import { useEffect, useReducer, useState } from "react"
import { BlocksContext, BlocksDispatchContext,  initialBlocks } from "./BlocksContext";



const ProjectDetailTabBlockProvider = ({projectID=null, parentBlocks  , refreshBlocks = {} ,children}:any) => {

    const [blocks, blockDispatch] = useReducer( blocksReducer, {...initialBlocks, projectID})
    useEffect(() => {
        blockDispatch({type:'updateList', blocks: parentBlocks})
    }, [parentBlocks])

    function blocksReducer(params : any , action:any) : typeof initialBlocks {
        switch(action.type) {
            case "updateList":
                return {...params, blocks : action.blocks}

            case "setCurrentBlock":
                return {...params, currentBlock : action.currentBlock}
            case "setCurrentLot":
                return {...params, currentLot : action.currentLot}
            default:
                refreshBlocks()
            break;
        }

        return {...params}
    }

    return (<>
    <BlocksContext.Provider value={blocks}>
        <BlocksDispatchContext.Provider value={blockDispatch}>
            {children}
        </BlocksDispatchContext.Provider>
    </BlocksContext.Provider>
    </>)
}

export default ProjectDetailTabBlockProvider