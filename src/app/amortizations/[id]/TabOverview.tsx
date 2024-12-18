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
            <div className="border-r border-stroke flex-auto w-2/5 pt-4">
                <table className="table-auto w-full">
                    <caption>Amortization Details</caption>
                    <tbody>
                        <tr>
                            <td>Project:</td>
                            <td>{ [document?.project_id.name," / ",document?.block_id.name," / ", document?.lot_id.name].join("") }</td>
                            {
                                document?.agent_id && <>
                                <td>Area/Price: </td>
                                <td>{ [document?.area," sqm / ", formatDecimal(document?.price_per_sqm)].join("") }</td>
                                </>
                            }
                            </tr>
                            <tr>
                            {
                                document?.realty_id && <>
                                <td>Reality: </td>
                                <td>{ document?.realty_id?.name }</td>
                                </>
                            }
                      
                            {
                                document?.agent_id && <>
                                <td>Agent: </td>
                                <td>{ document?.agent_id?.first_name + " " + document?.agent_id?.last_name }</td>
                                </>
                            }
                            </tr>
                        <tr>

                            {
                                document?.tcp && <>
                                <td>TCP: </td>
                                <td>{ formatDecimal(document?.tcp) }</td>
                                </>
                            }
                            {
                                document?.balance && <>
                                <td>Balance: </td>
                                <td>{ formatDecimal(document?.balance) }</td>
                                </>
                            }
                            </tr>
                            <tr>
                            {
                                document?.balance && <>
                                <td>Monthly / Terms: </td>
                                <td>{ [formatDecimal(document?.monthly), " / " + document.terms ," months"].join("") }</td>
                                </>
                            }

                            { document.borrowers && document.borrowers.length > 0 && <>
                                <td>Borrowers: </td>
                                <td>{
                                        document.borrowers.map((borrower:any,k:any) =><div key={k}>
                                            { k > 0 ? " / "  : "" } {borrower.user.first_name } {borrower.user.last_name }
                                        </div>  )
                                }</td></>
                            }
                            </tr>
                    </tbody>
                </table>
                <div className="w-full border-t-2 border-stroke pt-4 mt-4">
                    <table className="table-auto w-full">
                        <caption>Recent Payments</caption>
                        <tbody>
                            <tr>
                                <td>#1</td>
                                <td>May 20 204</td>
                                <td>{formatDecimal(3000)}</td>
                                <td>View</td>
                            </tr>
                            <tr>
                                <td>#2</td>
                                <td>May 20 204</td>
                                <td>{formatDecimal(4000)}</td>
                                <td>View</td>
                            </tr>
                            <tr>
                                <td>#3</td>
                                <td>May 20 204</td>
                                <td>{formatDecimal(5000)}</td>
                                <td>View</td>
                            </tr>
                            <tr>
                                <td>#4</td>
                                <td>May 20 204</td>
                                <td>{formatDecimal(6000)}</td>
                                <td>View</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
               
            </div>

            <div className="flex-auto w-3/5">
                
            </div>
        </div>
    )
}