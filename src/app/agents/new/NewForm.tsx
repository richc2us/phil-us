"use client"
import { checkEmailExists, saveAgentAction } from "@/actions/agents"
import Link from "next/link"
import { useState } from "react"
import NewSubmit from "./NewSubmit"
import { ServerActionResponse } from "@/types/server-action-reply"
import { initialStateAgent } from "@/actions/state"
import InputTextField from "@/components/FormElements/Fields/InputTextField"
import InputTextLabel from "@/components/FormElements/Fields/InputTextLabel"

export default function NewForm() {

    const updateForm = (value : any) =>  setForm( (prev: any) =>  { return {...prev, ...value} }  )

    const [form, setForm] = useState(initialStateAgent)
    const [emailExists, setEmailExists] = useState(false)
    const [emailCheckAgent, setEmailCheckAgent] = useState<ServerActionResponse>()
    const [resp, setResp] = useState<ServerActionResponse>()

    async function checkEmail(email:any) {
        const checker = await checkEmailExists(email)
        setEmailCheckAgent(checker)
        setEmailExists(checker.success)
    }

    return (<>
       <form action={
            async() => {
                const response = await saveAgentAction(form)
                setResp(response)
            }
        }>
            <div className="p-7">
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/3">
                        <InputTextLabel htmlFor="first_name">
                        Agent First Name
                        </InputTextLabel>
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
                                <InputTextField
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 pl-11.5 pr-4.5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    autoComplete="off"
                                    id="first_name"
                                    placeholder="First Name"
                                    required
                                    value={form.first_name}
                                    onChange={(e) => updateForm({ [e.target.name]: e.target.value })}
                                />
                        </div>
                    </div>
                    <div className="w-full sm:w-1/3">
                            <InputTextLabel htmlFor="middle_name">
                                Middle Name
                            </InputTextLabel>
                            <InputTextField
                                id="middle_name"
                                autoComplete="off"
                                placeholder="Middle Name"
                                value={form.middle_name}
                                onChange={(e) => updateForm({ [e.target.name]: e.target.value })}
                            />
                    </div>
                    <div className="w-full sm:w-1/3">
                                <InputTextLabel htmlFor="last_name">
                                    Last Name
                                </InputTextLabel>
                                <InputTextField
                                    id="last_name"
                                    placeholder="Last Name"
                                    autoComplete="off"
                                    required
                                    value={form.last_name}
                                    onChange={(e) => updateForm({ [e.target.name]: e.target.value })}
                                />
                    </div>
                </div>

                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/3">
                                <InputTextLabel htmlFor="email">
                                    Email
                                </InputTextLabel>
                                <InputTextField
                                    type="email"
                                    id="email"
                                    required
                                    autoComplete="off"
                                    placeholder="Agent Email"
                                    value={form.email}
                                    onChange={ async(e) => {
                                            updateForm({ [e.target.name]: e.target.value });
                                            checkEmail(e.target.value)
                                        }
                                    }
                                />
                                { form?.email?.length > 2 && emailCheckAgent?.message && <p className={(!emailCheckAgent?.success ? "text-success " : "text-[#CD5D5D] ") +"text-sm mt-1.5 px-2"}>{emailCheckAgent?.message}</p> }
                                { 
                                   emailExists && <ol>
                                        {emailCheckAgent?.document && emailCheckAgent?.document.map( (user:any, key:any) => {
                                            return <li key={key} className="text-sm py-2"> {key + 1}. { user.first_name } { user.middle_name } { user.last_name } { user.email } </li>
                                        })}
                                    </ol>
                                }
                    </div>
                    <div className="w-full sm:w-1/3">
                                <InputTextLabel htmlFor="phone">
                                    Contact #
                                </InputTextLabel>
                                <InputTextField
                                   id="phone"
                                   value={form.phone}
                                   autoComplete="off"
                                   placeholder="Any Contact #"
                                   onChange={(e) => updateForm({ [e.target.name]: e.target.value })}
                                />
                    </div>

                    <div className="w-full sm:w-1/3 flex gap-2">
                            <div className="w-full sm:w-1/2">
                                <InputTextLabel htmlFor="tin">
                                    TIN
                                </InputTextLabel>
                                <InputTextField
                                   id="tin"
                                   value={form.tin}
                                   autoComplete="off"
                                    placeholder="Tax Identification Number"
                                   onChange={(e) => updateForm({ [e.target.name]: e.target.value })}
                                />
                            </div>
                            <div className="w-full sm:w-1/2">
                                <InputTextLabel htmlFor="tin_issuance">
                                    Place of issuance of TIN
                                </InputTextLabel>
                                <InputTextField
                                   id="tin_issuance"
                                   value={form.tin_issuance}
                                   autoComplete="off"
                                   placeholder="Place of issuance of TIN"
                                   onChange={(e) => updateForm({ [e.target.name]: e.target.value })}
                                />
                            </div>
                    </div>
                </div>


                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/3">
                                <InputTextLabel htmlFor="address">
                                    Address
                                </InputTextLabel>
                                <InputTextField
                                    id="address"
                                    value={form.address}
                                    autoComplete="off"
                                    placeholder="Address"
                                    onChange={(e) => updateForm({ [e.target.name]: e.target.value })}
                                />
                    </div>
                    <div className="w-full sm:w-1/3">
                                <InputTextLabel htmlFor="region">
                                    Region
                                </InputTextLabel>
                                <InputTextField
                                    id="region"
                                    value={form.region}
                                    autoComplete="off"
                                    placeholder="Region"
                                    onChange={(e) => updateForm({ [e.target.name]: e.target.value })}
                                />
                    </div>

                    <div className="w-full sm:w-1/3">
                                <InputTextLabel htmlFor="province">
                                    Province
                                </InputTextLabel>
                                <InputTextField
                                    id="province"
                                    value={form.province}
                                    autoComplete="off"
                                    placeholder="Province"
                                    onChange={(e) => updateForm({ [e.target.name]: e.target.value })}
                                />
                    </div>
                </div>
                <div className="mb-5 5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/3">
                                <InputTextLabel htmlFor="city">
                                    City
                                </InputTextLabel>
                                <InputTextField
                                    id="city"
                                    value={form.city}
                                    autoComplete="off"
                                    placeholder="City"
                                    onChange={(e) => updateForm({ [e.target.name]: e.target.value })}
                                />
                    </div>

                    <div className="w-full sm:w-1/3">
                                <InputTextLabel htmlFor="barangay">
                                    Barangay
                                </InputTextLabel>
                                <InputTextField
                                    id="barangay"
                                    value={form.barangay}
                                    autoComplete="off"
                                    placeholder="Barangay"
                                    onChange={(e) => updateForm({ [e.target.name]: e.target.value })}
                                />
                    </div>

                    <div className="w-full sm:w-1/3">
                                <InputTextLabel htmlFor="zip">
                                    Zip
                                </InputTextLabel>
                                <InputTextField
                                    id="zip"
                                    value={form.zip}
                                    autoComplete="off"
                                    placeholder="Zip"
                                    onChange={(e) => updateForm({ [e.target.name]: e.target.value })}
                                />
                    </div>
                </div>


                <div className="flex justify-end gap-4.5">
                    <Link href="/Agents" className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
                        <button
                            className="flex justify-center rounded border border-stroke px-6 py-1 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                            type="submit"
                            >
                            Cancel
                        </button>
                    </Link>
                    <NewSubmit state={ {...resp, disabled: emailExists} }/>
                </div>
            </div>
        </form>
        </>)
}