"use client"
import {  useState } from "react";
import Loader from "@/components/common/Loader";
import { AlertError, AlertSuccess } from "@/app/ui/alerts/alerts";
import { ServerActionResponse } from "@/types/server-action-reply";
import Link from "next/link";
import { initialAcceptablePayment } from "@/actions/state";
import InputTextField from "@/components/FormElements/Fields/InputTextField";
import Select from "react-select";
import { MODE_OF_PAYMENT } from "@/actions/const";
import PrimarySaveButton from "@/components/FormElements/Buttons/PrimarySaveButton";
import NormalButton from "@/components/FormElements/Buttons/NormalButton";
import { updateReceiverAccountAction } from "@/actions/receiver_accounts";


export default function PageClient({document} : any){

      const [form, setForm] = useState({...document, id: document._id.toString()})
      const [requesting, setRequesting] = useState(false)
      const [reply, setReply] = useState<ServerActionResponse>()

      function updateForm(value : any) {
        return setForm((prev: any) => {
            return { ...prev, ...value };
        });
      }

      return (
        <form
            action={ async() => {
                    setRequesting(true)
                    let response  =  await updateReceiverAccountAction(form)
                    setRequesting(false)
                    setReply({...response})
                    if(response.success) {
                        updateForm({...response.document, edit:false})
                    }
                }
            }
        >
        <div className="grid grid-cols-2 gap-8">
            <div className="col-span-1 xl:col-span-1">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-7 py-4 dark:border-strokedark overflow-hidden">
                        <h3 className="font-medium text-black dark:text-white float-start">
                            Receiver Account Information
                        </h3>
                        <div className="float-end">
                            {
                                !form.edit && <NormalButton onClick={ (e) => updateForm({edit: true})} > Edit </NormalButton>
                            }
                            {
                                form.edit && <PrimarySaveButton/>
                            }
                        </div>
                    </div>
                    <div className="p-7">
                        { requesting && <Loader isFormLoading={true} /> }
                        {
                           !requesting && reply?.success && reply?.message && <AlertSuccess message={reply?.message}/>
                        }
                        {
                           !requesting && !reply?.success && reply?.message && <AlertError message={reply?.message} description={reply?.errors}/>
                        }
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
                                    disabled={!form.edit}
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
                                    disabled={!form.edit}
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
                                            isDisabled={!form.edit}
                                            options={
                                            Object.keys(MODE_OF_PAYMENT).map( (mode:any) => {
                                                return { value: mode, label: mode }
                                            })
                                            }
                                            placeholder="Mode of Payment"
                                            defaultValue={{value:form.mode_of_payment, label: form.mode_of_payment}}
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
                                disabled={!form.edit}
                                onChange={(e) => updateForm({ description: e.target.value })}
                            ></textarea>
                            </div>
                        </div>

                        <div className="mb-4 flex items-center gap-3">
                        <div className="flex justify-end gap-4.5">
                            <Link href="/payments/receiver-account">
                                <button
                                className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                                type="button"
                                >
                                Cancel
                                </button>
                            </Link>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>)
}