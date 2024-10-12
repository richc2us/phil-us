"use client"
import AsyncSelect from 'react-select/async'
import { searchBuyer } from "@/actions/search"
import Link from "next/link"
import { useEffect, useState } from 'react'
import Loader from '@/components/common/Loader'
import { useRouter } from 'next/navigation'
import { getBuyerAmortizationsApi } from '@/components/common/api'

export default function NewForm() {
    const router = useRouter()
    const [form, setForm] = useState({
        buyer_id: 0 ,
        amortizations: []
    })

    const [requesting, setRequesting] = useState(false)

    function updateForm(value : any) {
        return setForm((prev: any) => {
            return { ...prev, ...value }
        });
    }

    const searchBuyerCallback = async(inputValue: string) => {
        return await searchBuyer(inputValue)
    }

    const getBuyerAmortizations = async() => {
        if(form.buyer_id) {
            setRequesting(true)
            getBuyerAmortizationsApi(
                form.buyer_id,
                (res:any) =>  {
                    updateForm({amortizations : res})
                    setRequesting(false) 
                })
        }
    }

    useEffect(() => {
        getBuyerAmortizations()
    },[form.buyer_id])

    const asyncBuyerOptions = (
        inputValue: string,
        callback: (options: any[]) => void) => {
        if(inputValue.length > 3) {
            setTimeout( async() => {
                callback(await searchBuyerCallback(inputValue))
            }, 500)
        }
    }

    function formatDecimal(val:any, sign:boolean = true) {
        return (sign ? "₱ " : "") + new Intl.NumberFormat().format(val)
    }

    return (
        <div className="mt-4">

            <div className="search">
                    <AsyncSelect
                        id="searchBuyer"
                        name="searchBuyer"
                        loadOptions={asyncBuyerOptions}
                        className="border-b z-999"
                        placeholder="Search Buyer"
                        styles={{
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                border: 'none'
                            })
                        }}
                        onChange={
                                async({data, label , value} : any, b : any) => {
                                    updateForm({ buyer_id: value})
                                }
                        }
                    />
            </div>
            
            <div className="searchResult mt-7">
                { requesting && <Loader/>}
                {form.amortizations.length > 0 && <h2 className="mb-4">Buyer Amortizations</h2> }
                <div className="grid grid-cols-4 gap-6 mb-4">
                    {
                        form.amortizations.length > 0 && form.amortizations.map((amort:any,key:any) => <div key={key} className="cursor-pointer border-b-2 pb-3">
                            <table className="text-sm w-full" onClick={ e => router.push("/amortizations/" + amort._id.toString() + "?tab=2")}>
                                <tbody>
                                <tr>
                                    <td>Project Name: </td>
                                    <td>{[amort?.project_id?.name,amort?.block_id?.name,amort?.lot_id?.name].join(" / ")}</td>
                                </tr>
                                {
                                    amort.realty_id && <tr>
                                    <td>Reality: </td>
                                    <td>{ amort?.realty_id?.name }</td>
                                    </tr>
                                }
                                {
                                    amort.agent_id && <tr>
                                    <td>Agent: </td>
                                    <td>{ [amort?.agent_id?.first_name,amort?.agent_id?.last_name].join(" ") }</td>
                                    </tr>
                                }
                                {
                                    amort.area && <tr>
                                    <td>Area/Price: </td>
                                    <td>{ [formatDecimal(amort?.area,false)," sqm / ", formatDecimal(amort?.price_per_sqm)].join("") }</td>
                                     
                                    </tr>
                                }

                                {
                                    amort.tcp && <tr>
                                    <td>TCP: </td>
                                    <td>{ formatDecimal(amort?.tcp) }</td>
                                     
                                    </tr>
                                }

                                {
                                    amort.balance && <tr>
                                    <td>Balance: </td>
                                    <td>{ formatDecimal(amort?.balance) }</td>
                                    </tr>
                                }

                                {
                                    amort.monthly && <tr>
                                    <td>Monthly / Terms: </td>
                                    <td>{ [formatDecimal(amort?.monthly), " / " + amort.terms ," months"].join("") }</td>
                                    </tr>
                                }

{
                                    amort.borrowers && amort.borrowers.length > 0 && <tr>
                                    <td>Borrowers: </td>
                                    <td>{
                                            amort.borrowers.map((borrower:any,k:any) =><div key={k}>
                                                { k > 0 ? " / "  : "" } {borrower.user.first_name } {borrower.user.last_name }
                                            </div>  )
                                        }</td>
                                    </tr>
                                }
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan={2} className="text-center">
                                            <Link href={"/amortizations/" + amort._id.toString() + "?tab=2"}>View</Link>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                    </div>)
                    }
                </div>
            </div>
        </div>
    )
}