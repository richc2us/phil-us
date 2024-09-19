import React from "react"

export default function NormalButton(props : React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {

    return (
        <button
            className="flex justify-center rounded border border-stroke px-6 py-1 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
            type="button"
            {...props}
        >
            {props.children ?? "Save"}
        </button>
    )
}