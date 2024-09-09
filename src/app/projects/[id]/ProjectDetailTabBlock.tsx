"use client"

import SvgPlus from "@/components/common/Loader/svg/plus"

// import { getProject } from "@/actions/projects"


const lots = [
    "105 sqm" ,
    "115 sqm" ,
    "205 sqm" ,
    "100 sqm" ,
    "200 sqm" ,
    "400 sqm" ,
    "100 sqm" ,
    "100 sqm" ,
]
export default function ProjectDetailTabBlock() {
    // const project = await getProject(projectID)
    return(
        <>
        <div className="grid grid-cols-5 gap-8">
        <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                    <div id="accordionExample">
                        <div
                            className="rounded-t-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-body-dark">
                            <h2 className="mb-0" id="headingOne">
                            <button
                                className="group relative flex w-full items-center rounded-t-lg border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-body-dark dark:text-white [&:not([data-twe-collapse-collapsed])]:bg-white [&:not([data-twe-collapse-collapsed])]:text-primary [&:not([data-twe-collapse-collapsed])]:shadow-border-b dark:[&:not([data-twe-collapse-collapsed])]:bg-surface-dark dark:[&:not([data-twe-collapse-collapsed])]:text-primary dark:[&:not([data-twe-collapse-collapsed])]:shadow-white/10 "
                                type="button"
                                data-twe-collapse-init
                                data-twe-target="#collapseOne"
                                aria-expanded="true"
                                aria-controls="collapseOne">
                                BLOCK #1
                                <span
                                className="-me-1 ms-auto h-5 w-5 shrink-0 rotate-[-180deg] transition-transform duration-200 ease-in-out group-data-[twe-collapse-collapsed]:me-0 group-data-[twe-collapse-collapsed]:rotate-0 motion-reduce:transition-none [&>svg]:h-6 [&>svg]:w-6">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor">
                                    <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                                </span>
                            </button>
                            </h2>
                            <div
                            id="collapseOne"
                            className="!visible"
                            data-twe-collapse-item
                            data-twe-collapse-show
                            aria-labelledby="headingOne"
                            data-twe-parent="#accordionExample">
                            <div className="px-5 py-4">
                                <div className="grid grid-cols-3 gap-3">
                                    {
                                        lots.map( (lot, key) => {
                                            return (<div className="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark" key={key}>
                                                <div className="mt-4 flex items-end justify-between">
                                                    <div>
                                                        <h4 className="text-title-md font-bold text-black dark:text-white">{lot}</h4>
                                                        <span className="text-sm font-medium">Lot #{key+1}</span>
                                                    </div>
                                                </div>
                                            </div>)
                                            }
                                        )
                                    }
                                    <div className="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
                                        <div className="flex h-12.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                                            <SvgPlus/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div
                            className="border border-t-0 border-neutral-200 bg-white dark:border-neutral-600 dark:bg-body-dark">
                            <h2 className="mb-0" id="headingTwo">
                            <button
                                className="group relative flex w-full items-center border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-body-dark dark:text-white [&:not([data-twe-collapse-collapsed])]:bg-white [&:not([data-twe-collapse-collapsed])]:text-primary [&:not([data-twe-collapse-collapsed])]:shadow-border-b dark:[&:not([data-twe-collapse-collapsed])]:bg-surface-dark dark:[&:not([data-twe-collapse-collapsed])]:text-primary dark:[&:not([data-twe-collapse-collapsed])]:shadow-white/10 "
                                type="button"
                                data-twe-collapse-init
                                data-twe-collapse-collapsed
                                data-twe-target="#collapseTwo"
                                aria-expanded="false"
                                aria-controls="collapseTwo">
                                 BLOCK #2
                                <span
                                className="-me-1 ms-auto h-5 w-5 shrink-0 rotate-[-180deg] transition-transform duration-200 ease-in-out group-data-[twe-collapse-collapsed]:me-0 group-data-[twe-collapse-collapsed]:rotate-0 motion-reduce:transition-none [&>svg]:h-6 [&>svg]:w-6 ">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor">
                                    <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                                </span>
                            </button>
                            </h2>
                            <div
                            id="collapseTwo"
                            className="!visible hidden"
                            data-twe-collapse-item
                            aria-labelledby="headingTwo"
                            data-twe-parent="#accordionExample">
                            <div className="px-5 py-4">
                            <div className="grid grid-cols-3 gap-3">
                                    {
                                        lots.map( (lot, key) => {
                                            return (<div className="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark" key={key}>
                                                <div className="mt-4 flex items-end justify-between">
                                                    <div>
                                                        <h4 className="text-title-md font-bold text-black dark:text-white">{lot}</h4>
                                                        <span className="text-sm font-medium">Lot #{key+1}</span>
                                                    </div>
                                                </div>
                                            </div>)
                                            }
                                        )
                                    }
                                    <div className="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
                                        <div className="flex h-12.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                                            <SvgPlus/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div
                            className="rounded-b-lg border border-t-0 border-neutral-200 bg-white dark:border-neutral-600 dark:bg-body-dark">
                            <h2 className="accordion-header mb-0" id="headingThree">
                            <button
                                className="data-[twe-collapse-collapsed] group relative flex w-full items-center border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none data-[twe-collapse-collapsed]:rounded-b-lg dark:bg-body-dark dark:text-white [&:not([data-twe-collapse-collapsed])]:bg-white [&:not([data-twe-collapse-collapsed])]:text-primary [&:not([data-twe-collapse-collapsed])]:shadow-border-b dark:[&:not([data-twe-collapse-collapsed])]:bg-surface-dark dark:[&:not([data-twe-collapse-collapsed])]:text-primary  dark:[&:not([data-twe-collapse-collapsed])]:shadow-white/10"
                                type="button"
                                data-twe-collapse-init
                                data-twe-collapse-collapsed
                                data-twe-target="#collapseThree"
                                aria-expanded="false"
                                aria-controls="collapseThree">
                                BLOCK #3
                                <span
                                className="-me-1 ms-auto h-5 w-5 shrink-0 rotate-[-180deg] transition-transform duration-200 ease-in-out group-data-[twe-collapse-collapsed]:me-0 group-data-[twe-collapse-collapsed]:rotate-0 motion-reduce:transition-none [&>svg]:h-6 [&>svg]:w-6">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor">
                                    <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                                </span>
                            </button>
                            </h2>
                            <div
                            id="collapseThree"
                            className="!visible hidden"
                            data-twe-collapse-item
                            aria-labelledby="headingThree"
                            data-twe-parent="#accordionExample">
                            <div className="px-5 py-4">
                            <div className="grid grid-cols-3 gap-3">
                                    {
                                        lots.map( (lot, key) => {
                                            return (<div className="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark" key={key}>
                                                <div className="mt-4 flex items-end justify-between">
                                                    <div>
                                                        <h4 className="text-title-md font-bold text-black dark:text-white">{lot}</h4>
                                                        <span className="text-sm font-medium">Lot #{key+1}</span>
                                                    </div>
                                                </div>
                                            </div>)
                                            }
                                        )
                                    }
                                    <div className="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
                                        <div className="flex h-12.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                                            <SvgPlus/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </h3>
                </div>
            </div>
        </div>
        <div className="col-span-4 xl:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                    <form action="">
                        <h4 className="text-title-md font-bold text-black dark:text-white mb-5.5">Create New Lot</h4>
                            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                <div className="w-full sm:w-1/1">
                                    <label
                                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                                        htmlFor="block_name"
                                    >
                                        Block
                                    </label>
                                    <div className="relative">
                                        {/* <span className="absolute left-4.5 top-4">
                                        </span> */}
                                        <input
                                        className="w-full rounded border border-stroke bg-gray py-3 pl-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                        type="text"
                                        name="block_name"
                                        id="block_name"
                                        placeholder="Block Name"
                                        autoComplete="off"
                                        required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                <div className="w-full sm:w-1/1">
                                    <label
                                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                                        htmlFor="lot_name"
                                    >
                                        Lot Name
                                    </label>
                                    <div className="relative">
                                        {/* <span className="absolute left-4.5 top-4">
                                        </span> */}
                                        <input
                                        className="w-full rounded border border-stroke bg-gray py-3 pl-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                        type="text"
                                        name="lot_name"
                                        id="lot_name"
                                        placeholder="Lot Name"
                                        autoComplete="off"
                                        required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                <div className="w-full sm:w-1/1">
                                    <label
                                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                                        htmlFor="lot_area"
                                    >
                                        Lot Area
                                    </label>
                                    <div className="relative">
                                        {/* <span className="absolute left-4.5 top-4">
                                        </span> */}
                                        <input
                                        className="w-full rounded border border-stroke bg-gray py-3 pl-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                        type="number"
                                        min="1"
                                        name="lot_area"
                                        id="lot_area"
                                        placeholder="Lot Area"
                                        autoComplete="off"
                                        required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end gap-4.5">
                                <button
                                    className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                                    type="submit"
                                    >
                                    Save
                                </button>
                            </div>
                            
                    </form>
                </div>
            </div>
        </div>
    </div>
        </>
    )
}