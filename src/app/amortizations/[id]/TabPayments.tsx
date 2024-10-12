"use client"
import { usePageID } from "@/context/IDContext"
import {  useState } from "react"

export default function({document}: any) {

    const id = usePageID()
    const [schedules, setSchedules] = useState([])

    function formatDecimal(val:any, sign:boolean = true) {
        return (sign ? "₱ " : "") + new Intl.NumberFormat().format(val)
    }

    return (
        <div className="flex w-full">
        </div>
    )
}