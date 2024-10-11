"use client"
import { updateRealtyAction } from "@/actions/realties"
import { initialStateRealty } from "@/actions/state"
import { getTeamLeadsIndexApi } from "@/components/common/api"
import SvgAgent from "@/components/common/svg/svg-agent"
import NormalButton from "@/components/FormElements/Buttons/NormalButton"
import PrimarySaveButton from "@/components/FormElements/Buttons/PrimarySaveButton"
import InputSelectField from "@/components/FormElements/Fields/inputSelectField"
import InputTextField from "@/components/FormElements/Fields/InputTextField"
import InputTextLabel from "@/components/FormElements/Fields/InputTextLabel"
import { usePageID } from "@/context/IDContext"
import { useEffect, useState } from "react"

export default function DetailsTab({document} : any) {
    const id = usePageID()

    const [form, setForm] = useState({...initialStateRealty, ...document, edit: false, _id: id, id})

    function updateForm(value : any) {
      return setForm((prev: any) => {
          return { ...prev, ...value };
      });
    }

    useEffect(()=> {
        getTeamLeadsIndexApi((res:any) => updateForm({leads: res}))
    }, [])


    return(<>
            <div className="grid grid-cols-5 gap-8">
            <div className="col-span-5 xl:col-span-3">
                <form 
                        action={ async() => {
                            await updateRealtyAction(form)
                            updateForm({edit:false})
                        }
                    } 
                        >
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white  overflow-hidden">
                            <div className="float-start">
                                Realty Information
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
                    <div className="p-7">
                            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                <div className="w-full sm:w-1/1">
                                <InputTextLabel htmlFor="name" >
                                    Realty Name
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
                                            id="name"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 pl-11.5 pr-4.5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            placeholder="Realty Name"
                                            autoComplete="off"
                                            required
                                            value={form.name}
                                            disabled={!form.edit}
                                            onChange={(e) => updateForm({ name: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
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
                                                disabled={!form.edit}
                                                onChange={(e) => updateForm({ address: e.target.value })}
                                            />
                                    </div>

                                    <div className="w-full sm:w-1/1">
                                            <InputTextLabel htmlFor="address2" >
                                                Alternative Address
                                            </InputTextLabel>
                                            <InputTextField
                                                id="address2"
                                                autoComplete="off"
                                                placeholder="Alternative Address"
                                                value={form.address2}
                                                disabled={!form.edit}
                                                onChange={(e) => updateForm({ address2: e.target.value })}
                                            />
                                    </div>
                            </div>

                            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                <div className="w-full sm:w-1/1">
                                            <InputTextLabel htmlFor="contact_number" >
                                                Contact Number
                                            </InputTextLabel>
                                            <InputTextField
                                                id="contact_number"
                                                autoComplete="off"
                                                placeholder="Contact Number"
                                                required
                                                value={form.contact_number}
                                                disabled={!form.edit}
                                                onChange={(e) => updateForm({ contact_number: e.target.value })}
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
                                                    disabled={!form.edit}
                                                    onChange={(e) => updateForm({ tin: e.target.value })}
                                                        />
                                    </div>
                                    

                            </div>
                            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">


                                    <div className="w-full sm:w-1/1">
                                                <InputTextLabel htmlFor="commission_percent" >
                                                    Team Lead
                                                </InputTextLabel>

                                                <InputSelectField
                                                    id="lead_id"
                                                    onChange={(e:any) => {
                                                        updateForm({ lead_id: e.target.value })
                                                    }}
                                                    disabled={!form.edit}
                                                    value={form.lead_id+""}
                                                    icon={<SvgAgent/>}
                                                    className={`disabled:cursor-default disabled:bg-whiter relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-12 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${ form.lead_id && form.lead_id > 0 ? "text-black  dark:text-white" : "" }`}
                                                >
                                                    <option value=""  className="text-body dark:text-bodydark">
                                                        Select Team Lead
                                                    </option>
                                                    {
                                                        form.leads && form.leads.map( (doc:any, key:any) => <>
                                                            <option value={doc._id} className="text-body dark:text-bodydark" disabled={!doc.active}>
                                                                {doc.first_name} {doc.middle_name} {doc.last_name} - {doc.email} { !doc.active ? " - inactive " : "" }
                                                            </option>
                                                        </>)
                                                    }
                                                </InputSelectField>
                                    </div>

                                    <div className="w-full sm:w-1/1">
                                            <InputTextLabel htmlFor="commission_percent" >
                                                Commission
                                            </InputTextLabel>
                                            <InputTextField
                                                id="commission_percent"
                                                type="number"
                                                autoComplete="off"
                                                placeholder="Commission Percent"
                                                required
                                                value={form.commission_percent}
                                                disabled={!form.edit}
                                                onChange={(e) => updateForm({ commission_percent: e.target.value })}
                                                />
                                    </div>
                            </div>



                            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                <div className="w-full sm:w-1/1">
                                <InputTextLabel htmlFor="description" >
                                    Description
                                </InputTextLabel>
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
                    </div>
                </div>
                </form>
            </div>
        </div>
    </>)
}