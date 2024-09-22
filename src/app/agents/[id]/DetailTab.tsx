import { updateAgentAction, checkEmailExists } from "@/actions/agents"
import { initialStateAgent } from "@/actions/state"
import InputTextField from "@/components/FormElements/Fields/InputTextField"
import InputTextLabel from "@/components/FormElements/Fields/InputTextLabel"
import { ServerActionResponse } from "@/types/server-action-reply"
import {  useEffect, useState } from "react"
import NormalButton from "@/components/FormElements/Buttons/NormalButton"
import PrimarySaveButton from "@/components/FormElements/Buttons/PrimarySaveButton"

export function DetailTab({document} : any) {
    const updateForm = (value : any) =>  setForm( (prev: any) =>  { return {...prev, ...value} }  )
    const [form, setForm] = useState({...initialStateAgent,  ...document, id: document._id, edit: false})
    const [emailExists, setEmailExists] = useState(false)

    const [emailCheckBuyer, setEmailCheckBuyer] = useState<ServerActionResponse>()
    const [resp, setResp] = useState<ServerActionResponse>()


    async function checkEmail(email:any) {
        const checker = await checkEmailExists(email)
        setEmailCheckBuyer(checker)
        if(checker.success) {
            setEmailExists(true)
        } else {
            setEmailExists(false)
        }
    }

    useEffect(()=> {
        fetch("/api/realties").then( async(res) => updateForm({realties : await res.json() })  )
    },[])


    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4">
        <form action={
            async() => { 
                const response = await updateAgentAction(form)
                updateForm({edit:false})
                setResp(response)
            }
        }>
            <div className="">
                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white overflow-hidden">
                        <div className="float-start">
                            Current Information
                        </div>
                        <div className="float-end">
                            {
                                !form.edit && <NormalButton onClick={ (e) => setForm({...form, edit: true})} > Edit </NormalButton>
                            }
                            {
                                form.edit && <PrimarySaveButton/>
                            }
                        </div>
                    </h3>
                </div>
                <div className="flex flex-col gap-5.5 p-6.5">
                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                        <div className="w-full sm:w-1/3">
                            <InputTextLabel htmlFor="first_name">
                            Buyer First Name
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
                                        disabled={!form.edit}
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
                                    disabled={!form.edit}
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
                                        disabled={!form.edit}
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
                                        placeholder="Buyer Email"
                                        value={form.email}
                                        disabled={!form.edit}
                                        onChange={ async(e) => {
                                                updateForm({ [e.target.name]: e.target.value });
                                                checkEmail(e.target.value)
                                            }
                                        }
                                    />
                                    { form?.email?.length > 2 && emailCheckBuyer?.message && <p className={(!emailCheckBuyer?.success ? "text-success " : "text-[#CD5D5D] ") +"text-sm mt-1.5 px-2"}>{emailCheckBuyer?.message}</p> }
                                    { 
                                    emailExists && <ol>
                                            {emailCheckBuyer?.document && emailCheckBuyer?.document.map( (user:any, key:any) => {
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
                                    disabled={!form.edit}
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
                                    disabled={!form.edit}
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
                                    disabled={!form.edit}
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
                                        disabled={!form.edit}
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
                                        disabled={!form.edit}
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
                                        disabled={!form.edit}
                                        autoComplete="off"
                                        placeholder="Province"
                                        onChange={(e) => updateForm({ [e.target.name]: e.target.value })}
                                    />
                        </div>
                    </div>
                    <div className="mb-5 5 flex flex-col gap-5.5 sm:flex-row">
                        <div className="w-full sm:w-1/4">
                                    <InputTextLabel htmlFor="city">
                                        City
                                    </InputTextLabel>
                                    <InputTextField
                                        id="city"
                                        value={form.city}
                                        disabled={!form.edit}
                                        autoComplete="off"
                                        placeholder="City"
                                        onChange={(e) => updateForm({ [e.target.name]: e.target.value })}
                                    />
                        </div>

                        <div className="w-full sm:w-1/4">
                                    <InputTextLabel htmlFor="barangay">
                                        Barangay
                                    </InputTextLabel>
                                    <InputTextField
                                        id="barangay"
                                        value={form.barangay}
                                        disabled={!form.edit}
                                        autoComplete="off"
                                        placeholder="Barangay"
                                        onChange={(e) => updateForm({ [e.target.name]: e.target.value })}
                                    />
                        </div>

                        <div className="w-full sm:w-1/4">
                                    <InputTextLabel htmlFor="zip">
                                        Zip
                                    </InputTextLabel>
                                    <InputTextField
                                        id="zip"
                                        value={form.zip}
                                        disabled={!form.edit}
                                        autoComplete="off"
                                        placeholder="Zip"
                                        onChange={(e) => updateForm({ [e.target.name]: e.target.value })}
                                    />
                        </div>

                        <div className="w-full sm:w-1/4">
                                    <InputTextLabel htmlFor="realty">
                                        Realty
                                    </InputTextLabel>
                                    <div className="relative z-20 bg-white dark:bg-form-input">
                                    <span className="absolute left-4 top-1/2 z-30 -translate-y-1/2">
                                    <svg
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
                                            d="M10.0007 2.50065C5.85852 2.50065 2.50065 5.85852 2.50065 10.0007C2.50065 14.1428 5.85852 17.5007 10.0007 17.5007C14.1428 17.5007 17.5007 14.1428 17.5007 10.0007C17.5007 5.85852 14.1428 2.50065 10.0007 2.50065ZM0.833984 10.0007C0.833984 4.93804 4.93804 0.833984 10.0007 0.833984C15.0633 0.833984 19.1673 4.93804 19.1673 10.0007C19.1673 15.0633 15.0633 19.1673 10.0007 19.1673C4.93804 19.1673 0.833984 15.0633 0.833984 10.0007Z"
                                            fill="#637381"
                                        ></path>
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M0.833984 9.99935C0.833984 9.53911 1.20708 9.16602 1.66732 9.16602H18.334C18.7942 9.16602 19.1673 9.53911 19.1673 9.99935C19.1673 10.4596 18.7942 10.8327 18.334 10.8327H1.66732C1.20708 10.8327 0.833984 10.4596 0.833984 9.99935Z"
                                            fill="#637381"
                                        ></path>
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M7.50084 10.0008C7.55796 12.5632 8.4392 15.0301 10.0006 17.0418C11.5621 15.0301 12.4433 12.5632 12.5005 10.0008C12.4433 7.43845 11.5621 4.97153 10.0007 2.95982C8.4392 4.97153 7.55796 7.43845 7.50084 10.0008ZM10.0007 1.66749L9.38536 1.10547C7.16473 3.53658 5.90275 6.69153 5.83417 9.98346C5.83392 9.99503 5.83392 10.0066 5.83417 10.0182C5.90275 13.3101 7.16473 16.4651 9.38536 18.8962C9.54325 19.069 9.76655 19.1675 10.0007 19.1675C10.2348 19.1675 10.4581 19.069 10.6159 18.8962C12.8366 16.4651 14.0986 13.3101 14.1671 10.0182C14.1674 10.0066 14.1674 9.99503 14.1671 9.98346C14.0986 6.69153 12.8366 3.53658 10.6159 1.10547L10.0007 1.66749Z"
                                            fill="#637381"
                                        ></path>
                                        </g>
                                    </svg>
                                    </span>

                                    <select
                                        name="realty_id"
                                        value={form.realty_id}
                                        disabled={!form.edit}
                                        onChange={(e) => {
                                            updateForm({ [e.target.name]: e.target.value })
                                        }}
                                        className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-12 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
                                            form.realty_id > 0 ? "text-black dark:text-white" : ""
                                        }`}
                                    >
                                        <option value=""  className="text-body dark:text-bodydark">
                                            Select Realty
                                        </option>
                                        {
                                            form.realties && form.realties.map( (realty:any, key:any)=><>
                                                <option value={realty._id} className="text-body dark:text-bodydark">
                                                    {realty.name}
                                                </option>
                                            </>)
                                        }
                                    </select>

                                    <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g opacity="0.8">
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                            fill="#637381"
                                        ></path>
                                        </g>
                                    </svg>
                                    </span>
                                </div>
                                </div>
                    </div>
                </div>
            </div>
        </form>
        </div>
    )
}