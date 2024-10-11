"use client"
import { deleteLotAction } from "@/actions/blocks"
import { useFormStatus } from "react-dom"
import { useBlocks, useBlocksDispatchContext } from "../../../../../context/BlocksContext"
import { useState } from "react"

export default function ActivateButton() {
    const {pending} = useFormStatus()
    const dispatch = useBlocksDispatchContext()
    const {currentLot} = useBlocks()
    const [isClicked, setIsClicked] = useState(false)
    
    return (
        <button className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
        type="button"
    
        onClick={
            async(e) => {
                e.preventDefault()
                setIsClicked(true)
                if(confirm('Are you sure?')) {
                    await deleteLotAction(currentLot.id,!currentLot.active)
                }
                await dispatch({type:'refresh'})
                setIsClicked(false)
            }
        }
        >
            {pending && isClicked ?  (!currentLot.active ? 'Activating...' : 'Inactivating...')  : ( !currentLot.active ? 'Activate Lot' : 'Inactivate Lot') }
        </button>
    )
}