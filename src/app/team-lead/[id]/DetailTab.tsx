import { initialStateAgent } from "@/actions/state"
import InputTextField from "@/components/FormElements/Fields/InputTextField"
import InputTextLabel from "@/components/FormElements/Fields/InputTextLabel"
import { ServerActionResponse } from "@/types/server-action-reply"
import {  useEffect, useState } from "react"
import NormalButton from "@/components/FormElements/Buttons/NormalButton"
import PrimarySaveButton from "@/components/FormElements/Buttons/PrimarySaveButton"
import { updateTeamLeadAction, checkEmailExists } from "@/actions/team-lead"
import AsyncSelect from 'react-select/async'
import { getRealtiesApi } from "@/components/common/api"


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
        getRealtiesApi((res:any) => updateForm({realties : res }))
    },[])


    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4">
        <form action={
            async() => { 
                const response = await updateTeamLeadAction(form)
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
                        <div className="w-full sm:w-1/3">
                                <InputTextLabel htmlFor="gender">
                                    Gender
                                </InputTextLabel>

                                <AsyncSelect
                                    id="gender"
                                    isSearchable={false}
                                    isDisabled={!form.edit}
                                    value={{value:form.gender, label : form.gender}}
                                    defaultOptions={ [
                                        {value: "Male",label : "Male"},
                                        {value: "Female",label : "Female"}
                                    ]}
                                    onChange={
                                        ({data, label , value} : any, b : any) => {
                                             updateForm({ gender: value })
                                        }
                                    }
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
                                        disabled={!form.edit}
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
                                        disabled={!form.edit}
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
                                        disabled={!form.edit}
                                        autoComplete="off"
                                        placeholder="Zip"
                                        onChange={(e) => updateForm({ [e.target.name]: e.target.value })}
                                    />
                        </div>

                        <div className="w-full sm:w-1/3">
                                <InputTextLabel htmlFor="civil_status">
                                    Civil Status
                                </InputTextLabel>

                                <AsyncSelect
                                    id="civil_status"
                                    isDisabled={!form.edit}
                                    isSearchable={false}
                                    value={{value:form.civil_status, label : form.civil_status}}
                                    defaultOptions={ [
                                        {value: "Married",label : "Married"},
                                        {value: "Single",label : "Single"}
                                    ]}
                                    onChange={
                                        ({data, label , value} : any, b : any) => {
                                            updateForm({civil_status: value })
                                        }
                                    }
                                />

                        </div>

                    </div>
                </div>
            </div>
        </form>
        </div>
    )
}