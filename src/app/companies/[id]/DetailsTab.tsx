"use client"
import { updateCompany } from "@/actions/companies"
import NormalButton from "@/components/FormElements/Buttons/NormalButton"
import PrimarySaveButton from "@/components/FormElements/Buttons/PrimarySaveButton"
import { usePageID } from "@/context/IDContext"
import { useState } from "react"
import { ActiveButton } from "../ActiveButton"

export default function DetailsTab({company} : any) {
    const id = usePageID()
    const [form, setForm] = useState({ ...company, edit: false, id})
    return(<>
    <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">

            <div className="flex flex-col gap-9">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white overflow-hidden">
                            <div className="float-start">
                                Current Information
                            </div>
                            <div className="flex float-end gap-2 grid-cols-2">
                                { !form.edit && <NormalButton onClick={ (e) => setForm({...form, edit: true})} > Edit </NormalButton> }
                                { form.edit && <ActiveButton id={form.id} active={!form.active} /> }
                                { form.edit && <PrimarySaveButton/> }
                            </div>
                        </h3>
                    </div>
                    <form action={ async() => {
                        await updateCompany(form)
                        setForm({...form, edit: false})
                        }
                    }>
                        <div className="flex flex-col gap-5.5 p-6.5">
                            <div>
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Company Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Default Input"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    name="name"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                                    autoComplete="off"
                                    disabled={!form.edit}
                                />
                            </div>

                            <div>
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    placeholder="Default Input"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    name="address"
                                    value={form.address}
                                    onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                                    autoComplete="off"
                                    disabled={!form.edit}
                                />
                            </div>

                            <div>
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Alternative Address
                                </label>
                                <input
                                    type="text"
                                    placeholder="Default Input"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    name="address2"
                                    value={form.address2}
                                    onChange={(e) => setForm({ ...form, [e.target.name] : e.target.value })}
                                    autoComplete="off"
                                    disabled={!form.edit}
                                />
                            </div>

                            <div>
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="description">Description</label>
                                <textarea
                                    rows={6}
                                    name="description"
                                    id="description"
                                    placeholder="Type your message"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                                    autoComplete="off"
                                    disabled={!form.edit}
                                ></textarea>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
    </div>
    </>)
}