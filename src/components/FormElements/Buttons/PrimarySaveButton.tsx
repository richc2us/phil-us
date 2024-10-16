import React from "react"
import { useFormStatus } from "react-dom"

export default function PrimarySaveButton(props : React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
    const { pending } = useFormStatus();
    const {children} = props
    return (
        <button
            className={"flex justify-center " + (pending ? "" : "bg-primary") + " rounded border border-stroke px-6 py-2 font-medium text-white hover:shadow-1 dark:border-strokedark dark:text-white disabled:bg-whiter disabled:text-black"}
            type="submit"
            {...props}
            disabled={pending || props?.disabled}
        >
            { pending ?  <div className={"flex items-center justify-center bg-white dark:bg-black text-black"}>
                    <div className="h-4 w-4 animate-spin rounded-full border-4 border-solid border-t-transparent"></div>
                </div> : (children ? children : "Save")
            }
        </button>
    )
}