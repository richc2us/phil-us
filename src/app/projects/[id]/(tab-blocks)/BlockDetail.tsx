import { useState } from "react"
import ProjectDetailTabBlockNewBlock from "./(block)/ProjectDetailTabBlockNewBlock"
import ProjectDetailTabBlockNewLot from "./(lot)/ProjectDetailTabBlockNewLot"
import ProjectDetailTabBlockUpdateBlock from "./(block)/ProjectDetailTabBlockUpdateBlock"
import ProjectDetailTabBlockUpdateLot from "./(lot)/ProjectDetailTabBlockUpdateLot"
import Loader from "@/components/common/Loader"
import { initialLot, useBlocks, useBlocksDispatchContext } from "../../../../context/BlocksContext"
import Image from "next/image"
import ProjectDetailTabBlockHoldLot from "./(lot)/ProjectDetailTabBlockHoldLot"


type defaultState = {
    isAddingBlock:boolean,
    isAddingLot:boolean,
    isEditingBlock: boolean,
    isEditingLot: boolean,
    isHoldingLot: boolean
}

type defaultFilterState = {
    available: boolean,
    sold: boolean,
    onhold: boolean
}
export default function BlockDetail({ loading = false } : any) {
    const {blocks} = useBlocks()
    const dispatch = useBlocksDispatchContext()
    const [state, setState] = useState<defaultState>({
        isAddingBlock:false,
        isAddingLot:false,
        isEditingBlock: false,
        isEditingLot: false,
        isHoldingLot: false
    })
    function updateState(prev:any) { return setState({ ...state, ...prev})}
    function toggle(selector:any = "isAddingLot", force: boolean = false) {
        let t = !state[selector as keyof defaultState]
        let oldState:defaultState = state
        Object.keys(oldState).map( (val:string) => oldState[val as keyof defaultState] = false )
        updateState({ ...oldState , [selector] :  force ? force : t })
    }

    const [filter, setFilter] = useState<defaultFilterState>({
        available: true,
        sold: true,
        onhold: true
    })
    const filterStatus =  () => Object.keys(filter).filter( (status:any) => filter[status as keyof defaultFilterState] )

    return (
        <div className="grid grid-cols-5 gap-8">
        <div className="col-span-5 xl:col-span-3">
            <div className="flex justify-end gap-4.5 mb-4">
            <label
                htmlFor="filterAvailable"
                className="flex cursor-pointer select-none items-center"
            >
        <div className="relative">
          <input
            type="checkbox"
            id="filterAvailable"
            className="sr-only"
            onChange={() => {
              setFilter({...filter, available: !filter.available})
              dispatch()
            }}
          />
          <div
            className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
              filter.available && "border-primary bg-gray dark:bg-transparent"
            }`}
          >
            <span className={`opacity-0 ${filter.available && "!opacity-100"}`}>
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
        Available
      </label>

      <label
        htmlFor="filterSold"
        className="flex cursor-pointer select-none items-center"
      >
        <div className="relative">
          <input
            type="checkbox"
            id="filterSold"
            className="sr-only"
            onChange={() => {
              setFilter({...filter, sold: !filter.sold})
              dispatch()
            }}
          />
          <div
            className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
              filter.sold && "border-primary bg-gray dark:bg-transparent"
            }`}
          >
            <span className={`opacity-0 ${filter.sold && "!opacity-100"}`}>
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
        Sold
      </label>

      <label
        htmlFor="filterOnhold"
        className="flex cursor-pointer select-none items-center"
      >
        <div className="relative">
          <input
            type="checkbox"
            id="filterOnhold"
            className="sr-only"
            onChange={() => {
              setFilter({...filter, onhold: !filter.onhold})
              dispatch()
            }}
          />
          <div
            className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
              filter.onhold && "border-primary bg-gray dark:bg-transparent"
            }`}
          >
            <span className={`opacity-0 ${filter.onhold && "!opacity-100"}`}>
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
        On Hold
      </label>
        <button
            className="flex justify-center rounded border bg-white border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
            type="button"
            onClick={() => toggle('isAddingBlock')}
            >
            New Block
        </button>
            </div>
                { loading &&  <Loader/>}
                {!loading && blocks.length > 0 && 
                    <div className="rounded-sm border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                            <div id="accordionBlock">
                                {
                                    blocks.map((block:any, index:any) => {
                                        return (
                                            <div className="rounded-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-body-dark mb-2 pb-2" key={index}>
                                                <h2 className="mb-0" id={"heading" + index}>
                                                <button
                                                    className="group relative flex w-full items-center rounded-t-lg border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-body-dark dark:text-white [&:not([data-twe-collapse-collapsed])]:bg-white [&:not([data-twe-collapse-collapsed])]:text-primary [&:not([data-twe-collapse-collapsed])]:shadow-border-b dark:[&:not([data-twe-collapse-collapsed])]:bg-surface-dark dark:[&:not([data-twe-collapse-collapsed])]:text-primary dark:[&:not([data-twe-collapse-collapsed])]:shadow-white/10 "
                                                    type="button"
                                                    data-twe-collapse-init
                                                    data-twe-target={"#collapse" + index}
                                                    aria-expanded={ index == 0 ? "true" : "false"}
                                                    aria-controls={"#collapse" + index}
                                                    >
                                                    {block.name} {block.description && "[ " + block.description + " ]" }
                                                    {!block.active && " [ inactive ]"}
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
                                                id={"collapse" + index}
                                                className={"!visible " + ((index == 0 ) ? "" : "hidden")}
                                                data-twe-collapse-item
                                                aria-labelledby={"heading" + index}
                                                data-twe-parent="#accordionBlock">
                                                <div className="px-5">
                                                    <div className="flex justify-end gap-4.5 mb-4">
                                                        <button
                                                            className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                                                            type="button"
                                                            onClick={() => {
                                                                    toggle('isEditingBlock')
                                                                    dispatch({type:'setCurrentBlock', currentBlock : {...block, id: block._id} })
                                                                }
                                                            }
                                                            >
                                                            Update Block
                                                        </button>
                                                    </div>
                                                    <div className="grid grid-cols-3 gap-3">
            
                                                        {
                                                            block.blockLots && block.blockLots.map( (lot :any, key : any) => {
                                                                let showLot = filterStatus().indexOf(lot.status) !== -1
                                                                let lotClass = lot.status == "sold" ? "bg-sold" : ( lot.status == "onhold" ? "bg-onhold" : "" )
                                                                return (showLot && <div
                                                                        onClick={(e) => {
                                                                            toggle('isEditingLot', true)
                                                                            dispatch({type:'setCurrentLot', currentLot : {...lot, id: lot._id.toString()} })
                                                                        }
                                                                } className={"cursor-pointer rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark " + lotClass } key={key}>
                                                                    <div className="mt-4 flex items-end justify-between">
                                                                        <div>
                                                                            <h4 className={( ["bg-sold","bg-onhold"].includes(lotClass) ? "text-white" : "text-black" ) +" text-title-md font-bold dark:text-white"}>{lot.area} sqm</h4>
                                                                            <span className="text-sm font-medium block">{lot.status ?? "available"}</span>
                                                                            <span className="text-sm font-medium">{lot.name} {!lot.active ? "inactive" : ""}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>)
                                                                }
                                                            )
                                                        }
                                                        <div
                                                            onClick={
                                                                (e) => {
                                                                    toggle("isAddingLot")
                                                                    dispatch({type:'setCurrentLot', currentLot : {...initialLot , id: "", block_id: block._id} })
                                                                }
                                                            }
                                                            className="cursor-pointer rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
                                                            <div className="flex h-12.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                                                                {/* <SvgPlus/> */}
                                                                <Image width={18} height={18} alt="Add New Black" src="/icons/plus-black.svg"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            
                                {/* <div
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
                                    data-twe-parent="#accordionBlock">
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
                                    data-twe-parent="#accordionBlock">
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
                                </div> */}
            
            
                            </div>
                        </div>
                    </div>
                }
        </div>
        {state.isAddingBlock && <ProjectDetailTabBlockNewBlock  />}
        {state.isAddingLot && <ProjectDetailTabBlockNewLot  />}
        {state.isEditingBlock && <ProjectDetailTabBlockUpdateBlock/>}
        {state.isEditingLot && <ProjectDetailTabBlockUpdateLot onHoldCallback={ () => toggle('isHoldingLot')} />}
        {state.isHoldingLot && <ProjectDetailTabBlockHoldLot />}
        </div>
    )
}
