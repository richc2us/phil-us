"use client"
import { getAgents } from "@/actions/agents";
import { searchBuyer, searchUsers } from "@/actions/search";
import { saveAmortizationAction } from "@/actions/amortizations";
import {  initialStateAmortizationEquity, initialStateAmortizationSchedule, initialStateReservation } from "@/actions/state";

import {  useEffect, useState } from "react";
import { AlertError, AlertSuccess } from "@/app/ui/alerts/alerts";
import { ServerActionResponse } from "@/types/server-action-reply";
import Link from "next/link";
import PrimarySaveButton from "@/components/FormElements/Buttons/PrimarySaveButton";
import InputTextLabel from "@/components/FormElements/Fields/InputTextLabel";
import InputTextField from "@/components/FormElements/Fields/InputTextField";
import NormalButton from "@/components/FormElements/Buttons/NormalButton";
import AsyncSelect from 'react-select/async';
import { initTWE, Collapse } from "tw-elements";
import DatePicker from "react-datepicker";
import { getProjectBlocksApi,  getProjectsSearchApi, getRealtiesApi } from "@/components/common/api";
import { SidebarIcon } from "@/components/common/functions";


export default function NewForm(){

    const [form, setForm] = useState({...initialStateReservation})
    const [requesting, setRequesting] = useState(false)
    const [projectRequesting, setProjectRequesting] = useState(false)
    const [blockRequesting, setBlockRequesting] = useState(false)
    const [lotRequesting, setLotRequesting] = useState(false)
    const [reply, setReply] = useState<ServerActionResponse>()
    const [labels, setLabels] = useState({
        project_label: "",
        block_label:"",
        lot_label:"",
        area_label: ""
    })

    const [ commissionAgents ,setCommissionAgents] = useState<any>([])
    const [ commissionRealties ,setCommissionRealties] = useState<any>([])

    function updateForm(value : any) {
        return setForm((prev: any) => {
            return { ...prev, ...value };
        });
    }

    const searchBuyerCallback = async(inputValue: string) => {
        return await searchBuyer(inputValue, true)
    }

    const asyncBuyerOptions = (
        inputValue: string,
        callback: (options: any[]) => void
    ) => {
        setRequesting(true)
        setTimeout( async() => {
            callback(await searchBuyerCallback(inputValue))
            initTWE({ Collapse })
            setRequesting(false)
        }, 500)
    }

    useEffect(() => {
        setProjectRequesting(true)
        getProjectsSearchApi((res:any) => {
            updateForm({projects: res})
            setProjectRequesting(false)
        })
        const AsyncAgents = async() => {
            const agents = await searchUsers("")
            setCommissionAgents([{
                value : "",
                label: "Blank",
                data: {},
                isDisabled: false },...agents])
        }
        AsyncAgents()
    },[])


    useEffect(() => {

        const AsyncAgents = async() => {
            const agents = await getAgents()
            updateForm({ agents: agents.map( item =>({
                value : item._id,
                label: item.first_name + " " + item.last_name + " " + item.email,
                isDisabled: !item.active
            }))})
        }

        getRealtiesApi((res:any) => {
            const realties = res.map( (realty:any) => ({
                value: realty._id.toString(),
                label: realty.name
            }) )
            setCommissionRealties([{
                value : "",
                label: "Blank",
                data: {},
                isDisabled: false },...realties])
            updateForm({ realties: realties })
        })
        AsyncAgents()
    },[])

    useEffect(() => {
        if(form.project_id) {
            setBlockRequesting(true)
            getProjectBlocksApi(form.project_id, (res:any) => {
                let blocks:any= []
                res.map( (item:any, key:any) => {

                    item.blockLots.map( (b:any, k: any) => {
                        item.blockLots[k] = {
                            value: b._id,
                            label: b.name + " " + b.status,
                            data: b,
                            isDisabled : ["sold","onhold"].includes(b.status)
                        }
                    })

                    blocks.push({
                        value: item._id,
                        label: item.name,
                        data: item
                    })
                })
                updateForm({blocks: blocks})
                setBlockRequesting(false)
            } )
        }
    },[form.project_id])

    function calculateMonthly() {
        let tcp = parseFloat(form.area+"") * parseFloat(form.price_per_sqm+"")
        let down_payment = parseFloat(form.down_payment+"")
        let reservation = parseFloat(form.reservation+"")
        let discount_percent_amount = ( parseFloat(form.discount_percent+"") /100) * tcp
        let balance = tcp - down_payment - discount_percent_amount - reservation
        let monthly = parseFloat((balance / form.terms).toFixed(2))
        let equityMonthly = parseFloat((down_payment / form.equity.length).toFixed(2))
        adjustAmortizationDate(monthly)
        adjustEquityDate(equityMonthly)
        updateForm({
            equityMonthly,
            tcp,
            balance,
            monthly,
            discount_percent_amount
        })
    }
    useEffect(() => {
        calculateMonthly()
    },[
        form.area,
        form.price_per_sqm,
        form.reservation,
        form.discount_percent,
        form.down_payment,
        form.terms,
        form.balance,
        form.monthly,
        form.discount_percent_amount,
        form.equity.length
    ])

    function adjustAmortizationDate(monthly = 0, start : Date  = new Date()) {
        let schedules : any  = form.schedules
        let date = start
        date.setMonth(date.getMonth() + 1)
        Array.from({length: form.terms}).map((i:any, key:any) => {
            let sched_date = new Date(date.valueOf())
            let month = (sched_date.getMonth() +  1) > 9 ? sched_date.getMonth() +  1 :  "0"+ (sched_date.getMonth() +  1)
            let due_date =  month +"/"+ sched_date.getDate() + "/" + sched_date.getFullYear()
            let temp = schedules[key] && schedules[key].amount > 0 ? {...schedules[key] , due_date} : {}
            schedules[key] = {
                ...initialStateAmortizationSchedule,
                due_date: due_date,
                ...temp,
                amount : monthly
            }
            date.setDate(  date.getDate() + 30 )
        })
        schedules = form.schedules.slice(0, form.terms)
        updateForm({schedules: schedules})
    }

    function adjustEquityDate(monthly = 0, start : Date  = new Date()) {
        let equity : any  = form.equity
        let date = start
        date.setMonth(date.getMonth() + 1)
        Array.from({length: form.equity.length}).map((i:any, key:any) => {
            let sched_date = new Date(date.valueOf())
            let month = (sched_date.getMonth() +  1) > 9 ? sched_date.getMonth() +  1 :  "0"+ (sched_date.getMonth() +  1)
            let due_date =  month +"/"+ sched_date.getDate() + "/" + sched_date.getFullYear()
            let temp = equity[key] && equity[key].amount > 0 ? {...equity[key] , due_date} : {}
            equity[key] = {
                ...initialStateAmortizationEquity,
                due_date: due_date,
                ...temp,
                amount : monthly
            }
            date.setDate(  date.getDate() + 30 )
        })
        equity = form.equity.slice(0, form.terms)
        updateForm({equity: equity})
    }

    function canSubmitAmortization() {
        return (form.borrowers.length == 1 && form.borrowers[0].first_name.length == 0 ) ||   form.monthly <= 0 || form.reservation <= 0 || form.price_per_sqm <= 0 || form.borrowers.length == 0 || !form.lot_id || form.terms <= 0 || !form.agent_id || (form.commission_sharing[0].entity_id.length == 0 && form.commission_sharing[1].entity_id.length == 0 && form.commission_sharing[2].entity_id.length == 0 && form.commission_sharing[3].entity_id.length == 0 && form.commission_sharing[4].entity_id.length == 0)
    }

    return (
        <form
        action={ async() => {
            setRequesting(true)
            console.dir(form)
            const {realties, projects, blocks, lots, agents,commission_sharing, ...rest } = form

            let ocp : number = 0
            let oca : number = 0

            let cs = commission_sharing.filter((p:any) => {
                if(p.entity_id.length > 0) {
                    ocp+= p.percent
                }
                return p.entity_id.length > 0
            })

            oca = form.tcp * (ocp/100)

            let response  =  await saveAmortizationAction( {...rest, overall_commission_percent : ocp, overall_commission_amount: oca, commission_sharing : cs} )

            setReply(response)
            if(response.success) {
                setForm(initialStateReservation)
            }
            setRequesting(false)
        }
    }
        >
        <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Buyers Information
                        </h3>
                    </div>
                    <div className="p-7">
                        {
                            reply?.success && <AlertSuccess message={reply?.message} description={<Link href={"/amortizations/" + reply.document?.id}>View</Link>} />
                        }
                        {
                            !reply?.success && reply?.message && <AlertError message={reply?.message} description={reply?.errors}/>
                        }


                        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                            <div className="w-full sm:w-1/1">
                                <InputTextLabel htmlFor="buyers_id" >
                                    Buyer Name
                                </InputTextLabel>
                                <AsyncSelect
                                    id="buyers_id"
                                    loadOptions={asyncBuyerOptions}
                                    autoFocus
                                    isLoading={requesting}
                                    className="border-b"
                                    styles={{
                                        control: (baseStyles, state) => ({
                                            ...baseStyles,
                                            border: 'none'
                                        })
                                    }}
                                    isMulti={true}
                                    onChange={
                                        (e : any, b : any) => {
                                            let borrowers :any = []
                                            e.map( (buyer:any) => borrowers.push({ ...buyer.data, spouse : buyer.data.spouse_user_id}) )
                                            updateForm({ borrowers : [...borrowers]  })
                                        }
                                    }
                                />
                            </div>
                        </div>
                        {
                            form.borrowers[0] && form.borrowers[0].first_name.length > 0 &&
                            <div className="mb-5.5 flex flex-col gap-5.5">
                                <div className="rounded-sm border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
                                    <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                                        <div id="accordionBlock">
                                            <h3 className="mb-2">Individual Information </h3>
                                        {
                                            form.borrowers.map((borrower:any, index:any) => {
                                                    if(borrower.first_name.length == 0)  {
                                                        return
                                                    }
                                                    return (
                                                        <div className="rounded-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-body-dark mb-2 pb-2" key={index}>
                                                            <h2 className="mb-0" id={"heading" + index}>
                                                                <button
                                                                    className="group relative flex w-full items-center rounded-t-lg border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-body-dark dark:text-white [&:not([data-twe-collapse-collapsed])]:bg-white [&:not([data-twe-collapse-collapsed])]:text-primary [&:not([data-twe-collapse-collapsed])]:shadow-border-b dark:[&:not([data-twe-collapse-collapsed])]:bg-surface-dark dark:[&:not([data-twe-collapse-collapsed])]:text-primary dark:[&:not([data-twe-collapse-collapsed])]:shadow-white/10 "
                                                                    type="button"
                                                                    data-twe-collapse-init
                                                                    data-twe-target={"#collapse" + index}
                                                                    aria-expanded={ index == 0 ? "true" : "false"}
                                                                    aria-controls={"#collapse" + index}
                                                                    >
                                                                    #{index + 1} {borrower.first_name } {borrower.middle_name} {borrower.last_name}
                                                                    <span
                                                                    className="-me-1 ms-auto h-5 w-5 shrink-0 rotate-[-180deg] transition-transform duration-200 ease-in-out group-data-[twe-collapse-collapsed]:me-0 group-data-[twe-collapse-collapsed]:rotate-0 motion-reduce:transition-none [&>svg]:h-6 [&>svg]:w-6">
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        strokeWidth="1.5"
                                                                        stroke="currentColor">
                                                                        <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                                                    </svg>
                                                                    </span>
                                                                </button>
                                                            </h2>
                                                            <div
                                                                id={"collapse" + index}
                                                                className={"!visible " + ((index == 0 ) ? "" : "hidden")}
                                                                data-twe-collapse-item
                                                                aria-labelledby={"heading" + index}
                                                                data-twe-parent="#accordionBlock"
                                                            >
                                                                <div className="px-5">
                                                                    <div className="grid grid-cols-3 gap-2">
                                                                        <div className="mb-4.5 w-full sm:w-1/1">
                                                                            <InputTextLabel htmlFor={"email"+index} >
                                                                                Email
                                                                            </InputTextLabel>
                                                                            <InputTextField
                                                                                className="w-full rounded border-b border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                                                id={"email"+index}
                                                                                autoComplete="off"
                                                                                placeholder="Email Address"
                                                                                value={form.borrowers[index].email}
                                                                                required
                                                                                onChange={(e) => {
                                                                                    let b = [...form.borrowers]
                                                                                    b[index].email = e.target.value
                                                                                    updateForm({ borrower: b })
                                                                                } }
                                                                            />
                                                                        </div>

                                                                        <div className="mb-4.5 w-full sm:w-1/1">
                                                                            <InputTextLabel htmlFor={"phone" + index} >
                                                                                Contact #
                                                                            </InputTextLabel>
                                                                            <InputTextField
                                                                                className="w-full rounded border-b border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                                                id={"phone"+index}
                                                                                autoComplete="off"
                                                                                placeholder="Contact #"
                                                                                required
                                                                                value={form.borrowers[index].phone}
                                                                                onChange={(e) => {
                                                                                    let b = [...form.borrowers]
                                                                                    b[index].phone = e.target.value
                                                                                    updateForm({ borrower: b })
                                                                                } }
                                                                                />
                                                                        </div>

                                                                        <div className="mb-4.5 w-full sm:w-1/1">
                                                                            <InputTextLabel htmlFor={"spouse" + index} >
                                                                                Spouse
                                                                            </InputTextLabel>
                                                                            <InputTextField
                                                                                className="w-full rounded border-b border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                                                id={"spouse"+index}
                                                                                autoComplete="off"
                                                                                placeholder="Spouse Name"
                                                                                disabled
                                                                                value={borrower.spouse?.first_name ? (borrower.first_name + " "+borrower.middle_name+" " +borrower.last_name) : ""}
                                                                                />
                                                                        </div>

                                                                        
                                                                    </div>
                                                                    <div className="grid grid-cols-2 gap-2">
                                                                        <div className="w-full sm:w-1/1">
                                                                                <InputTextLabel htmlFor={"address" + index} >
                                                                                    Address
                                                                                </InputTextLabel>
                                                                                <InputTextField
                                                                                    className="w-full rounded border-b border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                                                    id={"address"+index}
                                                                                    autoComplete="off"
                                                                                    placeholder="Address"
                                                                                    required
                                                                                    value={form.borrowers[index].address}
                                                                                    onChange={(e) => {
                                                                                        let b = [...form.borrowers]
                                                                                        b[index].address = e.target.value
                                                                                        updateForm({ borrower: b })
                                                                                    } }
                                                                                />
                                                                        </div>

                                                                        <div className="w-full sm:w-1/1">
                                                                                <InputTextLabel htmlFor={"tin" + index} >
                                                                                    Tin
                                                                                </InputTextLabel>
                                                                                <InputTextField
                                                                                    className="w-full rounded border-b border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                                                    id={"tin"+index}
                                                                                    autoComplete="off"
                                                                                    placeholder="Tin Number"
                                                                                    required
                                                                                    value={form.borrowers[index].tin}
                                                                                    onChange={(e) => {
                                                                                        let b = [...form.borrowers]
                                                                                        b[index].tin = e.target.value
                                                                                        updateForm({ borrower: b })
                                                                                    } }
                                                                                    />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            </div>
                                                    )
                                                })
                                        }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }

                        <div className="border-b border-stroke py-4 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Lot Information
                                {
                                    labels.project_label.length > 0 && <span className="text-meta-3 pl-2">{labels.project_label}</span>
                                }
                                {
                                    labels.block_label.length > 0 && <span className="text-meta-3"> <span className="text-neutral-800"> / </span>{labels.block_label}</span>
                                }

                                {
                                    labels.lot_label.length > 0 && <span className="text-meta-3"> <span className="text-neutral-800"> / </span>{labels.lot_label}</span>
                                }

                                {
                                    labels.area_label.length > 0 && <span className="text-neutral-800"> - {labels.area_label} sqm </span>
                                }

                                {
                                    labels.project_label.length > 0 &&
                                    <span className="cursor-pointer text-sm text-primary" onClick={ (e) => {
                                        setLabels({
                                            ...labels,
                                            project_label:"",
                                            block_label:"",
                                            lot_label:"",
                                            area_label:""
                                        })
                                        updateForm({...initialStateReservation, projects: form.projects, realties: form.realties, agents: form.agents})
                                    }
                                    }> Edit</span>
                                }
                            </h3>
                        </div>

                        <div className={"flex flex-col  gap-5.5 sm:flex-row " + (labels.project_label.length > 0 ? "" : "mt-5.5")}>
                            <div className="w-full sm:w-1/1">
                                    {
                                        labels.project_label.length == 0 &&
                                        <InputTextLabel htmlFor="project_id" >
                                            Project
                                        </InputTextLabel>
                                    }

                                    {
                                        labels.project_label.length == 0 &&
                                        <AsyncSelect
                                        id="project_id"
                                        isLoading={projectRequesting}
                                        defaultOptions={form.projects}
                                        className="border-b z-999"
                                        styles={{
                                            control: (baseStyles, state) => ({
                                                ...baseStyles,
                                                border: 'none'
                                            })
                                        }}
                                        onChange={
                                                ({data, label , value} : any, b : any) => {
                                                    updateForm({ project_id: value})
                                                    setLabels({ ...labels, project_label : label})
                                                }
                                            }
                                        />
                                    }
                            </div>
                            <div className="w-full sm:w-1/1">

                                    {
                                        labels.block_label.length == 0 &&

                                            <InputTextLabel htmlFor="block_id" >
                                                Blocks
                                            </InputTextLabel>
                                    }
                                    { labels.block_label.length == 0 &&
                                            <AsyncSelect
                                            id="block_id"
                                            isLoading={blockRequesting}
                                            defaultOptions={form.blocks}
                                            className="border-b"
                                            styles={{
                                                control: (baseStyles, state) => ({
                                                    ...baseStyles,
                                                    border: 'none'
                                                })
                                            }}
                                            onChange={
                                                ({data, label , value} : any, b : any) => {
                                                    setLotRequesting(true)
                                                    updateForm({ block_id: value, lots : data.blockLots  })
                                                    setLabels({ ...labels, block_label :  label})
                                                    setLotRequesting(false)
                                                }
                                            }
                                        />
                                    }
                            </div>
                            <div className="w-full sm:w-1/1">

                                    {
                                        labels.lot_label.length == 0 &&
                                        <InputTextLabel htmlFor="lot_id" >
                                        Lots
                                        </InputTextLabel> }
                                    { labels.lot_label.length == 0 &&
                                        <AsyncSelect
                                            id="lot_id"
                                            defaultOptions={form.lots}
                                            className="border-b"
                                            isLoading={lotRequesting}
                                            styles={{
                                                control: (baseStyles, state) => ({
                                                    ...baseStyles,
                                                    border: 'none'
                                                })
                                            }}
                                            onChange={
                                                ({data, label , value} : any, b : any) => {
                                                    updateForm({ lot_id: value, area: data.area, price_per_sqm: data.price_per_sqm })
                                                    setLabels({ ...labels, lot_label : label, area_label : data.area + ""  })
                                                }
                                            }
                                        />
                                    }
                            </div>
                        </div>

                        <div className="mb-5.5 mt-5.5 flex flex-col gap-5.5 sm:flex-row">
                                <div className="w-full sm:w-1/1">
                                        <InputTextLabel htmlFor="lot_condition" >
                                            Lot Condition
                                        </InputTextLabel>
                                        <select
                                        className="relative z-20 w-full appearance-none rounded border-b border-stroke bg-transparent pl-2 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                                        name="lot_condition"
                                        id="lot_condition"
                                        defaultValue="as-is-where-is"
                                        onChange={
                                            (e) => {
                                                updateForm({ [e.target.name] : e.target.value})
                                            }
                                        }>
                                            <option value="as-is-where-is" >As Is Where Is</option>
                                            <option value="subdivision lot">Subdivision Lot</option>
                                        </select>
                                    </div>

                                <div className="w-full sm:w-1/1">
                                        <InputTextLabel htmlFor="price_per_sqm" >
                                            Price Per Sqm
                                        </InputTextLabel>
                                        <InputTextField
                                            className="w-full rounded border-b border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            type="number"
                                            id="price_per_sqm"
                                            min="0"
                                            autoComplete="off"
                                            placeholder="Price Per Sqm"
                                            required
                                            value={form.price_per_sqm}
                                            onChange={
                                                (e) => {
                                                    updateForm({ [e.target.name]: parseFloat(e.target.value) })
                                                }
                                            }
                                            />
                                    </div>

                                <div className="w-full sm:w-1/1">
                                        <InputTextLabel htmlFor="reservation" >
                                            Reservation Fee
                                        </InputTextLabel>
                                        <InputTextField
                                            className="w-full rounded border-b border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            type="number"
                                            id="reservation"
                                            min="0"
                                            autoComplete="off"
                                            placeholder="Reservation Fee"
                                            required
                                            value={form.reservation}
                                            onChange={
                                                (e) => {
                                                    updateForm({ [e.target.name]: parseFloat(e.target.value) })
                                                }
                                            }
                                            />
                                </div>

                        </div>


                        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                            <div className="w-full sm:w-1/1">
                                    <InputTextLabel htmlFor="down_payment" >
                                        Down Payment
                                    </InputTextLabel>
                                    <InputTextField
                                        className="w-full rounded border-b border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        type="number"
                                        id="down_payment"
                                        min="0"
                                        autoComplete="off"
                                        placeholder="Down Payment"
                                        required
                                        value={form.down_payment}
                                        onChange={
                                            (e) => {
                                                let equity = form.equity
                                                equity[0].amount = parseFloat(e.target.value)
                                                updateForm({ [e.target.name]: parseFloat(e.target.value), equity:[...equity] })
                                            }
                                        }
                                        />
                            </div>

                            <div className="w-full sm:w-1/1">
                                    <InputTextLabel htmlFor="discount_percent" >
                                        Discount Percent {form.discount_percent_amount > 0 ? " ( ₱ "+ new Intl.NumberFormat().format(form.discount_percent_amount)+" )" : "" }
                                    </InputTextLabel>
                                    <InputTextField
                                        className="w-full rounded border-b border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        type="number"
                                        id="discount_percent"
                                        min="0"
                                        autoComplete="off"
                                        placeholder="Discount Percent"
                                        required
                                        value={form.discount_percent}
                                        onChange={
                                            (e) => {
                                                updateForm({ [e.target.name]: e.target.value })
                                            }
                                        }
                                        />
                            </div>

                            <div className="w-full sm:w-1/1">
                                    <InputTextLabel htmlFor="terms" >
                                        Terms - { form.years } year(s)
                                    </InputTextLabel>
                                    <InputTextField
                                        className="w-full rounded border-b border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        type="number"
                                        id="terms"
                                        autoComplete="off"
                                        placeholder="Terms"
                                        required
                                        min="1"
                                        value={form.terms}
                                        onChange={
                                            (e) => {
                                                let v  : number = parseInt(e.target.value)
                                                let years : number = v > 12 ? Math.floor(v/12) +   ((v % 12) / 12)  : v/12
                                                updateForm({ [e.target.name]: e.target.value, years : years.toFixed(1) })
                                            }
                                        }
                                        />
                            </div>
                        </div>

                        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                            <div className="w-full sm:w-1/1">
                                    <InputTextLabel htmlFor="tcp" >
                                        TCP
                                    </InputTextLabel>
                                        <p className="px-5 py-3"> ₱ {new Intl.NumberFormat().format(form.tcp)}</p>
                            </div>
                            
                            <div className="w-full sm:w-1/1">
                                    <InputTextLabel htmlFor="balance" >
                                        Balance
                                    </InputTextLabel>
                                    <p className="px-5 py-3"> ₱ {new Intl.NumberFormat().format(form.balance)}</p>
                            </div>
                            <div className="w-full sm:w-1/1">
                                    <InputTextLabel htmlFor="monthly" >
                                        Monthly Amortization
                                    </InputTextLabel>
                                    <p className="px-5 py-3"> ₱ {new Intl.NumberFormat().format(form.monthly)}</p>
                                    
                            </div>
                        </div>

                        <div className="mb-5.5 flex flex-col  gap-5.5 sm:flex-row">
                            <div className="w-full sm:w-1/1">
                                        <InputTextLabel htmlFor="realty_id" >
                                            Realty
                                        </InputTextLabel>
                                        <AsyncSelect
                                            id="realty_id"
                                            isLoading={form.realties.length == 0}
                                            defaultOptions={form.realties}
                                            className="border-b"
                                            styles={{
                                                control: (baseStyles, state) => ({
                                                    ...baseStyles,
                                                    border: 'none'
                                                })
                                            }}
                                            onChange={
                                                ({data, label , value} : any, b : any) => {
                                                    updateForm({ realty_id: value })
                                                }
                                            }
                                        />
                            </div>
                            <div className="w-full sm:w-1/1">
                                        <InputTextLabel htmlFor="agent_id" >
                                            Agent
                                        </InputTextLabel>
                                        <AsyncSelect
                                            id="agent_id"
                                            required
                                            className="border-b"
                                            styles={{
                                                control: (baseStyles, state) => ({
                                                    ...baseStyles,
                                                    border: 'none'
                                                })
                                            }}
                                            isLoading={form.agents.length == 0}
                                            defaultOptions={form.agents}
                                            onChange={
                                                ({data, label , value} : any, b : any) => {
                                                    updateForm({ agent_id: value })
                                                }
                                            }
                                        />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-span-12 xl:col-span-12">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-7 py-4 dark:border-strokedark overflow-hidden">
                        <div className="float-left flex">
                            <h3 className="font-medium text-black dark:text-white inline mr-2">
                                    Equity Builder
                            </h3>
                            <span onClick={ (e:any) => {
                                updateForm({
                                    equity: [
                                        ...form.equity,
                                        {...initialStateAmortizationEquity}
                                    ]
                                })
                            }}>
                            { SidebarIcon('plus-black', { className : "cursor-pointer"} ) }
                            </span>
                        </div>
                    </div>
                    <div className="p-7">
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Amount</th>
                                    <th>Due Date</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {
                                        form.equity.length > 0 && form.equity.map( (i:any,k:any) => {
                                                return <tr key={k}>
                                                    <td>
                                                        <p> {k+1}</p>
                                                    </td>
                                                    <td>
                                                        <InputTextField
                                                            id={"equity_amount_"+k}
                                                            value={form.equity[k].amount}
                                                            className="w-full rounded border-b border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary max-w-94"
                                                            />
                                                    </td>
                                                    <td>
                                                        <div className="flex justify-center">
                                                            <DatePicker
                                                            id={"equity_date_"+k}
                                                            dateFormat="mm/dd/yyyy"
                                                            value={form.equity[k].due_date ? form.equity[k].due_date : ""}
                                                            onChange={(date) => {
                                                                let s = form.equity
                                                                s[k].due_date =  (date?.getMonth() ? date?.getMonth() + 1 : "" ) + "/" + date?.getDate() +  "/" + date?.getFullYear()
                                                                updateForm({
                                                                    equity : s
                                                                })
                                                            }} />
                                                            { k > 0 &&
                                                            <span className="cursor-pointer" onClick={(e:any) => {
                                                                let equity = form.equity
                                                                equity.splice(k,1)
                                                                updateForm({
                                                                    equity
                                                                })
                                                            }}>
                                                                {SidebarIcon('delete')}
                                                            </span>
                                                            }
                                                        </div>
                                                    </td>
                                                </tr>
                                            }
                                        )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="col-span-12 xl:col-span-12">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Amortization
                        </h3>
                    </div>
                    <div className="p-7 max-h-96 overflow-y-scroll">
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th>MA#</th>
                                    <th>Amount</th>
                                    <th>Due Date</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {
                                        form.terms > 0 && form.monthly > 0 && form.schedules.map( (i:any,k:any) => {
                                                return <tr key={k}>
                                                    <td>
                                                        <p> {k+1}</p>
                                                    </td>
                                                    <td>
                                                        <p> ₱ {  new Intl.NumberFormat().format(form.monthly) } </p>
                                                    </td>
                                                    <td>
                                                        <DatePicker
                                                        id={"equity_date_"+k}
                                                        dateFormat="MM/dd/yyyy"
                                                        value={form.schedules[k].due_date ? form.schedules[k].due_date : ""}
                                                        onChange={(date) => {
                                                            let s = form.schedules
                                                            s[k].due_date =  (date?.getMonth() ? date?.getMonth() + 1 : "" ) + "/" + date?.getDate() +  "/" + date?.getFullYear()
                                                            if(k == 0) {
                                                                adjustAmortizationDate(form.monthly, date ? date : new Date() )
                                                            }
                                                            updateForm({
                                                                schedules : s
                                                            })
                                                        }} />
                                                    </td>
                                                </tr>
                                            }
                                        )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="col-span-12 xl:col-span-12">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Commission Rating
                        </h3>
                    </div>
                    <div className="p-7">
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="text-start">Position</th>
                                    <th className="text-start">Name</th>
                                    <th className="text-start pl-8">Rat %</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="w-full item-center">
                                    <td>
                                        <label
                                            htmlFor="comission_team_lead_one"
                                            className="flex cursor-pointer select-none items-center"
                                        >
                                            Team Lead One
                                        </label>
                                    </td>
                                    <td>
                                    <AsyncSelect
                                        id="comission_team_lead_one_user"
                                        defaultOptions={commissionAgents}
                                        className="border-b"
                                        styles={{
                                            control: (baseStyles) => ({
                                                ...baseStyles,
                                                border: 'none'
                                            })
                                        }}
                                        onChange={
                                                ({ value } : any) => {
                                                    let cs = form.commission_sharing
                                                    cs[0] = {
                                                        ...cs[0],
                                                        type: "teamlead",
                                                        entity_id : value
                                                    }
                                                    updateForm({ commission_sharing : [...cs] })
                                                }
                                            }
                                        />
                                    </td>
                                    <td className="pl-8">
                                        <InputTextField
                                            id="comission_team_lead_one_percent"
                                            type="number"
                                            value={form.commission_sharing[0].percent}
                                            max={10}
                                            step="0.01"
                                            disabled={form.commission_sharing[0].entity_id.length == 0}
                                            className="rounded border-b border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary w-90"
                                            onChange={(e:any) => {
                                                let cs = form.commission_sharing
                                                    cs[0] = {
                                                        ...cs[0],
                                                        percent : parseFloat(e.target.value)
                                                    }
                                                    updateForm({ commission_sharing : [...cs] })
                                            }}
                                        />
                                    </td>
                                </tr>
                                <tr className="w-full item-center">
                                    <td>
                                        <label
                                            htmlFor="comission_team_lead_two"
                                            className="flex cursor-pointer select-none items-center"
                                        >
                                            Team Lead Two
                                        </label>
                                    </td>
                                    <td>
                                    <AsyncSelect
                                        id="comission_team_lead_two_user"
                                        defaultOptions={commissionAgents}
                                        className="border-b"
                                        styles={{
                                            control: (baseStyles) => ({
                                                ...baseStyles,
                                                border: 'none'
                                            }),
                                            menu: (baseStyles) => ({
                                                ...baseStyles,
                                                zIndex:9999
                                            })
                                        }}
                                        onChange={
                                            ({ value} : any) => {
                                                let cs = form.commission_sharing
                                                cs[1] = {
                                                    ...cs[1],
                                                    type: "teamlead",
                                                    entity_id : value
                                                }
                                                updateForm({ commission_sharing : [...cs] })
                                            }
                                        }
                                        />
                                    </td>
                                    <td className="pl-8">
                                        <InputTextField
                                        id="comission_team_lead_two_percent"
                                        type="number"
                                        value={form.commission_sharing[1].percent}
                                        max={10}
                                        step="0.01"
                                        disabled={form.commission_sharing[1].entity_id.length == 0}
                                        className="rounded border-b border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary w-90"
                                        onChange={(e:any) => {
                                            let cs = form.commission_sharing
                                                cs[1] = {
                                                    ...cs[1],
                                                    percent : parseFloat(e.target.value)
                                                }
                                                updateForm({ commission_sharing : [...cs] })
                                        }}
                                        />
                                    </td>
                                </tr>
                                <tr className="w-full item-center">
                                    <td>
                                        <label
                                            htmlFor="comission_realty"
                                            className="flex cursor-pointer select-none items-center"
                                        >
                                            Realty
                                        </label>
                                    </td>
                                    <td>
                                    <AsyncSelect
                                        id="comission_realty_user"
                                        defaultOptions={commissionRealties}
                                        className="border-b"
                                        styles={{
                                            control: (baseStyles, state) => ({
                                                ...baseStyles,
                                                border: 'none'
                                            }),
                                            menu: (baseStyles) => ({
                                                ...baseStyles,
                                                zIndex:9999
                                            })
                                        }}
                                        onChange={
                                            ({ value} : any) => {
                                                let cs = form.commission_sharing
                                                cs[2] = {
                                                    ...cs[2],
                                                    type: "realty",
                                                    entity_id : value
                                                }
                                                updateForm({ commission_sharing : [...cs] })
                                            }
                                        }
                                        />
                                    </td>
                                    <td className="pl-8">
                                    <InputTextField
                                        id="comission_realty_percent"
                                        type="number"
                                        value={form.commission_sharing[2].percent}
                                        max={10}
                                        step="0.01"
                                        disabled={form.commission_sharing[2].entity_id.length == 0}
                                        className="rounded border-b border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary w-90"
                                        onChange={(e:any) => {
                                            let cs = form.commission_sharing
                                                cs[2] = {
                                                    ...cs[2],
                                                    percent : parseFloat(e.target.value)
                                                }
                                                updateForm({ commission_sharing : [...cs] })
                                        }}
                                        />
                                    </td>
                                </tr>
                                <tr className="w-full item-center">
                                    <td>
                                        <label
                                            htmlFor="commission_agent_one"
                                            className="flex cursor-pointer select-none items-center"
                                        >
                                            Agent One
                                        </label>
                                    </td>
                                    <td>
                                    <AsyncSelect
                                        id="comission_agent_one_user"
                                        defaultOptions={commissionAgents}
                                        className="border-b"
                                        styles={{
                                            control: (baseStyles) => ({
                                                ...baseStyles,
                                                border: 'none'
                                            }),
                                            menu: (baseStyles) => ({
                                                ...baseStyles,
                                                zIndex:9999
                                            })
                                        }}
                                        onChange={
                                            ({value} : any) => {
                                                let cs = form.commission_sharing
                                                cs[3] = {
                                                    ...cs[3],
                                                    type: "agent",
                                                    entity_id : value
                                                }
                                                updateForm({ commission_sharing : [...cs] })
                                            }
                                        }
                                        />
                                    </td>
                                    <td className="pl-8">
                                    <InputTextField
                                        id="comission_agent_one_percent"
                                        type="number"
                                        max={10}
                                        step="0.01"
                                        disabled={form.commission_sharing[3].entity_id.length == 0}
                                        value={form.commission_sharing[3].percent}
                                        className="rounded border-b border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary w-90"
                                        onChange={(e:any) => {
                                            let cs = form.commission_sharing
                                                cs[3] = {
                                                    ...cs[3],
                                                    percent : parseFloat(e.target.value)
                                                }
                                                updateForm({ commission_sharing : [...cs] })
                                        }}
                                        />
                                    </td>
                                </tr>
                                <tr className="w-full item-center">
                                    <td>
                                        <label
                                            htmlFor="commission_agent_two"
                                            className="flex cursor-pointer select-none items-center"
                                        >Agent Two
                                        </label>
                                    </td>
                                    <td>
                                    <AsyncSelect
                                        id="commission_agent_two_user"
                                        defaultOptions={commissionAgents}
                                        className="border-b"
                                        styles={{
                                            control: (baseStyles) => ({
                                                ...baseStyles,
                                                border: 'none'
                                            }),
                                            menu: (baseStyles) => ({
                                                ...baseStyles,
                                                zIndex:9999
                                            })
                                        }}
                                        onChange={
                                            ({ value } : any) => {
                                                let cs = form.commission_sharing
                                                cs[4] = {
                                                    ...cs[4],
                                                    type: "agent",
                                                    entity_id : value
                                                }
                                                updateForm({ commission_sharing : [...cs] })
                                            }
                                        }
                                        />
                                    </td>
                                    <td className="pl-8">
                                    <InputTextField
                                        id="commission_agent_two_percent"
                                        type="number"
                                        max={10}
                                        step="0.01"
                                        disabled={form.commission_sharing[4].entity_id.length == 0}
                                        value={form.commission_sharing[4].percent}
                                        className="rounded border-b border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary w-90"
                                        onChange={(e:any) => {
                                            let cs = form.commission_sharing
                                                cs[4] = {
                                                    ...cs[4],
                                                    percent : parseFloat(e.target.value)
                                                }
                                            updateForm({ commission_sharing : [...cs] })
                                        }}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="mb-4 flex items-center gap-3 pt-8">
                            <div className="flex justify-end gap-4.5">
                                <Link
                                href="/reservations">
                                    <NormalButton>
                                        Cancel
                                    </NormalButton>
                                </Link>
                                <PrimarySaveButton disabled={canSubmitAmortization()}/>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        </form>
      );
};
