"use client"
import { saveProjectAction } from "@/actions/projects"
import Image from "next/image"
import NewProjectSubmit from "./NewProjectSubmit";
import { useState } from "react";
import { ServerActionResponse } from "@/types/server-action-reply";
import { useRouter } from "next/navigation";
import { AlertError, AlertSuccess } from "@/app/ui/alerts/alerts";
import { initialStateProject } from "@/actions/state";
import InputTextField from "@/components/FormElements/Fields/InputTextField";
import InputTextLabel from "@/components/FormElements/Fields/InputTextLabel";


export default  function NewProjectForm() {
    const [form, setForm] = useState({...initialStateProject, original_owners : [{}]})

    const [resp, setResp] = useState<ServerActionResponse>()
    const updateForm = (value : any) =>  setForm( (prev: any) =>  { return {...prev, ...value} }  )
    const router = useRouter()

    const updateOwners = (e:any, index:any) => {
        form.original_owners[index] = {...form.original_owners[index], [e.target.name] : e.target.value }
        updateForm( { original_owners : [ ...form.original_owners ] } )
    }

    return (
        <>
            <form action={ async() => {
                    const response : ServerActionResponse = await saveProjectAction(form)
                    setResp(response)
                    if(response.success && response?.document.id) {
                        router.push("/projects/"+ response?.document.id)
                    }
                }
            }>
            { resp?.success ? <AlertSuccess message={resp?.message}  /> : "" }
            { !resp?.success && resp?.message ? <AlertError message={resp?.message} description={resp?.errors} /> : "" }

                <div className="grid grid-cols-5 gap-8">

                        <div className="col-span-5 xl:col-span-3">
                            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                                    <h3 className="font-medium text-black dark:text-white overflow-hidden">
                                        <div className="float-start">
                                        Project Information
                                        </div>
                                        <div className="float-end">
                                            {
                                                <button
                                                className="flex justify-center rounded border border-stroke px-6 py-1 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                                                type="submit"
                                                >
                                                Save
                                                </button>
                                            }

                                        </div>
                                    </h3>
                                </div>
                                <div className="p-7">
                                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                        <div className="w-full sm:w-1/3">

                                        <InputTextLabel id="name">
                                        Project Name
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
                                                    placeholder="Project Name"
                                                    autoComplete="off"
                                                    required
                                                    value={form.name}
                                                    onChange={(e) => updateForm({ name: e.target.value })}
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 pl-11.5 pr-4.5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full sm:w-1/3">
                                                <InputTextLabel id="address1">
                                                    Address
                                                </InputTextLabel>
                                               
                                                <InputTextField
                                                    id="address1"
                                                    placeholder="Address"
                                                    value={form.address1}
                                                    autoComplete="off"
                                                    onChange={ (e:any) => updateForm({ [e.target.name]: e.target.value })}
                                                    required
                                                />
                                        </div>
                                        <div className="w-full sm:w-1/3">
                                                <InputTextLabel id="address2">
                                                    Alternative Address
                                                </InputTextLabel>
                                               
                                                <InputTextField
                                                    id="address2"
                                                    placeholder="Alternative Address"
                                                    autoComplete="off"
                                                    value={form.address2}
                                                    onChange={(e) => updateForm({ [e.target.name]: e.target.value })}
                                                />
                                        </div>
                                    </div>

                                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                        <div className="w-full sm:w-1/3">
                                                <InputTextLabel id="region">
                                                    Region
                                                </InputTextLabel>

                                                <InputTextField
                                                    id="region"
                                                    placeholder="Region"
                                                    autoComplete="off"
                                                    value={form.region}
                                                    onChange={(e) => updateForm({ [e.target.name]: e.target.value })}
                                                />
                                        </div>

                                        <div className="w-full sm:w-1/3">
                                                <label
                                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                    htmlFor="province"
                                                >
                                                    Province
                                                </label>
                                                <input
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                    type="text"
                                                    name="province"
                                                    id="province"
                                                    placeholder="Province"
                                                    autoComplete="off"
                                                    
                                                    value={form.province}
                                                    onChange={(e) => updateForm({ [e.target.name]: e.target.value })}
                                                />
                                        </div>
                                        <div className="w-full sm:w-1/3">
                                                <label
                                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                    htmlFor="city"
                                                >
                                                    City
                                                </label>
                                                <input
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                    type="text"
                                                    name="city"
                                                    id="city"
                                                    placeholder="City"
                                                    autoComplete="off"
                                                    
                                                    value={form.city}
                                                    onChange={(e) => updateForm({ [e.target.name]: e.target.value })}
                                                />
                                        </div>
                                    </div>

                                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">

                                        <div className="w-full sm:w-1/3">
                                                <label
                                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                    htmlFor="barangay"
                                                >
                                                    Barangay
                                                </label>
                                                <input
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                    type="text"
                                                    name="barangay"
                                                    id="barangay"
                                                    placeholder="Barangay"
                                                    autoComplete="off"
                                                    
                                                    value={form.barangay}
                                                    onChange={(e) => updateForm({ [e.target.name]: e.target.value })}
                                                />
                                        </div>
                                        <div className="w-full sm:w-1/3">
                                                <label
                                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                    htmlFor="zip"
                                                >
                                                    Zip
                                                </label>
                                                <input
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                    type="text"
                                                    name="zip"
                                                    id="zip"
                                                    placeholder="Zip"
                                                    autoComplete="off"
                                                    
                                                    value={form.zip}
                                                    onChange={(e) => updateForm({ [e.target.name]: e.target.value })}
                                                />
                                        </div>

                                        <div className="w-full sm:w-1/3">
                                                <label
                                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                    htmlFor="landmark"
                                                >
                                                    Landmark
                                                </label>
                                                <input
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                    type="text"
                                                    name="landmark"
                                                    id="landmark"
                                                    placeholder="Landmark"
                                                    autoComplete="off"
                                                    
                                                    value={form.landmark}
                                                    onChange={(e) => updateForm({ [e.target.name]: e.target.value })}
                                                />
                                        </div>

                                    </div>

                                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">

                                        <div className="w-full sm:w-1/2">
                                                <label
                                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                    htmlFor="latitude"
                                                >
                                                    Latitude
                                                </label>
                                                <input
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                    type="text"
                                                    name="latitude"
                                                    id="latitude"
                                                    placeholder="Latitude"
                                                    autoComplete="off"
                                                    
                                                    value={form.latitude}
                                                    onChange={(e) => updateForm({ [e.target.name]: e.target.value })}
                                                />
                                        </div>
                                        <div className="w-full sm:w-1/2">
                                                <label
                                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                    htmlFor="longitude"
                                                >
                                                    Longitude
                                                </label>
                                                <input
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                    type="text"
                                                    name="longitude"
                                                    id="longitude"
                                                    placeholder="Longitude"
                                                    autoComplete="off"
                                                    
                                                    value={form.longitude}
                                                    onChange={(e) => updateForm({ [e.target.name]: e.target.value })}
                                                />
                                        </div>

                                    </div>

                                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">

                                        <div className="w-full sm:w-1/2">
                                                <label
                                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                    htmlFor="purchase_scheme"
                                                >
                                                    Purchase Scheme
                                                </label>
                                                <input
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                    type="text"
                                                    name="purchase_scheme"
                                                    id="purchase_scheme"
                                                    placeholder="Purchase Scheme"
                                                    autoComplete="off"
                                                    value={form.purchase_scheme}
                                                    onChange={(e) => updateForm({ [e.target.name]: e.target.value })}
                                                />
                                        </div>
                                        <div className="w-full sm:w-1/2">
                                                <label
                                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                    htmlFor="title_information"
                                                >
                                                    Title Information
                                                </label>
                                                <input
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                    type="text"
                                                    name="title_information"
                                                    id="title_information"
                                                    placeholder="Title Information"
                                                    autoComplete="off"
                                                    value={form.title_information}
                                                    onChange={(e) => updateForm({ [e.target.name]: e.target.value })}
                                                />
                                        </div>
                                    </div>

                                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">

                                        <div className="w-full sm:w-1/3">
                                                <label
                                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                    htmlFor="legal_documentation"
                                                >
                                                    Legal Documentation
                                                </label>
                                                <input
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                    type="text"
                                                    name="legal_documentation"
                                                    id="legal_documentation"
                                                    placeholder="Legal Documentation"
                                                    autoComplete="off"
                                                    value={form.legal_documentation}
                                                    onChange={(e) => updateForm({ [e.target.name]: e.target.value })}
                                                />
                                        </div>
                                        <div className="w-full sm:w-1/3">
                                                <label
                                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                    htmlFor="restrictions"
                                                >
                                                    Restrictions
                                                </label>
                                                <input
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                    type="text"
                                                    name="restrictions"
                                                    id="restrictions"
                                                    placeholder="Restrictions"
                                                    autoComplete="off"
                                                    value={form.restrictions}
                                                    onChange={(e) => updateForm({ [e.target.name]: e.target.value })}
                                                />
                                        </div>

                                        <div className="w-full sm:w-1/3">
                                                <label
                                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                    htmlFor="terrane_information"
                                                >
                                                    Terrane Information
                                                </label>
                                                <input
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                    type="text"
                                                    name="terrane_information"
                                                    id="terrane_information"
                                                    placeholder="Terrane Information"
                                                    autoComplete="off"
                                                    value={form.terrane_information}
                                                    onChange={(e) => updateForm({ [e.target.name]: e.target.value })}
                                                />
                                        </div>

                                    </div>

                                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">

                                        <div className="w-full sm:w-1/3">
                                                <label
                                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                    htmlFor="date_bought"
                                                >
                                                    Date Bought
                                                </label>
                                                <input
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                    type="date"
                                                    name="date_bought"
                                                    id="date_bought"
                                                    placeholder="Date Bought"
                                                    autoComplete="off"
                                                    value={form.date_bought ?? ""}
                                                    onChange={(e) => updateForm({ [e.target.name]: e.target.value })}
                                                />
                                        </div>
                                        <div className="w-full sm:w-1/3">
                                                <label
                                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                    htmlFor="date_begin_selling"
                                                >
                                                    Date Begin Selling
                                                </label>
                                                <input
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                    type="date"
                                                    name="date_begin_selling"
                                                    id="date_begin_selling"
                                                    placeholder="Date Begin Selling"
                                                    autoComplete="off"
                                                    value={form.date_begin_selling ?? ""}
                                                    onChange={(e) => updateForm({ [e.target.name]: e.target.value })}
                                                />
                                        </div>

                                        <div className="w-full sm:w-1/3">
                                                <label
                                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                    htmlFor="date_begin_grading"
                                                >
                                                    Date Begin Grading
                                                </label>
                                                <input
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                    type="date"
                                                    name="date_begin_grading"
                                                    id="date_begin_grading"
                                                    placeholder="Date Begin Grading"
                                                    autoComplete="off"
                                                    value={form.date_begin_grading ?? ""}
                                                    onChange={(e) => updateForm({ [e.target.name]: e.target.value })}
                                                />
                                        </div>

                                    </div>

                                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">

                                        <div className="w-full sm:w-1/3">
                                                <label
                                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                    htmlFor="total_number_of_lots"
                                                >
                                                    Total Lots
                                                </label>
                                                <input
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                    type="number"
                                                    name="total_number_of_lots"
                                                    id="total_number_of_lots"
                                                    placeholder="Total Lots"
                                                    autoComplete="off"
                                                    min="1"
                                                    value={form.total_number_of_lots}
                                                    onChange={(e) => updateForm({ [e.target.name]: e.target.value })}
                                                />
                                        </div>
                                        <div className="w-full sm:w-1/3">
                                                <label
                                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                    htmlFor="investment_amount"
                                                >
                                                    Investment Amount
                                                </label>
                                                <input
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                    type="number"
                                                    name="investment_amount"
                                                    id="investment_amount"
                                                    placeholder="Investment Amount"
                                                    autoComplete="off"
                                                    min="100"
                                                    value={form.investment_amount}
                                                    onChange={(e) => updateForm({ [e.target.name]: e.target.value })}
                                                />
                                        </div>

                                        <div className="w-full sm:w-1/3">
                                                <label
                                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                    htmlFor="geographic_layer_file"
                                                >
                                                    Geographic Layer File
                                                </label>
                                                <input
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                    type="text"
                                                    name="geographic_layer_file"
                                                    id="geographic_layer_file"
                                                    placeholder="Geographic Layer File"
                                                    autoComplete="off"
                                                    value={form.geographic_layer_file}
                                                    onChange={(e) => updateForm({ [e.target.name]: e.target.value })}
                                                />
                                        </div>

                                    </div>

                                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">

                                        <div className="w-full sm:w-1/2">
                                                <label
                                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                    htmlFor="bulk_discount_scheme"
                                                >
                                                    Bulk Discount Scheme
                                                </label>
                                                <input
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                    type="text"
                                                    name="bulk_discount_scheme"
                                                    id="bulk_discount_scheme"
                                                    placeholder="Bulk Discount Scheme"
                                                    autoComplete="off"
                                                    value={form.bulk_discount_scheme}
                                                    onChange={(e) => updateForm({ [e.target.name]: e.target.value })}
                                                />
                                        </div>
                                        <div className="w-full sm:w-1/2">
                                                <label
                                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                    htmlFor="LTS"
                                                >
                                                    License to Sell
                                                </label>
                                                <input
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                    type="text"
                                                    name="LTS"
                                                    id="LTS"
                                                    placeholder="License to Sell"
                                                    autoComplete="off"
                                                    value={form.LTS}
                                                    onChange={(e) => updateForm({ [e.target.name]: e.target.value })}
                                                />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-5 xl:col-span-2">
                            {
                                form.original_owners && form.original_owners.map( (owner :any, index : any) => {
                                return (
                                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark mb-3" key={index}>
                                <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                                    <h3 className="font-medium text-black dark:text-white overflow-hidden">
                                    <div className="float-start">
                                        Original Owner Information {index + 1}
                                        </div>
                                        <div className="float-end flex flex-cols-2 gap-2">
                                            {
                                                form.edit && <button
                                                className="flex justify-center rounded border border-stroke px-6 py-1 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                                                type="button"
                                                onClick={ (e) => updateForm( { original_owners : [...form.original_owners , {} ]} ) }
                                                >
                                                <SvgPlus/>
                                                </button>
                                            }

{
                                                form.edit && <button
                                                className="flex justify-center rounded border border-stroke px-6 py-1 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                                                type="button"
                                                onClick={ (e) => { 
                                                    if(confirm('Are you sure to remove this owner?')) {
                                                        updateForm( { original_owners : form.original_owners.filter( (own:any,i:any) => i !== index  ) })
                                                    }
                                                } }
                                                >
                                                <SvgDelete/>
                                                </button>
                                            }
                                        </div>
                                    </h3>

                                </div>
                                <div className="p-7">
                                    <div className="mb-4 flex items-center gap-3">
                                            <div className="w-full sm:w-1/2">
                                                        <label
                                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                            htmlFor="first_name"
                                                        >
                                                            First Name
                                                        </label>
                                                        <input
                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                            type="text"
                                                            name="first_name"
                                                            id="first_name"
                                                            placeholder="First Name"
                                                            autoComplete="off"
                                                            value={ owner.first_name }
                                                            onChange={ (e) =>  updateOwners(e, index) }
                                                        />
                                                </div>

                                                <div className="w-full sm:w-1/2">
                                                        <label
                                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                            htmlFor="middle_name"
                                                        >
                                                            Middle Name
                                                        </label>
                                                        <input
                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                            type="text"
                                                            name="middle_name"
                                                            id="middle_name"
                                                            placeholder="Middle Name"
                                                            autoComplete="off"
                                                            value={ owner.middle_name }
                                                            onChange={ (e) =>  updateOwners(e, index) }
                                                        />
                                                </div>

                                                <div className="w-full sm:w-1/2">
                                                        <label
                                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                            htmlFor="last_name"
                                                        >
                                                            Last Name
                                                        </label>
                                                        <input
                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                            type="text"
                                                            name="last_name"
                                                            id="last_name"
                                                            placeholder="Last Name"
                                                            autoComplete="off"
                                                            value={ owner.last_name }
                                                            onChange={ (e) =>  updateOwners(e, index) }
                                                        />
                                                </div>

                                        </div>

                                        <div className="mb-4 flex items-center gap-3">
                                                <div className="w-full sm:w-1/2">
                                                        <label
                                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                            htmlFor="email_address"
                                                        >
                                                            Email
                                                        </label>
                                                        <input
                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                            type="email"
                                                            name="email_address"
                                                            id="email_address"
                                                            placeholder="Email Address"
                                                            autoComplete="off"
                                                            value={ owner.email_address }
                                                            onChange={ (e) =>  updateOwners(e, index) }
                                                        />
                                                </div>
                                                <div className="w-full sm:w-1/2">
                                                        <label
                                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                            htmlFor="email_address"
                                                        >
                                                            Phone / Remarks
                                                        </label>
                                                        <input
                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                            type="text"
                                                            name="phone_remark"
                                                            id="phone_remark"
                                                            placeholder="Phone / Remarks"
                                                            autoComplete="off"
                                                            value={ owner.phone_remark }
                                                            onChange={ (e) =>  updateOwners(e, index) }
                                                        />
                                                </div>
                                        </div>
                                </div>
                            </div>)

                                })
                            }
                            
                            
                        </div>
                        
                </div>
            </form>
        </>
    )
}