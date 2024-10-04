"use client"
import { checkEmailExists, saveBuyerAction } from "@/actions/buyers"
import Link from "next/link"
import { useEffect, useState } from "react"
import NewSubmit from "./NewSubmit"
import { ServerActionResponse } from "@/types/server-action-reply"
import { initialStateBuyer } from "@/actions/state"
import InputTextField from "@/components/FormElements/Fields/InputTextField"
import InputTextLabel from "@/components/FormElements/Fields/InputTextLabel"
import Select from 'react-select'
import AsyncSelect from 'react-select/async'
import AsyncCreatable from 'react-select/async-creatable'
import { getBarangays, getCities, getProvinces, getRegions, getZipCode } from "@/actions/addresses"

export default function NewForm() {

    const updateForm = (value : any) =>  setForm( (prev: any) =>  { return {...prev, ...value} }  )

    const [form, setForm] = useState({...initialStateBuyer, spouse: {...initialStateBuyer.spouse, civil_status : "Married"} })
    const [addressDropdown, setAddressDropdown] = useState({
        regions: [],
        provinces: [],
        cities: [],
        barangays:  [],
        regionsSpouse: [],
        provincesSpouse: [],
        citiesSpouse: [],
        barangaysSpouse:  [],
    })

    const [addressData, setAddressData] = useState({
        region_code: "",
        province_code : "",
        city_code: "",
        barangay_code: "",
        region_code_spouse: "",
        province_code_spouse : "",
        city_code_spouse: "",
        barangay_code_spouse: ""
    })

    const [request, setRequest] = useState({
        regionRequest: false,
        provinceRequest:false,
        cityRequest:false,
        barangayRequest:false,
        zipCodeRequest: false,
        emailBuyerExists : false,
        emailSpouseExists : false,
        regionRequestSpouse: false,
        provinceRequestSpouse:false,
        cityRequestSpouse:false,
        barangayRequestSpouse:false,

    })

    const [emailCheckBuyer, setEmailCheckBuyer] = useState<ServerActionResponse>()
    const [emailCheckSpouse, setEmailCheckSpouse] = useState<ServerActionResponse>()
    const [resp, setResp] = useState<ServerActionResponse>()


    async function checkEmail(email:any, type : string = 'buyer') {
        const checker = await checkEmailExists(email)
        if(type == 'buyer') {
            setEmailCheckBuyer(checker)
            setRequest({...request, emailBuyerExists : checker.success})
        } else {
            setEmailCheckSpouse(checker)
            setRequest({...request, emailSpouseExists : checker.success})
        }
    }

    useEffect(()=> {
        setRequest({...request, regionRequest : true})
        const getRegionAction = async () => {
            const resp = await getRegions()
            let tempRegions = resp.map( ( region:any, key:any) => {
                return {
                    value: region.region_code,
                    label: region.region_name,
                    data: region
                }
            })
            setRequest({...request, regionRequest : false})
            setAddressDropdown( {...addressDropdown, regions: tempRegions, regionsSpouse: tempRegions})
        }
        getRegionAction()
    },[])

    const getRegionProvinces = async(region_code:any) => {
        const resp = await getProvinces(region_code)
            let tempProvinces = resp.map( ( province:any, key:any) => {
                return {
                    value: province.province_code,
                    label: province.province_name,
                    data: province
                }
            })
        return tempProvinces
    }

    const getProvinceCities = async(province_code:any) => {
        setRequest({...request, cityRequest: true})
        const resp = await getCities(province_code)
            let tempCities = resp.map( ( city:any, key:any) => {
                return {
                    value: city.city_code,
                    label: city.city_name,
                    data: city
                }
            })
        setRequest({...request, cityRequest: false})
        return tempCities
    }

    const getCityBarangays = async(city_code:any) => {
        setRequest({...request, barangayRequest: true})
        const resp = await getBarangays(city_code)
            let tempBarangay = resp.map( ( city:any, key:any) => {
                return {
                    value: city.brgy_code,
                    label: city.brgy_name,
                    data: city
                }
            })
        setRequest({...request, barangayRequest: false})
        return tempBarangay
    }

    const getBarangayZipCode = async(city_name:any) => {
        setRequest({...request, zipCodeRequest: true})
        const resp = await getZipCode(city_name)
        setRequest({...request, zipCodeRequest: false})
        return resp
    }

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
                                    placeholder="Buyer Email"
                                    value={form.email}
                                    onChange={ async(e) => {
                                            updateForm({ [e.target.name]: e.target.value });
                                            checkEmail(e.target.value)
                                        }
                                    }
                                />
                                { form?.email?.length > 2 && emailCheckBuyer?.message && <p className={(!emailCheckBuyer?.success ? "text-success " : "text-[#CD5D5D] ") +"text-sm mt-1.5 px-2"}>{emailCheckBuyer?.message}</p> }
                                { 
                                   request.emailBuyerExists && <ol>
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
                            <Select
                                id="region"
                                isLoading={request.regionRequest}
                                options={addressDropdown.regions}
                                placeholder="Region"
                                onChange={
                                    async({ data ,label , value} : any, b : any) => {
                                        setRequest({...request, provinceRequest: true})
                                        updateForm({ region: label, province: "", city: "", barangay : ""})
                                        setAddressData({...addressData, region_code : data.region_code})
                                        setAddressDropdown( {...addressDropdown, provinces: await getRegionProvinces(value) })
                                        setRequest({...request, provinceRequest: false})
                                    }
                                }
                                />
                    </div>

                    <div className="w-full sm:w-1/3">
                                <InputTextLabel htmlFor="province">
                                    Province
                                </InputTextLabel>
                                <Select
                                id="province"
                                options={addressDropdown.provinces}
                                isLoading={request.provinceRequest}
                                placeholder="Province"
                                onChange={
                                    async({ data,label , value} : any, b : any) => {
                                        setRequest({...request, cityRequest: true})
                                        updateForm({ province: label, city: ""})
                                        setAddressData({...addressData, province_code : data.province_code})
                                        setAddressDropdown( {...addressDropdown, cities: await getProvinceCities(value) })
                                        setRequest({...request, cityRequest: false})
                                    }
                                }
                                />
                    </div>

                    <div className="w-full sm:w-1/3">
                                <InputTextLabel htmlFor="city">
                                    City
                                </InputTextLabel>
                                <Select
                                id="city"
                                options={addressDropdown.cities}
                                isLoading={request.cityRequest}
                                placeholder="City"
                                onChange={
                                    async({ data,label , value} : any, b : any) => {
                                        setRequest({...request, barangayRequest: true})
                                        updateForm({ city: label, barangay: ""})
                                        setAddressData({...addressData, city_code : data.city_code})
                                        setAddressDropdown( {...addressDropdown, barangays: await getCityBarangays(value) })
                                        updateForm({zip: await getBarangayZipCode(label)})
                                        setRequest({...request, barangayRequest: true})
                                    }
                                }
                                />
                    </div>
                </div>
                <div className="mb-5 5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/3">
                                <InputTextLabel htmlFor="barangay">
                                    Barangay
                                </InputTextLabel>
                                <Select
                                id="barangay"
                                options={addressDropdown.barangays}
                                isLoading={request.barangayRequest}
                                placeholder="Barangay"
                                onChange={
                                    async({ data,label , value} : any, b : any) => {
                                        updateForm({ barangay: label})
                                        setAddressData({...addressData, barangay_code : data.barangay_code})
                                    }
                                }
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

                    <div className="w-full sm:w-1/3">
                        <InputTextLabel htmlFor="gender">
                            Gender
                        </InputTextLabel>

                        <AsyncSelect
                            id="gender"
                            isSearchable={false}
                            defaultOptions={ [
                                {value: "Male",label : "Male"},
                                {value: "Female",label : "Female"}
                            ]}
                            onChange={
                                ({data, label , value} : any, b : any) => {
                                    updateForm({ gender: value})
                                }
                            }
                        />
                    </div>
                    
                    <div className="w-full sm:w-1/3">
                                <InputTextLabel htmlFor="civil_status">
                                    Civil Status
                                </InputTextLabel>

                                <AsyncSelect
                                    id="civil_status"
                                    isSearchable={false}
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
                
                {
                    form.civil_status && form.civil_status.length > 0 &&  form.civil_status == "Married" && <>
                                    <div className="border-b border-stroke py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">Spouse Information</h3>
                    <p className="text-sm">Spouse will be registered as another buyer</p>
                </div>
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row mt-4">
                    <div className="w-full sm:w-1/3">

                        <InputTextLabel htmlFor="spouse_first_name">
                            Spouse First Name
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
                                id="spouse_first_name"
                                required={ form.spouse.middle_name.length > 0 || form.spouse.last_name.length > 0}
                                autoComplete="off"
                                placeholder="First Name"
                                value={form.spouse.first_name}
                                onChange={(e) => updateForm({ spouse : { ...form.spouse, first_name: e.target.value }})}
                            />
                        </div>
                    </div>
                    <div className="w-full sm:w-1/3">
                        <InputTextLabel htmlFor="spouse_middle_name">
                            Spouse Middle Name
                        </InputTextLabel>
                        <InputTextField
                            id="spouse_middle_name"
                            autoComplete="off"
                            placeholder="Middle Name"
                            value={form.spouse.middle_name}
                            onChange={(e) => updateForm({ spouse : { ...form.spouse, middle_name: e.target.value }})}
                        />
                    </div>
                    <div className="w-full sm:w-1/3">
                            <InputTextLabel htmlFor="spouse_last_name">
                                Spouse Last Name
                            </InputTextLabel>
                            <InputTextField
                                id="spouse_last_name"
                                autoComplete="off"
                                placeholder="Last Name"
                                required={ form.spouse.middle_name.length > 0 || form.spouse.first_name.length > 0}
                                value={form.spouse.last_name}
                                onChange={(e) => updateForm({ spouse : { ...form.spouse, last_name: e.target.value }})}
                            />
                    </div>
                </div>

                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/3">
                                <InputTextLabel htmlFor="spouse_email">
                                    Spouse Email
                                </InputTextLabel>
                                <InputTextField
                                    type="email"
                                    id="spouse_email"
                                    autoComplete="off"
                                    placeholder="Spouse Email"
                                    required
                                    value={form.spouse.email}
                                    onChange={
                                        async(e) => {
                                                updateForm({ spouse : { ...form.spouse, email: e.target.value }})
                                                    checkEmail(e.target.value, 'spouse')
                                            }
                                        }
                                />

                                 { form?.spouse.email?.length > 2 && emailCheckSpouse?.message && <p className={(!emailCheckSpouse?.success ? "text-success " : "text-[#CD5D5D] ") +"text-sm mt-1.5 px-2"}>{emailCheckSpouse?.message}</p> }
                                {
                                   request.emailSpouseExists && <ol>
                                        {emailCheckSpouse?.document && emailCheckSpouse?.document.map( (user:any, key:any) => {
                                            return <li key={key} className="text-sm py-2"> {key + 1}. { user.first_name } { user.middle_name } { user.last_name } { user.email } </li>
                                        })}
                                    </ol>
                                }
                    </div>
                    <div className="w-full sm:w-1/3">
                                <InputTextLabel htmlFor="spouse_phone">
                                    Spouse Contact #
                                </InputTextLabel>
                                <InputTextField
                                    id="spouse_phone"
                                    autoComplete="off"
                                    placeholder="Spouse Contact"
                                    value={form.spouse.phone}
                                    onChange={(e) => updateForm({ spouse : { ...form.spouse, phone: e.target.value }})}
                                />
                    </div>

                    <div className="w-full sm:w-1/3 gap-2 flex">
                        <div className="w-full sm:w-1/2">
                                    <InputTextLabel htmlFor="spouse_tin">
                                        Spouse TIN
                                    </InputTextLabel>
                                    <InputTextField
                                        id="spouse_tin"
                                        autoComplete="off"
                                        placeholder="Spouse Tin"
                                        value={form.spouse.tin}
                                        onChange={(e) => updateForm({ spouse : { ...form.spouse, tin: e.target.value }})}
                                    />
                        </div>

                        <div className="w-full sm:w-1/2">
                                    <InputTextLabel htmlFor="spouse_tin_issuance">
                                        Spouse  Place of issuance of TIN
                                    </InputTextLabel>
                                    <InputTextField
                                        id="spouse_tin_issuance"
                                        autoComplete="off"
                                        placeholder="Spouse Tin Issuance"
                                        value={form.spouse.tin_issuance}
                                        onChange={(e) => updateForm({ spouse : { ...form.spouse, tin_issuance: e.target.value }})}
                                    />
                        </div>
                    </div>
                </div>



                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/3">
                                <InputTextLabel htmlFor="spouse_address">
                                    Spouse Address
                                </InputTextLabel>
                                <InputTextField
                                    id="spouse_address"
                                    value={form.spouse.address}
                                    autoComplete="off"
                                    placeholder="Address"
                                    onChange={(e) => updateForm({ spouse : { ...form.spouse, address: e.target.value }})}
                                />
                    </div>
                    <div className="w-full sm:w-1/3">
                                <InputTextLabel htmlFor="spouse_region">
                                    Region
                                </InputTextLabel>
                                <Select
                                id="region"
                                isLoading={request.regionRequestSpouse}
                                options={addressDropdown.regionsSpouse}
                                placeholder="Region"
                                onChange={
                                    async({ data ,label , value} : any, b : any) => {
                                        setRequest({...request, provinceRequestSpouse: true})
                                        updateForm({spouse : {...form.spouse, region: label}})
                                        setAddressData({...addressData, region_code : data.region_code_spouse})
                                        setAddressDropdown( {...addressDropdown, provincesSpouse: await getRegionProvinces(value) })
                                        setRequest({...request, provinceRequestSpouse: false})
                                    }
                                }
                                />
                    </div>

                    <div className="w-full sm:w-1/3">
                                <InputTextLabel htmlFor="spouse_province">
                                    Province
                                </InputTextLabel>
                                <Select
                                id="province"
                                options={addressDropdown.provincesSpouse}
                                isLoading={request.provinceRequestSpouse}
                                placeholder="Province"
                                onChange={
                                    async({ data,label , value} : any, b : any) => {
                                        setRequest({...request, cityRequestSpouse: true})
                                        updateForm({spouse : {...form.spouse, province: label}})
                                        setAddressData({...addressData, province_code_spouse : data.province_code})
                                        setAddressDropdown( {...addressDropdown, citiesSpouse: await getProvinceCities(value) })
                                        setRequest({...request, cityRequestSpouse: false})
                                    }
                                }
                                />
                    </div>

                    <div className="w-full sm:w-1/3">
                                <InputTextLabel htmlFor="city">
                                    City
                                </InputTextLabel>
                                <Select
                                id="city"
                                options={addressDropdown.citiesSpouse}
                                isLoading={request.cityRequest}
                                placeholder="City"
                                onChange={
                                    async({ data,label , value} : any, b : any) => {
                                        setRequest({...request, barangayRequestSpouse: true})
                                        setAddressData({...addressData, city_code_spouse : data.city_code})
                                        setAddressDropdown( {...addressDropdown, barangaysSpouse: await getCityBarangays(value) })
                                        updateForm({spouse : {...form.spouse, city: label ,zip: await getBarangayZipCode(label)}})
                                        setRequest({...request, barangayRequestSpouse: true})
                                    }
                                }
                                />
                    </div>
                    
                </div>
                <div className="mb-5 5 flex flex-col gap-5.5 sm:flex-row">
                   

                    <div className="w-full sm:w-1/3">
                                <InputTextLabel htmlFor="spouse_barangay">
                                    Barangay
                                </InputTextLabel>
                                <Select
                                id="barangay"
                                options={addressDropdown.barangaysSpouse}
                                isLoading={request.barangayRequest}
                                placeholder="Barangay"
                                onChange={
                                    async({ data,label , value} : any, b : any) => {
                                        updateForm({ spouse : { ...form.spouse, barangay: label }})
                                        setAddressData({...addressData, barangay_code_spouse : data.barangay_code})
                                    }
                                }
                                />
                    </div>

                    <div className="w-full sm:w-1/3">
                                <InputTextLabel htmlFor="spouse_zip">
                                    Zip
                                </InputTextLabel>
                                <InputTextField
                                    id="spouse_zip"
                                    value={form.spouse.zip}
                                    autoComplete="off"
                                    placeholder="Zip"
                                    onChange={(e) => updateForm({ spouse : { ...form.spouse, zip: e.target.value }})}
                                />
                    </div>

                    <div className="w-full sm:w-1/3">
                                <InputTextLabel htmlFor="gender">
                                    Gender
                                </InputTextLabel>

                                <AsyncSelect
                                    id="gender"
                                    defaultOptions={ [
                                        {value: "Male",label : "Male"},
                                        {value: "Female",label : "Female"}
                                    ]}
                                    onChange={
                                        ({data, label , value} : any, b : any) => {
                                             updateForm({ spouse : { ...form.spouse, gender: value }})
                                        }
                                    }
                                />
                    </div>

                    <div className="w-full sm:w-1/3">
                                <InputTextLabel htmlFor="civil_status">
                                    Civil Status
                                </InputTextLabel>

                                <AsyncSelect
                                    id="civil_status"
                                    isDisabled
                                    value={{value:form.spouse.civil_status, label : form.spouse.civil_status}}
                                    defaultOptions={ [
                                        {value: "Married",label : "Married"},
                                        {value: "Single",label : "Single"}
                                    ]}
                                    onChange={
                                        ({data, label , value} : any, b : any) => {
                                             updateForm({ spouse : { ...form.spouse, civil_status: value }})
                                        }
                                    }
                                />
                    </div>
                </div>
                    </>
                }

                <div className="flex justify-end gap-4.5">
                    <Link href="/buyers" className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
                        <button
                            className="flex justify-center rounded border border-stroke px-6 py-1 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                            type="submit"
                            >
                            Cancel
                        </button>
                    </Link>
                    <NewSubmit state={ {...resp, disabled: request.emailBuyerExists || request.emailSpouseExists} }/>
                </div>
            </div>
        </form>
        </>)
}