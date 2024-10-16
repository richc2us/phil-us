import { initialStateProject } from "@/actions/state";
import NormalButton from "@/components/FormElements/Buttons/NormalButton";
import PrimarySaveButton from "@/components/FormElements/Buttons/PrimarySaveButton";
import InputTextField from "@/components/FormElements/Fields/InputTextField";
import InputTextLabel from "@/components/FormElements/Fields/InputTextLabel";
import { ServerActionResponse } from "@/types/server-action-reply";
import React, { useState } from "react";

export default function TabDocuments() {

    const [form, setForm] = useState({...initialStateProject, original_owners : [{}]})
    const [resp, setResp] = useState<ServerActionResponse>()

    const updateForm = (value : any) =>  setForm( (prev: any) =>  { return {...prev, ...value} }  )

    return (
    <>
           <div className="grid grid-cols-1">
                <div className="col-span-1 xl:col-span-1">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

                        <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white overflow-hidden">
                                <div className="float-start">
                                    Documents
                                </div>
                            </h3>
                        </div>

                        <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white overflow-hidden">
                                <div className="float-start">
                                    Coordinates
                                </div>
                            </h3>
                        </div>

                        <div className="pt-7 pb-7">

                        </div>

                        <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white overflow-hidden">
                                <div className="float-start">
                                    Terrane Information
                                </div>
                            </h3>
                        </div>

                        <div className="pt-7 pb-7">

                        </div>

                        <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white overflow-hidden">
                                <div className="float-start">
                                    Details
                                </div>
                            </h3>
                        </div>

                        <div className="p-7">
                            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                <div className="w-full sm:w-2/2">
                                        <InputTextLabel id="longitude">
                                            Purchase Scheme
                                        </InputTextLabel>
                                        
                                        <textarea
                                            id="purchase_scheme"
                                            name="purchase_scheme"
                                            placeholder="Purchase Scheme"
                                            autoComplete="off"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            value={form.purchase_scheme}
                                            onChange={(e) => updateForm({ [e.target.name]: e.target.value })}
                                        ></textarea>
                                </div>
                            </div>
                            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                <div className="w-full sm:w-2/2">
                                            <InputTextLabel id="title_information">
                                                Title Information
                                            </InputTextLabel>

                                            <textarea
                                                id="title_information"
                                                name="title_information"
                                                placeholder="Title Informatione"
                                                autoComplete="off"
                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                value={form.title_information}
                                                onChange={(e) => updateForm({ [e.target.name]: e.target.value })}
                                            ></textarea>
                                    </div>
                            </div>

                            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                <div className="w-full sm:w-1/1">
                                        <InputTextLabel id="legal_documentation">
                                            Legal Documentation
                                        </InputTextLabel>
                                        <textarea
                                                id="legal_documentation"
                                                name="legal_documentation"
                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                placeholder="Legal Documentation"
                                                autoComplete="off"
                                                value={form.legal_documentation}
                                                onChange={(e) => updateForm({ [e.target.name]: e.target.value })}
                                        ></textarea>
                                </div>
                                {/* <div className="w-full sm:w-1/3">
                                        <InputTextLabel id="terrane_information">
                                            Terrane Information
                                        </InputTextLabel>

                                        <InputTextField
                                            id="terrane_information"
                                            placeholder="Terrane Information"
                                            autoComplete="off"
                                            value={form.terrane_information}
                                            onChange={(e) => updateForm({ [e.target.name]: e.target.value })}
                                        />
                                </div> */}
                            </div>

                            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                <div className="w-full sm:w-1/1">
                                        <InputTextLabel id="restrictions">
                                            Restrictions
                                        </InputTextLabel>
                                        <textarea
                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                id="restrictions"
                                                name="restrictions"
                                                placeholder="Restriction"
                                                autoComplete="off"
                                                value={form.restrictions}
                                                onChange={(e) => updateForm({ [e.target.name]: e.target.value })}
                                        ></textarea>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
    </>
    );
}