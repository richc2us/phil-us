"use client"
import {  useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import { AlertError, AlertSuccess } from "@/app/ui/alerts/alerts";
import { ServerActionResponse } from "@/types/server-action-reply";
import Link from "next/link";
import { initialReceiverAccount } from "@/actions/state";
import InputTextField from "@/components/FormElements/Fields/InputTextField";
import Select from "react-select";
import { MODE_OF_PAYMENT } from "@/actions/const";
import PrimarySaveButton from "@/components/FormElements/Buttons/PrimarySaveButton";
import { getReceiverAccountNewAction, saveReceiverAccountAction } from "@/actions/receiver_accounts";


export default function NewForm(){

      const [form, setForm] = useState({...initialReceiverAccount})
      const [acceptablePayments, setAcceptablePayments] = useState([])
      const [requesting, setRequesting] = useState(false)
      const [reply, setReply] = useState<ServerActionResponse>()

      function updateForm(value : any) {
        return setForm((prev: any) => {
            return { ...prev, ...value };
        });
      }

      const getReceiversAction = async() => {
        const resp:any = await getReceiverAccountNewAction()
        if(resp) {
            setAcceptablePayments(resp )
        }
      }

      useEffect(() => {
        getReceiversAction()
        
      },[requesting])

      return (
        <div className="grid grid-cols-2 gap-8">
            <div className="col-span-1 xl:col-span-1">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Receiver Account Information
                        </h3>
                    </div>
                    <div className="p-7">
                        { requesting && <Loader isFormLoading={true} /> }
                        {
                            reply?.success && <AlertSuccess message={reply?.message}/>
                        }
                        {
                            !reply?.success && reply?.message && <AlertError message={reply?.message} description={reply?.errors}/>
                        }
                        <form
                            action={ async() => {
                                    setRequesting(true)
                                    let response  =  await saveReceiverAccountAction(form)
                                    setReply(response)
                                    if(response.success) {
                                        updateForm({...initialReceiverAccount})
                                    }
                                    setRequesting(false)
                                    getReceiversAction()
                                }
                            }
                        >
                        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                            <div className="w-full sm:w-1/1">
                                <label
                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                    htmlFor="name"
                                >
                                    Name
                                </label>
                                <div className="relative">
                                    <InputTextField
                                    id="name"
                                    placeholder="Name"
                                    autoComplete="off"
                                    required
                                    value={form.name}
                                    onChange={(e) => updateForm({ name: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                            <div className="w-full sm:w-1/1">
                                <label
                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                    htmlFor="account_number"
                                >
                                    Account Number
                                </label>
                                <div className="relative">
                                    <InputTextField
                                    id="account_number"
                                    placeholder="Account Number"
                                    autoComplete="off"
                                    required
                                    value={form.account_number}
                                    onChange={(e) => updateForm({ account_number: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                            <div className="w-full sm:w-1/1">
                                    <label
                                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                                        htmlFor="mode_of_payment"
                                    >
                                        Payment Type
                                    </label>
                                    <div className="relative">
                                        <Select
                                            id="mode_of_payment"
                                            required
                                            options={
                                            Object.keys(MODE_OF_PAYMENT).map( (mode:any) => {
                                                return { value: mode, label: mode }
                                            })
                                            }
                                            placeholder="Mode of Payment"
                                            onChange={
                                                async({ data ,label , value} : any, b : any) => {
                                                    updateForm({ mode_of_payment: label})
                                                }
                                            }
                                        />
                                    </div>
                                </div>
                        </div>

                        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                            <div className="w-full sm:w-1/1">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="description">Description</label>
                            <textarea
                                rows={6}
                                name="description"
                                id="description"
                                placeholder="Type your message"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                value={form.description}
                                onChange={(e) => updateForm({ description: e.target.value })}
                            ></textarea>
                            </div>
                        </div>

                        <div className="mb-4 flex items-center gap-3">
                        <div className="flex justify-end gap-4.5">
                            <Link href="/payments/acceptable-payment">
                                <button
                                className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                                type="submit"
                                onClick={ (e:any) => {
                                        if(!confirm("Are you sure to cancel?")) {
                                            e.preventDefault()
                                        }
                                    }
                                }
                                >
                                Cancel
                                </button>
                            </Link>
                            <PrimarySaveButton
                                {...{disabled: requesting || form.name.length == 0 || form.mode_of_payment.length == 0}}
                            />
                        </div>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="col-span-1 xl:col-span-1">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Current Acceptable Payments
                        </h3>
                    </div>
                    <div className="p-7">
                        <div className="grid grid-cols-4 border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-4 md:px-6 2xl:px-7.5">
                            
                            <div className="col-span-1 flex items-center">
                                <p className="font-medium">ID</p>
                            </div>

                            <div className="col-span-1 flex items-center">
                                <p className="font-medium">Name</p>
                            </div>

                            <div className="col-span-1 flex items-center">
                                <p className="font-medium">Account Number</p>
                            </div>

                            <div className="col-span-1 flex items-center">
                            <p className="font-medium">Description</p>
                            </div>

                           
                        </div>
                                {
                                    acceptablePayments.map((document:any, key:any) => (
                                        <div
                                        className="grid grid-cols-4 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-4 md:px-6 2xl:px-7.5"
                                        key={key}
                                      >
                                        <div className="col-span-1 hidden items-center sm:flex">
                                          <p className="text-sm text-black dark:text-white">
                                            {key + 1}
                                          </p>
                                        </div>
                                        
                                        <div className="col-span-1 flex items-center">
                                          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                            <p className="text-sm text-black dark:text-white">
                                              {document.name}
                                            </p>
                                          </div>
                                        </div>

                                        <div className="col-span-1 flex items-center">
                                          <p className="text-sm text-black dark:text-white">
                                            {document.account_number}
                                          </p>
                                        </div>

                                        <div className="col-span-1 flex items-center">
                                          <p className="text-sm text-black dark:text-white">
                                            {document.description}
                                          </p>
                                        </div>
                                        
                                      </div>))
                                }
                    </div>
                </div>
            </div>
        </div>
    );
};