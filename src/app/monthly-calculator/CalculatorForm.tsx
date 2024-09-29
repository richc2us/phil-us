"use client"
import {  useEffect, useState } from "react";
import { AlertError, AlertSuccess } from "@/app/ui/alerts/alerts";
import { ServerActionResponse } from "@/types/server-action-reply";
import { getRealties } from "@/actions/realties";
import Link from "next/link";
import PrimarySaveButton from "@/components/FormElements/Buttons/PrimarySaveButton";
import InputTextLabel from "@/components/FormElements/Fields/InputTextLabel";
import InputTextField from "@/components/FormElements/Fields/InputTextField";
import NormalButton from "@/components/FormElements/Buttons/NormalButton";
import {  initialStateAmortizationSchedule, initialStateReservation } from "@/actions/state";
import AsyncSelect from 'react-select/async';
import { searchBuyer, searchProject } from "@/actions/search";
import { initTWE, Collapse } from "tw-elements";
import { getAgents } from "@/actions/agents";
import { saveAmortizationAction } from "@/actions/amortizations";
import DatePicker from "react-datepicker";


export default function CalculatorForm() {

    const [form, setForm] = useState({...initialStateReservation})

    function updateForm(value : any) {
        return setForm((prev: any) => {
            return { ...prev, ...value };
        });
    }


    function calculateMonthly() {
        let tcp = form.area * form.price_per_sqm
        let down_payment = form.down_payment
        let reservation = form.reservation
        let discount_percent_amount = (form.discount_percent/100) * tcp
        let balance = tcp - down_payment - discount_percent_amount - reservation
        let monthly = parseFloat((balance / form.terms).toFixed(2))
        adjustAmortizationDate(monthly)
        updateForm({
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
        form.discount_percent_amount
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



    return (
  
        <div className="grid grid-cols-6 gap-8">
            <div className="col-span-3 xl:col-span-3">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Amortization
                        </h3>
                    </div>
                    <div className="p-7">
                        <div className="mb-5.5 mt-5.5 flex flex-col gap-5.5 sm:flex-row">
                                <div className="w-full sm:w-1/1">
                                    <InputTextLabel htmlFor="area" >
                                            Area sqm
                                        </InputTextLabel>
                                        <InputTextField
                                            className="w-full rounded border-b border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            type="number"
                                            id="area"
                                            min="0"
                                            autoComplete="off"
                                            placeholder="Price Per Sqm"
                                            required
                                            value={form.area}
                                            onChange={
                                                (e) => {
                                                    updateForm({ [e.target.name]: parseFloat(e.target.value) })
                                                }
                                            }
                                            />
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
                                                updateForm({ [e.target.name]: parseFloat(e.target.value) })
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

                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex justify-end gap-4.5">
                                <Link
                                href="/reservations">
                                    <NormalButton>
                                        Cancel
                                    </NormalButton>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-span-3 xl:col-span-3">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Amortization
                        </h3>
                    </div>
                    <div className="p-7">
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
                                            let date = new Date()
                                                return <tr key={k}>
                                                    <td>
                                                        <p> {k+1}</p>
                                                    </td>
                                                    <td>
                                                        <p> ₱ {  new Intl.NumberFormat().format(form.monthly) } </p>
                                                    </td>
                                                    <td>
                                                        <DatePicker
                                                        dateFormat="MM/dd/yyyy"
                                                        value={form.schedules[k].due_date ? form.schedules[k].due_date : ""}
                                                        onChange={(date) => {
                                                            let s = form.schedules
                                                            s[k].due_date =  date?.getMonth() + "/" + date?.getDate() +  "/" + date?.getFullYear()
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
        </div>
      );
};
