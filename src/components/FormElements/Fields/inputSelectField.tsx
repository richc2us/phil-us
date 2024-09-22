import React from "react"
import SVGArrowDown from "@/components/common/svg/svg-arrow-down"
export default function InputSelectField(props : React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement> | any, HTMLInputElement>) {

    const {  id, onChange, ...rest  } = props

    return (<div className="relative z-20 bg-white dark:bg-form-input">
        <span className="absolute left-4 top-1/2 z-30 -translate-y-1/2">
            {props?.icon}
        </span>
    
        <select
            // className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-12 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
            //     form.realty_id > 0 ? "text-black dark:text-white" : ""
            // }`}
            name={id}
            id={id}
            onChange={(e) => onChange ? onChange(e) : null  }
            {
                ...rest
            }
        >
            {
                props.children
                // form.realties && form.realties.map( (realty:any, key:any)=><>
                //     <option value={realty._id} className="text-body dark:text-bodydark">
                //         {realty.name}
                //     </option>
                // </>)
            }
        </select>
    <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
        <SVGArrowDown/>
    </span></div>)
}