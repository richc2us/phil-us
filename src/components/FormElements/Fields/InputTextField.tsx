import React from "react"

export default function InputTextField(props : React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {

    const {  id, placeholder, disabled, autoComplete, value, onChange, ...rest  } = props

    return (
    <input
        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        type="text"
        name={id}
        id={id}
        placeholder={placeholder}
        autoComplete={autoComplete ? "off" : "on"}
        disabled={disabled}
        value={value}
        onChange={(e) => onChange ? onChange(e) : null  }
        {
            ...rest
        }
    />)
}