"use client"
import { deleteBlockAction } from "@/actions/blocks"
import { useFormStatus } from "react-dom"

export default function DeleteBlockSubmit({blockID = null,  refreshBlocks = () => {}} : any) {
    const {pending} = useFormStatus()
    
    return (
        <button className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
        type="button"
    
    onClick={
        async() => {
            if(confirm('Are you sure?')) {
                await deleteBlockAction(blockID)
            }
            await refreshBlocks()
        }
    }
        >
            {pending ? 'Deleting...' : 'Delete Block'}
        </button>
    )
}