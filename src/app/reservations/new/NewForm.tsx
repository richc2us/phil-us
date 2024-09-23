"use client"
import {  useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import { AlertError, AlertSuccess } from "@/app/ui/alerts/alerts";
import { ServerActionResponse } from "@/types/server-action-reply";
import { saveRealtyAction } from "@/actions/realties";
import Link from "next/link";
import PrimarySaveButton from "@/components/FormElements/Buttons/PrimarySaveButton";
import InputTextLabel from "@/components/FormElements/Fields/InputTextLabel";
import InputTextField from "@/components/FormElements/Fields/InputTextField";
import NormalButton from "@/components/FormElements/Buttons/NormalButton";
import {  initialStateReservation } from "@/actions/state";
import InputSelectField from "@/components/FormElements/Fields/inputSelectField";
import AsyncSelect from 'react-select/async';
import { searchBuyer, searchProject } from "@/actions/search";
import SvgProject from "@/components/common/svg/svg-project";

export default function NewForm() {

    const [form, setForm] = useState(initialStateReservation)
    const [requesting, setRequesting] = useState(false)
    const [projectRequesting, setProjectRequesting] = useState(false)
    const [blockRequesting, setBlockRequesting] = useState(false)
    const [lotRequesting, setLotRequesting] = useState(false)
    const [reply, setReply] = useState<ServerActionResponse>()

    function updateForm(value : any) {
        return setForm((prev: any) => {
            return { ...prev, ...value };
        });
    }

    const searchBuyerCallback = async(inputValue: string) => {
        return await searchBuyer(inputValue)
    }

    const getProjectsCallback = async(inputValue: string) => {
        return await searchProject(inputValue)
    }

    const asyncBuyerOptions = (
        inputValue: string,
        callback: (options: any[]) => void
    ) => {
        setRequesting(true)
        setTimeout( async() => {
            callback(await searchBuyerCallback(inputValue))
            setRequesting(false)
        }, 500)
    }

    const asyncProjectOptions = (
        inputValue: string,
        callback: (options: any[]) => void) => {
        setProjectRequesting(true)
        setTimeout( async() => {
            callback(await getProjectsCallback(inputValue))
            setProjectRequesting(false)
        }, 500)
    }

    useEffect(() => {
        setProjectRequesting(true)
        fetch("/api/projects").then(res => res.json()).then(res => {
            updateForm({projects: res})
            setProjectRequesting(false) 
        })
    },[])

    useEffect(() => {
        if(form.project_id) {
            setBlockRequesting(true)
            fetch("/api/projects/blocks/"+form.project_id)
            .then(res => res.json())
            .then(res => {
                let blocks:any= []
                    res.map( (item:any, key:any) => {

                        item.blockLots.map( (b:any, k: any) => {
                            item.blockLots[k] = {
                                value: b._id,
                                label: b.name,
                                data: b
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
                }
            )
        }
    },[form.project_id])

    function calculateMonthly() {
        let tcp = form.area * form.price_per_sqm
        let downpayment = form.downpayment
        let balance = tcp - downpayment
        let monthly = (balance / form.terms).toFixed(2)
        updateForm({
            tcp,
            balance,
            monthly
        })
    }


    return (
        <div className="grid grid-cols-6 gap-8">
            <div className="col-span-3 xl:col-span-3">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Buyers Information
                        </h3>
                    </div>
                    <div className="p-7">
                        {/* {
                            reply?.success && <AlertSuccess message={reply?.message}/>
                        }
                        {
                            !reply?.success && reply?.message && <AlertError message={reply?.message} description={reply?.errors}/>
                        } */}
                        <form 
                        action={ async() => {
                            setRequesting(true)
                            let response  =  await saveRealtyAction(form)
                            setReply(response)
                            if(response.success) {
                                setForm(initialStateReservation)
                            }
                            setRequesting(false)
                        }
                    } 
                        >
                        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                            <div className="w-full sm:w-1/1">
                                <InputTextLabel htmlFor="name" >
                                    Buyer Name
                                </InputTextLabel>
                                <AsyncSelect
                                    loadOptions={asyncBuyerOptions}
                                    autoFocus
                                    isLoading={requesting}
                                    onChange={
                                        ({data, label , value} : any, b : any) => {
                                            setForm({ ...data, spouse : data.spouse_user_id })
                                        }
                                    }
                                />
                            </div>
                            <div className="w-full sm:w-1/1">
                                    <InputTextLabel htmlFor="email" >
                                        Email
                                    </InputTextLabel>
                                    <InputTextField
                                        id="email"
                                        autoComplete="off"
                                        placeholder="Email Address"
                                        value={form.email}
                                        required
                                        onChange={(e) => updateForm({ [e.target.name]: e.target.value })}
                                    />
                            </div>
                        </div>

                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                            <div className="w-full sm:w-1/1">
                                    <InputTextLabel htmlFor="phone" >
                                        Contact #
                                    </InputTextLabel>
                                    <InputTextField
                                        id="phone"
                                        autoComplete="off"
                                        placeholder="Contact #"
                                        required
                                        value={form.phone}
                                        onChange={(e) => updateForm({ [e.target.name]: e.target.value })}
                                    />
                            </div>

                            <div className="w-full sm:w-1/1">
                                    <InputTextLabel htmlFor="address" >
                                        Address
                                    </InputTextLabel>
                                    <InputTextField
                                        id="address"
                                        autoComplete="off"
                                        placeholder="Address"
                                        required
                                        value={form.address}
                                        onChange={(e) => updateForm({ [e.target.name]: e.target.value })}
                                    />
                            </div>
                    </div>

                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                            <div className="w-full sm:w-1/1">
                                    <InputTextLabel htmlFor="spouse_name" >
                                        Spouse Name
                                    </InputTextLabel>
                                    <InputTextField
                                        id="spouse_name"
                                        autoComplete="off"
                                        placeholder="Spouse Name"
                                        required
                                        value={form.spouse.first_name + " " + form.spouse.middle_name +" "+ form.spouse.last_name}
                                        onChange={(e) => updateForm({ spouse: e.target.value })}
                                        />
                            </div>
                            <div className="w-full sm:w-1/1">
                                    <InputTextLabel htmlFor="tin" >
                                        Tin
                                    </InputTextLabel>
                                    <InputTextField
                                        id="tin"
                                        autoComplete="off"
                                        placeholder="Tin Number"
                                        required
                                        value={form.tin}
                                        onChange={(e) => updateForm({ [e.target.name]: e.target.value })}
                                        />
                            </div>
                    </div>


                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                            <div className="w-full sm:w-1/1">
                                    <InputTextLabel htmlFor="realty_id" >
                                        Realty
                                    </InputTextLabel>
                                    <InputTextField
                                        id="realty_id"
                                        autoComplete="off"
                                        placeholder="Realty"
                                        required
                                        value={form.tin}
                                        onChange={(e) => updateForm({ [e.target.name]: e.target.value })}
                                        />
                            </div>
                            <div className="w-full sm:w-1/1">
                                    <InputTextLabel htmlFor="tin" >
                                       Agent
                                    </InputTextLabel>
                                    <InputTextField
                                        id="tin"
                                        autoComplete="off"
                                        placeholder="Tin Number"
                                        required
                                        value={form.tin}
                                        onChange={(e) => updateForm({ tin: e.target.value })}
                                        />
                            </div>
                        </div>

                    <div className="border-b border-stroke mb-5.5  py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Lot Information
                        </h3>
                    </div>

                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                        <div className="w-full sm:w-1/1">
                                <InputTextLabel htmlFor="project_id" >
                                    Project
                                </InputTextLabel>
                                <AsyncSelect
                                    loadOptions={asyncProjectOptions}
                                    autoFocus
                                    isLoading={projectRequesting}
                                    defaultOptions={form.projects}
                                    onChange={
                                        ({data, label , value} : any, b : any) => {
                                            updateForm({ project_id: value })
                                        }
                                    }
                                />
                        </div>
                        <div className="w-full sm:w-1/1">
                                <InputTextLabel htmlFor="block_id" >
                                    Blocks
                                </InputTextLabel>
                                <AsyncSelect
                                        loadOptions={asyncProjectOptions}
                                        autoFocus
                                        isLoading={blockRequesting}
                                        defaultOptions={form.blocks}
                                        onChange={
                                            ({data, label , value} : any, b : any) => {
                                                setLotRequesting(true)
                                                updateForm({ block_id: value, lots : data.blockLots })
                                                setLotRequesting(false)
                                            }
                                        }
                                    />
                        </div>
                        <div className="w-full sm:w-1/1">
                                <InputTextLabel htmlFor="project_id" >
                                    Lots
                                </InputTextLabel>
                                <AsyncSelect
                                    autoFocus
                                    defaultOptions={form.lots}
                                    onChange={
                                        ({data, label , value} : any, b : any) => {
                                            updateForm({ project_id: value, area: data.area })
                                        }
                                    }
                                />
                        </div>
                        <div className="w-full sm:w-1/1">
                                <InputTextLabel htmlFor="area" >
                                    Area
                                </InputTextLabel>
                                <InputTextField
                                    type="number"
                                    min="1"
                                    id="area"
                                    autoComplete="off"
                                    placeholder="Lot Are Sqm"
                                    required
                                    value={form.area}
                                    onChange={
                                        (e) => {
                                            updateForm({ [e.target.name]: e.target.value })
                                            calculateMonthly()
                                        }
                                    }
                                    />
                        </div>
                    </div>



                        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                            <div className="w-full sm:w-1/1">
                                    <InputTextLabel htmlFor="price_per_sqm" >
                                        Price Per Sqm
                                    </InputTextLabel>
                                    <InputTextField
                                        id="price_per_sqm"
                                        min="1"
                                        autoComplete="off"
                                        placeholder="Price Per Sqm"
                                        required
                                        value={form.price_per_sqm}
                                        onChange={
                                            (e) => {
                                                updateForm({ [e.target.name]: e.target.value })
                                                calculateMonthly()
                                            }
                                        }
                                        />
                            </div>

                            <div className="w-full sm:w-1/1">
                                    <InputTextLabel htmlFor="tcp" >
                                        TCP
                                    </InputTextLabel>
                                    <InputTextField
                                        type="number"
                                        id="tcp"
                                        autoComplete="off"
                                        placeholder="TCP"
                                        required
                                        value={form.tcp}
                                        onChange={
                                            (e) => {
                                                updateForm({ [e.target.name]: e.target.value })
                                                calculateMonthly()
                                            }
                                        }
                                        />
                            </div>
                        </div>

                        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                            <div className="w-full sm:w-1/1">
                                    <InputTextLabel htmlFor="downpayment" >
                                        Down Payment
                                    </InputTextLabel>
                                    <InputTextField
                                        type="number"
                                        id="downpayment"
                                        autoComplete="off"
                                        placeholder="Down Payment"
                                        required
                                        value={form.downpayment}
                                        onChange={
                                            (e) => {
                                                updateForm({ [e.target.name]: e.target.value })
                                                calculateMonthly()
                                            }
                                        }
                                        />
                            </div>
                            <div className="w-full sm:w-1/1">
                                    <InputTextLabel htmlFor="terms" >
                                        Terms
                                    </InputTextLabel>
                                    <InputTextField
                                        type="number"
                                        id="terms"
                                        autoComplete="off"
                                        placeholder="Terms"
                                        required
                                        value={form.terms}
                                        onChange={
                                            (e) => {
                                                updateForm({ [e.target.name]: e.target.value })
                                                calculateMonthly()
                                            }
                                        }
                                        />
                            </div>
                            <div className="w-full sm:w-1/1">
                                    <InputTextLabel htmlFor="balance" >
                                        Balance
                                    </InputTextLabel>
                                    <InputTextField
                                        id="balance"
                                        autoComplete="off"
                                        placeholder="Balance less down"
                                        required
                                        value={form.balance}
                                        onChange={
                                            (e) => {
                                                updateForm({ [e.target.name]: e.target.value })
                                                calculateMonthly()
                                            }
                                        }
                                        />
                            </div>
                            <div className="w-full sm:w-1/1">
                                    <InputTextLabel htmlFor="monthly" >
                                        Monthly Amortization
                                    </InputTextLabel>
                                    <InputTextField
                                        id="monthly"
                                        autoComplete="off"
                                        placeholder="Monthly Amortization"
                                        required
                                        disabled
                                        value={form.monthly}
                                        onChange={(e) => updateForm({ [e.target.name]: e.target.value })}
                                        />
                            </div>
                        </div>

                        

                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex justify-end gap-4.5">
                                <Link
                                href="/realties">
                                    <NormalButton>
                                        Cancel
                                    </NormalButton>
                                </Link>
                                <PrimarySaveButton/>
                            </div>
                        </div>
                        </form>
                    </div>
                  
                </div>
            </div>
        </div>
        
      );
};
