"use client"
import { getAmortizationSchedules } from "@/actions/amortizations"
import { usePageID } from "@/context/IDContext"
import { useEffect, useState } from "react"

export default function({document}: any) {

    const id = usePageID()
    const [schedules, setSchedules] = useState([])
    
    function formatDecimal(val:any, sign:boolean = true) {
        return (sign ? "₱ " : "") + new Intl.NumberFormat().format(val)
    }

    const getSchedules = async() => {
        const resp :any = await getAmortizationSchedules(id)
        setSchedules(resp)
    }

    useEffect(()=> {
        getSchedules()
    },[])

    return (
        <div className="flex w-full gap-4">
            {/* <h2>Schedules</h2> */}
            <table className="h-full w-full table-auto">
                <thead>
                    <tr className="flex border-y border-stroke dark:border-strokedark">
                        <th className="w-[65%] py-6 pl-4 pr-4 lg:pl-10 xl:w-1/4">Date</th>
                        <th className="w-3/5 px-4 py-6 block">Amount</th>
                        <th className="w-[35%] py-6 pl-4 pr-4 lg:pr-10 xl:w-[20%]">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        schedules && schedules.length > 0 && schedules.map((schedule:any, key:any) =>
                        <tr key={key} className="flex cursor-pointer items-center hover:bg-whiten dark:hover:bg-boxdark-2">
                            <td className="w-[65%] py-4 pl-4 pr-4 lg:pl-10 xl:w-1/4 text-center border-b-0">
                            #{key + 1} { new Intl.DateTimeFormat().format(schedule.due_date)}
                            </td>
                            <td className="w-3/5 px-4 py-6 block text-center border-b-0">
                                {formatDecimal(schedule.amount)}
                            </td>
                            <td className="w-[35%] py-6 pl-4 pr-4 lg:pr-10 xl:w-[20%] text-center border-b-0">
                                {"Unpaid"}
                            </td>
                        </tr>
                    )
                    }
                </tbody>
            </table>
        </div>
    )
}