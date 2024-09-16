"use client"
import { deleteBlockAction } from "@/actions/blocks"
import { useFormStatus } from "react-dom"
import { useBlocks, useBlocksDispatchContext } from "../BlocksContext"
import { useState } from "react"

export default function DeleteBlockSubmit() {
    const {pending} = useFormStatus()
    const dispatch = useBlocksDispatchContext()
    const {currentBlock} = useBlocks()
    const [isClicked, setIsClicked] = useState(false)
    
    return (
        <button className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
        type="button"
    
        onClick={
            async() => {
                setIsClicked(true)
                if(confirm('Are you sure?')) {
                    await deleteBlockAction(currentBlock.id)
                }
                await dispatch({type:'refresh'})
                setIsClicked(false)
            }
        }
        >
            {pending && isClicked ? 'Deleting...' : 'Delete Block'}
        </button>
    )
}