import { updateBuyerAction, checkEmailExists } from "@/actions/buyers"
import { initialStateBuyer } from "@/actions/state"
import InputTextField from "@/components/FormElements/Fields/InputTextField"
import InputTextLabel from "@/components/FormElements/Fields/InputTextLabel"
import { ServerActionResponse } from "@/types/server-action-reply"
import Link from "next/link"
import { useEffect, useState } from "react"
import NormalButton from "@/components/FormElements/Buttons/NormalButton"
import PrimarySaveButton from "@/components/FormElements/Buttons/PrimarySaveButton"
import AsyncSelect from 'react-select/async'
import Select from 'react-select'
import AsyncCreatableSelect from 'react-select/async-creatable';
import { searchUsers } from "@/actions/search"
import { getUserSingleApi } from "@/components/common/api"
import { SidebarIcon } from "@/components/common/functions"
import { getBarangays, getCities, getProvinces, getRegions, getZipCode } from "@/actions/addresses"

export function DetailTab({document} : any) {
    const updateForm = (value : any) =>  setForm( (prev: any) =>  { return {...prev, ...value} }  )
    const [form, setForm] = useState({...initialStateBuyer,  ...document, id: document._id, edit: false})
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


    const [emailBuyerExists, setEmailBuyerExists] = useState(false)

    const [emailCheckBuyer, setEmailCheckBuyer] = useState<ServerActionResponse>()
    const [resp, setResp] = useState<ServerActionResponse>()


    async function checkEmailBuyer(email:any) {
        const checker = await checkEmailExists(email)
        setEmailCheckBuyer(checker)
        if(checker.success) {
            setEmailBuyerExists(true)
        } else {
            setEmailBuyerExists(false)
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

    const updateReference = (name:any, value: any, index:any) => {
        form.references[index] = {...form.references[index], [name] : value }
        updateForm( { references : [ ...form.references ] } )
    }

    useEffect(() => {
        if(form.spouse_user_id) {
            getUserSingleApi(form.spouse_user_id,  (res:any) =>  updateForm({spouse : res}) )
        }
    },[form.spouse_user_id])

    const nameOptions = (
        inputValue: string,
        callback: (options: any[]) => void
    ) => {
        setTimeout( async() => {
            callback(await searchUser(inputValue ))
        }, 500)
    }

    const searchUser = async(inputValue: string) => {
        return await searchUsers(inputValue, form.id)
      };

    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4">
        <form action={
            async() => { 
                const response = await updateBuyerAction(form)
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
                                                checkEmailBuyer(e.target.value)
                                            }
                                        }
                                    />
                                    { form?.email?.length > 2 && emailCheckBuyer?.message && <p className={(!emailCheckBuyer?.success ? "text-success " : "text-[#CD5D5D] ") +"text-sm mt-1.5 px-2"}>{emailCheckBuyer?.message}</p> }
                                    { 
                                    emailBuyerExists && <ol>
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

                                    <Select
                                        id="region"
                                        isLoading={request.regionRequest}
                                        options={addressDropdown.regions}
                                        placeholder="Region"
                                        isDisabled={!form.edit}
                                        value={{value:form.region, label:form.region}}
                                        styles={{ control: (baseStyles, state) => state.isDisabled ? {...baseStyles, backgroundColor: "#f5f7fd" } : {...baseStyles} }}
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
                                        isDisabled={!form.edit}
                                        value={{value:form.province, label:form.province}}
                                        styles={{ control: (baseStyles, state) => state.isDisabled ? {...baseStyles, backgroundColor: "#f5f7fd" } : {...baseStyles} }}
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
                                            isDisabled={!form.edit}
                                            value={{value:form.city, label:form.city}}
                                            styles={{ control: (baseStyles, state) => state.isDisabled ? {...baseStyles, backgroundColor: "#f5f7fd" } : {...baseStyles} }}
                                            placeholder="City"
                                            onChange={
                                                async({ data,label , value} : any, b : any) => {
                                                    setRequest({...request, barangayRequest: true})
                                                    updateForm({ city: label, barangay: ""})
                                                    setAddressData({...addressData, city_code : data.city_code})
                                                    setAddressDropdown( {...addressDropdown, barangays: await getCityBarangays(value) })
                                                    updateForm({zip: await getBarangayZipCode(label), bangay: ""})
                                                    setRequest({...request, barangayRequest: false})
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
                                isDisabled={!form.edit}
                                value={{value:form.barangay, label:form.barangay}}
                                styles={{ control: (baseStyles, state) => state.isDisabled ? {...baseStyles, backgroundColor: "#f5f7fd" } : {...baseStyles} }}
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
                                        disabled={!form.edit}
                                        autoComplete="off"
                                        placeholder="Zip"
                                        onChange={(e) => updateForm({ [e.target.name]: e.target.value })}
                                    />
                        </div>

                        <div className="w-full sm:w-1/3">
                                <InputTextLabel htmlFor="gender">
                                    Gender
                                </InputTextLabel>

                                <Select
                                    id="gender"
                                    isDisabled={!form.edit}
                                    value={{value:form.gender, label : form.gender}}
                                    options={ [
                                        {value: "Male",label : "Male"},
                                        {value: "Female",label : "Female"}
                                    ]}
                                    onChange={
                                        ({data, label , value} : any, b : any) => {
                                             updateForm({  gender: value })
                                        }
                                    }
                                />
                        </div>


                        <div className="w-full sm:w-1/3">
                                <InputTextLabel htmlFor="civil_status">
                                    Civil Status
                                </InputTextLabel>

                                <Select
                                    id="civil_status"
                                    isDisabled={!form.edit}
                                    isSearchable={false}
                                    value={{value:form.civil_status, label : form.civil_status}}
                                    options={ [
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
                        <h3 className="font-medium text-black dark:text-white">Spouse Information {form.spouse_user_id && <Link className="text-[#9D5425]" href={"/buyers/" + form.spouse_user_id} > <span className="text-sm">Edit</span></Link> } </h3>
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
                                    autoComplete="off"
                                    value={form.spouse.first_name}
                                    disabled={true}
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
                                value={form.spouse.middle_name}
                                disabled={true}
                            />
                        </div>
                        <div className="w-full sm:w-1/3">
                                <InputTextLabel htmlFor="spouse_last_name">
                                    Spouse Last Name
                                </InputTextLabel>
                                <InputTextField
                                    id="spouse_last_name"
                                    autoComplete="off"
                                    value={form.spouse.last_name}
                                    disabled={true}
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
                                        value={form.spouse.email}
                                        disabled={true}
                                    />
                        </div>
                        <div className="w-full sm:w-1/3">
                                    <InputTextLabel htmlFor="spouse_phone">
                                        Spouse Contact #
                                    </InputTextLabel>
                                    <InputTextField
                                        id="spouse_phone"
                                        autoComplete="off"
                                        value={form.spouse.phone}
                                        disabled={true}
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
                                            value={form.spouse.tin}
                                            disabled={true}
                                        />
                            </div>

                            <div className="w-full sm:w-1/2">
                                        <InputTextLabel htmlFor="spouse_tin_issuance">
                                            Spouse  Place of issuance of TIN
                                        </InputTextLabel>
                                        <InputTextField
                                            id="spouse_tin_issuance"
                                            autoComplete="off"
                                            value={form.spouse.tin_issuance}
                                            disabled={true}
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
                                        disabled={true}
                                    />
                        </div>
                        <div className="w-full sm:w-1/3">
                                    <InputTextLabel htmlFor="spouse_region">
                                        Region
                                    </InputTextLabel>
                                    <InputTextField
                                        id="spouse_region"
                                        value={form.spouse.region}
                                        autoComplete="off"
                                        disabled={true}
                                    />
                        </div>

                        <div className="w-full sm:w-1/3">
                                    <InputTextLabel htmlFor="spouse_province">
                                        Province
                                    </InputTextLabel>
                                    <InputTextField
                                        id="spouse_province"
                                        value={form.spouse.province}
                                        autoComplete="off"
                                        disabled={true}
                                    />
                        </div>
                    </div>
                    <div className="mb-5 5 flex flex-col gap-5.5 sm:flex-row">
                        <div className="w-full sm:w-1/3">
                                    <InputTextLabel htmlFor="spouse_city">
                                        City
                                    </InputTextLabel>
                                    <InputTextField
                                        id="spouse_city"
                                        value={form.spouse.city}
                                        autoComplete="off"
                                        disabled={true}
                                    />
                        </div>

                        <div className="w-full sm:w-1/3">
                                    <InputTextLabel htmlFor="spouse_barangay">
                                        Barangay
                                    </InputTextLabel>
                                    <InputTextField
                                        id="spouse_barangay"
                                        value={form.spouse.barangay}
                                        autoComplete="off"
                                        disabled={true}
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
                                        disabled={true}
                                    />
                        </div>
                    </div></>
                    }

                    <div className="border-b border-stroke py-4 dark:border-strokedark overflow-hidden">
                        <h3 className="font-medium text-black dark:text-white float-start">References</h3>
                        <div className="float-end flex flex-cols-2 gap-2">
                            {
                                form.edit && <button
                                    className="flex justify-center rounded border border-stroke px-6 py-1 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                                    type="button"
                                    onClick={ (e) => updateForm( { references : [...form.references , {} ]} ) }
                                >
                                {SidebarIcon("plus-black")}
                                </button>
                            }
                        </div>
                    </div>
                    {
                        form.references && form.references.length > 0 && form.references.map( (reference:any, index:any) => <div key={index}>
                        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row mt-4">
                            <div className="w-full sm:w-1/3">
                                <InputTextLabel id="name">
                                    Name
                                </InputTextLabel>
                                <AsyncCreatableSelect
                                    id="name"
                                    placeholder="Full Name"
                                    isDisabled={!form.edit}
                                    loadOptions={nameOptions}
                                    required
                                    onChange={
                                        async({ data ,label , value} : any, b : any) => {
                                            updateReference( 'name' ,  data.first_name + " " + data.middle_name + " " + data.last_name, index)
                                            updateReference( 'contact' ,  data.phone , index)
                                        }
                                    }
                                />
                            </div>
                            <div className="w-full sm:w-1/3">
                                <InputTextLabel id="first_name">
                                    Relation
                                </InputTextLabel>

                                <InputTextField
                                    id="relation"
                                    placeholder="Relation"
                                    disabled={!form.edit}
                                    value={ reference.relation }
                                    required
                                    onChange={ (e) => {
                                        updateReference( 'relation' ,  e.target.value, index)
                                    }
                                    }
                                />
                            </div>
                            <div className="w-full sm:w-1/3">
                                <InputTextLabel id="first_name">
                                    Contact
                                </InputTextLabel>

                                <InputTextField
                                    id="contact"
                                    placeholder="Contact Information"
                                    autoComplete="off"
                                    disabled={!form.edit}
                                    value={ reference.contact }
                                    required
                                    onChange={ (e) => {
                                        updateReference( 'contact' ,  e.target.value, index)
                                    }
                                    }
                                />
                            </div>
                            <div className="w-full sm:w-1/3">
                                <InputTextLabel>&nbsp;</InputTextLabel>
                                {
                                    index >= 0 && form.edit && <>
                                    <button
                                        className="flex justify-center rounded border border-stroke px-6 py-1 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                                        type="button"
                                        onClick={ (e) => {
                                            if(confirm('Are you sure to remove this reference?')) {
                                                updateForm( { references : form.references.filter( (r:any,i:any) => i !== index  ) })
                                            }
                                        } }
                                        >
                                        {SidebarIcon("delete")}
                                        </button>
                                    </>
                                }
                            </div>
                        </div>
                        </div>)
                    }
                </div>
            </div>
        </form>
        </div>
    )
}