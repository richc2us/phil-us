import React from "react"
import PrimarySaveButton from "./PrimarySaveButton";

export default function NormalButtonAction(props : React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
    return <PrimarySaveButton
    className="flex justify-center rounded border border-stroke px-6 py-1 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white">
        {props.children}
        </PrimarySaveButton>
}