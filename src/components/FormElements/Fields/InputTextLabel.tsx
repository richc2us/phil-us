import React from "react"

export default function InputTextLabel(props : React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>) {

    const {  id, ...rest  } = props

    return (
        <label
        className="mb-3 block text-sm font-medium text-black dark:text-white"
        htmlFor={id}
        {...rest}
    >
        {props.children}
    </label>)
}