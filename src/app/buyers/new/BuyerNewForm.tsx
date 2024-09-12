"use client"
import { checkEmailExists, saveBuyerAction } from "@/actions/buyers"
import Link from "next/link"
import { useState } from "react"
import BuyerNewSubmit from "./BuyerNewSubmit"
import { ServerActionResponse } from "@/types/server-action-reply"

export default function BuyerNewForm() {

    const updateForm = (value : any) =>  setForm( (prev: any) =>  { return {...prev, ...value} }  )

    const [form, setForm] = useState({
        first_name: "",
        middle_name: "",
        last_name: "",
        tin: "",
        tin_issuance: "",
        address: "",
        email: "",
        phone: "",
        spouse: {
            first_name: "",
            middle_name: "",
            last_name:"",
            address:"",
            email: "",
            phone: "",
            tin: "",
            tin_issuance: "",
        },
        create_spouse_user: false,
        buyer_id: null,
        spouse_id: null
    })
    const [emailCheckBuyer, setEmailCheckBuyer] = useState<ServerActionResponse>()
    const [resp, setResp] = useState<ServerActionResponse>()



    return (<>
       <form action={
            async() => { 
                const response = await saveBuyerAction(form)
                console.dir(response)
                setResp(response)
            }
        }>
            <div className="p-7">
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/3">
                        <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="first_name"
                        >
                            Buyer First Name
                        </label>
                        <div className="relative">
                            <span className="absolute left-4.5 top-4">
                            <svg
                                className="fill-current"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g opacity="0.8">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M3.72039 12.887C4.50179 12.1056 5.5616 11.6666 6.66667 11.6666H13.3333C14.4384 11.6666 15.4982 12.1056 16.2796 12.887C17.061 13.6684 17.5 14.7282 17.5 15.8333V17.5C17.5 17.9602 17.1269 18.3333 16.6667 18.3333C16.2064 18.3333 15.8333 17.9602 15.8333 17.5V15.8333C15.8333 15.1703 15.5699 14.5344 15.1011 14.0655C14.6323 13.5967 13.9964 13.3333 13.3333 13.3333H6.66667C6.00363 13.3333 5.36774 13.5967 4.8989 14.0655C4.43006 14.5344 4.16667 15.1703 4.16667 15.8333V17.5C4.16667 17.9602 3.79357 18.3333 3.33333 18.3333C2.8731 18.3333 2.5 17.9602 2.5 17.5V15.8333C2.5 14.7282 2.93899 13.6684 3.72039 12.887Z"
                                    fill=""
                                />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M9.99967 3.33329C8.61896 3.33329 7.49967 4.45258 7.49967 5.83329C7.49967 7.214 8.61896 8.33329 9.99967 8.33329C11.3804 8.33329 12.4997 7.214 12.4997 5.83329C12.4997 4.45258 11.3804 3.33329 9.99967 3.33329ZM5.83301 5.83329C5.83301 3.53211 7.69849 1.66663 9.99967 1.66663C12.3009 1.66663 14.1663 3.53211 14.1663 5.83329C14.1663 8.13448 12.3009 9.99996 9.99967 9.99996C7.69849 9.99996 5.83301 8.13448 5.83301 5.83329Z"
                                    fill=""
                                />
                                </g>
                            </svg>
                            </span>
                            <input
                            className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="text"
                            name="first_name"
                            autoComplete="off"
                            id="first_name"
                            required
                            value={form.first_name}
                            onChange={(e) => updateForm({ [e.target.name]: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="w-full sm:w-1/3">
                            <label
                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                htmlFor="middle_name"
                            >
                                Middle Name
                            </label>
                            <input
                                className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                type="text"
                                name="middle_name"
                                autoComplete="off"
                                id="middle_name"
                                value={form.middle_name}
                                onChange={(e) => updateForm({ [e.target.name]: e.target.value })}
                            />
                    </div>
                    <div className="w-full sm:w-1/3">
                            <label
                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                htmlFor="last_name"
                            >
                                Last Name
                            </label>
                            <input
                                className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                type="text"
                                name="last_name"
                                id="last_name"
                                autoComplete="off"
                                required
                                value={form.last_name}
                                onChange={(e) => updateForm({ [e.target.name]: e.target.value })}
                            />
                    </div>
                </div>

                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/3">
                                <label
                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                    htmlFor="email"
                                >
                                    Email
                                </label>
                                <input
                                    className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                    type="email"
                                    name="email"
                                    id="email"
                                    required
                                    autoComplete="off"
                                    value={form.email}
                                    onChange={ async(e) => {
                                            updateForm({ [e.target.name]: e.target.value });
                                            setEmailCheckBuyer(await checkEmailExists(e.target.value))
                                        }
                                    }
                                />
                                { form.email.length > 0 && emailCheckBuyer?.success && emailCheckBuyer?.message && <p className="text-[#CD5D5D] text-sm">{emailCheckBuyer?.message}</p> }
                    </div>
                    <div className="w-full sm:w-1/3">
                                <label
                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                    htmlFor="phone"
                                >
                                    Contact #
                                </label>
                                <input
                                    className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    autoComplete="off"
                                    value={form.phone}
                                    onChange={(e) => updateForm({ [e.target.name]: e.target.value })}
                                />
                    </div>

                    <div className="w-full sm:w-1/3">
                    </div>
                </div>


                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/3">
                                <label
                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                    htmlFor="Address"
                                >
                                    Address
                                </label>
                                <input
                                    className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                    type="text"
                                    name="address"
                                    id="address"
                                    value={form.address}
                                    onChange={(e) => updateForm({ [e.target.name]: e.target.value })}
                                />
                    </div>
                    <div className="w-full sm:w-1/3">
                                <label
                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                    htmlFor="Address"
                                >
                                    TIN
                                </label>
                                <input
                                    className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                    type="text"
                                    name="tin"
                                    id="tin"
                                    value={form.tin}
                                    onChange={(e) => updateForm({ [e.target.name]: e.target.value })}
                                />
                    </div>

                    <div className="w-full sm:w-1/3">
                                <label
                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                    htmlFor="Address"
                                >
                                    Place of issuance of TIN
                                </label>
                                <input
                                    className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                    type="text"
                                    name="tin_issuance"
                                    id="tin_issuance"
                                    value={form.tin_issuance}
                                    onChange={(e) => updateForm({ [e.target.name]: e.target.value })}
                                />
                    </div>

                </div>

                <div className="border-b border-stroke py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">Spouse Information</h3>
                    <div className="flex justify-end">
                        <label
                            htmlFor="create_spouse_user"
                            className="flex cursor-pointer select-none items-center"
                        >
                            <div className="relative">
                            <input
                                type="checkbox"
                                id="create_spouse_user"
                                name="create_spouse_user"
                                className="sr-only"
                                disabled={form.spouse.email.length == 0 || form.spouse.first_name.length == 0}
                                onChange={(e) => { updateForm({ [e.target.name] : !form.create_spouse_user}) } }
                            />
                            <div
                                className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
                                    form.create_spouse_user && "border-primary bg-gray dark:bg-transparent"
                                }`}
                            >
                                <span className={`opacity-0 ${form.create_spouse_user && "!opacity-100"}`}>
                                <svg
                                    width="11"
                                    height="8"
                                    viewBox="0 0 11 8"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                    d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                                    fill="#3056D3"
                                    stroke="#3056D3"
                                    strokeWidth="0.4"
                                    ></path>
                                </svg>
                                </span>
                            </div>
                            </div>
                            Create Spouse as Buyer
                        </label>
                    </div>
                </div>
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row mt-4">
                    <div className="w-full sm:w-1/3">
                        <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="spouse_first_name"
                        >
                            Spouse First Name
                        </label>
                        <div className="relative">
                            <span className="absolute left-4.5 top-4">
                            <svg
                                className="fill-current"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g opacity="0.8">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M3.72039 12.887C4.50179 12.1056 5.5616 11.6666 6.66667 11.6666H13.3333C14.4384 11.6666 15.4982 12.1056 16.2796 12.887C17.061 13.6684 17.5 14.7282 17.5 15.8333V17.5C17.5 17.9602 17.1269 18.3333 16.6667 18.3333C16.2064 18.3333 15.8333 17.9602 15.8333 17.5V15.8333C15.8333 15.1703 15.5699 14.5344 15.1011 14.0655C14.6323 13.5967 13.9964 13.3333 13.3333 13.3333H6.66667C6.00363 13.3333 5.36774 13.5967 4.8989 14.0655C4.43006 14.5344 4.16667 15.1703 4.16667 15.8333V17.5C4.16667 17.9602 3.79357 18.3333 3.33333 18.3333C2.8731 18.3333 2.5 17.9602 2.5 17.5V15.8333C2.5 14.7282 2.93899 13.6684 3.72039 12.887Z"
                                    fill=""
                                />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M9.99967 3.33329C8.61896 3.33329 7.49967 4.45258 7.49967 5.83329C7.49967 7.214 8.61896 8.33329 9.99967 8.33329C11.3804 8.33329 12.4997 7.214 12.4997 5.83329C12.4997 4.45258 11.3804 3.33329 9.99967 3.33329ZM5.83301 5.83329C5.83301 3.53211 7.69849 1.66663 9.99967 1.66663C12.3009 1.66663 14.1663 3.53211 14.1663 5.83329C14.1663 8.13448 12.3009 9.99996 9.99967 9.99996C7.69849 9.99996 5.83301 8.13448 5.83301 5.83329Z"
                                    fill=""
                                />
                                </g>
                            </svg>
                            </span>
                            <input
                            className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="text"
                            name="spouse_first_name"
                            id="spouse_first_name"
                            required={ form.spouse.middle_name.length > 0 || form.spouse.last_name.length > 0}
                            autoComplete="off"
                            value={form.spouse.first_name}
                            onChange={(e) => updateForm({ spouse : { ...form.spouse, first_name: e.target.value }})}
                            />
                        </div>
                    </div>
                    <div className="w-full sm:w-1/3">
                            <label
                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                htmlFor="spouse_middle_name"
                            >
                                Spouse Middle Name
                            </label>
                            <input
                                className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                type="text"
                                name="spouse_middle_name"
                                id="spouse_middle_name"
                                autoComplete="off"
                                value={form.spouse.middle_name}
                                onChange={(e) => updateForm({ spouse : { ...form.spouse, middle_name: e.target.value }})}
                            />
                    </div>
                    <div className="w-full sm:w-1/3">
                            <label
                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                htmlFor="spouse_last_name"
                            >
                                Spouse Last Name
                            </label>
                            <input
                                className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                type="text"
                                name="spouse_last_name"
                                id="spouse_last_name"
                                autoComplete="off"
                                required={ form.spouse.middle_name.length > 0 || form.spouse.first_name.length > 0}
                                value={form.spouse.last_name}
                                onChange={(e) => updateForm({ spouse : { ...form.spouse, last_name: e.target.value }})}
                            />
                    </div>
                </div>

                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/3">
                                <label
                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                    htmlFor="spouse_email"
                                >
                                    Spouse Email
                                </label>
                                <input
                                    className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                    type="email"
                                    name="spouse_email"
                                    id="spouse_email"
                                    autoComplete="off"
                                    required={form.create_spouse_user}
                                    value={form.spouse.email}
                                    onChange={(e) => updateForm({ spouse : { ...form.spouse, email: e.target.value }})}
                                />
                    </div>
                    <div className="w-full sm:w-1/3">
                                <label
                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                    htmlFor="spouse_phone"
                                >
                                    Spouse Contact #
                                </label>
                                <input
                                    className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                    type="text"
                                    name="spouse_phone"
                                    id="spouse_phone"
                                    autoComplete="off"
                                    value={form.spouse.phone}
                                    onChange={(e) => updateForm({ spouse : { ...form.spouse, phone: e.target.value }})}
                                />
                    </div>

                    <div className="w-full sm:w-1/3">
                    </div>
                </div>


                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/3">
                                <label
                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                    htmlFor="spouse_address"
                                >
                                    Spouse Address
                                </label>
                                <input
                                    className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                    type="text"
                                    name="spouse_address"
                                    id="spouse_address"
                                    autoComplete="off"
                                    value={form.spouse.address}
                                    onChange={(e) => updateForm({ spouse : { ...form.spouse, address: e.target.value }})}
                                />
                    </div>
                    <div className="w-full sm:w-1/3">
                                <label
                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                    htmlFor="spouse_tin"
                                >
                                    Spouse TIN
                                </label>
                                <input
                                    className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                    type="text"
                                    name="spouse_tin"
                                    id="spouse_tin"
                                    autoComplete="off"
                                    value={form.spouse.tin}
                                    onChange={(e) => updateForm({ spouse : { ...form.spouse, tin: e.target.value }})}
                                />
                    </div>

                    <div className="w-full sm:w-1/3">
                                <label
                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                    htmlFor="spouse_tin_issuance"
                                >
                                    Spouse  Place of issuance of TIN
                                </label>
                                <input
                                    className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                    type="text"
                                    name="spouse_tin_issuance"
                                    id="spouse_tin_issuance"
                                    value={form.spouse.tin_issuance}
                                    onChange={(e) => updateForm({ spouse : { ...form.spouse, tin_issuance: e.target.value }})}
                                />
                    </div>

                </div>
                <div className="flex justify-end gap-4.5">
                    <Link href="/buyers" className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
                        <button
                            className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                            type="submit"
                            >
                            Cancel
                        </button>
                    </Link>
                    <BuyerNewSubmit state={resp}/>
                </div>
            </div>
        </form>
        </>)
}