"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useFormStatus } from "react-dom"

export default function NewSubmit({state = {}} : any) {
    const {pending} = useFormStatus()
    const router = useRouter()
    useEffect(()=> {
        if(state?.document?.id) {
            router.push("/buyers")
        }
    }, [pending])
    return (
        <button
        disabled={pending || state.disabled}
        className="flex justify-center rounded bg-primary px-6 py-1 font-medium text-gray hover:bg-opacity-90"
        type="submit"
        >
        {pending ? 'Sending' : 'Save'}
        </button>
    )
}