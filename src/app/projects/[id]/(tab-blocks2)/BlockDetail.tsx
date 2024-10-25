import { useEffect, useState } from "react"
import ProjectDetailTabBlockNewBlock from "./(block)/ProjectDetailTabBlockNewBlock"
import ProjectDetailTabBlockNewLot from "./(lot)/ProjectDetailTabBlockNewLot"
import ProjectDetailTabBlockUpdateBlock from "./(block)/ProjectDetailTabBlockUpdateBlock"
import ProjectDetailTabBlockUpdateLot from "./(lot)/ProjectDetailTabBlockUpdateLot"
import Loader from "@/components/common/Loader"
import { initialLot, useBlocks, useBlocksDispatchContext } from "../../../../context/BlocksContext"
import Image from "next/image"
import ProjectDetailTabBlockHoldLot from "./(lot)/ProjectDetailTabBlockHoldLot"
import { formatDecimal } from "@/components/common/functions"


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
    const [counter, setCounter] = useState({
      availableCounter:0,
      soldCounter:0,
      onHoldCounter: 0
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
    useEffect(()=>{
      let availableCounter =0
      let soldCounter = 0
      let onHoldCounter = 0
      blocks.map((block:any, index:any) => {
          availableCounter += block.availableCounter
          soldCounter += block.soldCounter
          onHoldCounter += block.onholdCounter
      })
      setCounter({availableCounter,soldCounter,onHoldCounter})
    },[blocks])
    return (
        <div className="grid grid-cols-6 gap-8">
          <div className="col-span-8 xl:col-span-4">
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
          Available {counter.availableCounter}
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
          Sold {counter.soldCounter}
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
          On Hold {counter.onHoldCounter}
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
                                <div className="rounded-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-body-dark mb-2 pb-4 pt-4">
                                  {
                                      blocks.map((block:any, index:any) =>
                                          (
                                                  <div
                                                  id={"collapse" + index}
                                                  // className={"!visible " + ((index == 0 ) ? "" : "hidden")}
                                                  className={"!visible"}
                                                  data-twe-collapse-item
                                                  aria-labelledby={"heading" + index}
                                                  data-twe-parent="#accordionBlock"
                                                  key={index}
                                                  >
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
                                                              {block.name} {block.description && " " + block.description }
                                                              {!block.active && " [ inactive ]"}
                                                          </button>
                                                          <button
                                                            type="button"
                                                              onClick={
                                                                  (e) => {
                                                                      toggle("isAddingLot")
                                                                      dispatch({type:'setCurrentLot', currentLot : {...initialLot , id: "", block_id: block._id} })
                                                                  }
                                                              }
                                                              className="block cursor-pointer rounded-sm border border-stroke bg-white px-3 py-3 shadow-default dark:border-strokedark dark:bg-boxdark">
                                                                  <Image width={18} height={18} alt="Add New Black" src="/icons/plus-black.svg"/>
                                                          </button>
                                                      </div>
                                                      <div className="grid grid-cols-1 mb-4">
                                                          <table className="h-full w-full table-auto">
                                                            <thead>
                                                              <tr>
                                                                {/* <th>Block Name</th> */}
                                                                <th>Lot Name</th>
                                                                <th>Area</th>
                                                                <th>Price Per sqm</th>
                                                                <th>TCP</th>
                                                                <th>Remark</th>
                                                              </tr>
                                                            </thead>
                                                            <tbody>
                                                            {
                                                                block.blockLots && block.blockLots.map( (lot :any, key : any) => {
                                                                    let showLot = filterStatus().indexOf(lot.status) !== -1
                                                                    let lotClass = lot.status == "sold" ? "bg-sold" : ( lot.status == "onhold" ? "bg-onhold" : "" )
                                                                    return (
                                                                      showLot && 
                                                                          <tr
                                                                          key={key}
                                                                          onClick={(e) => {
                                                                                        toggle('isEditingLot', true)
                                                                                        dispatch({type:'setCurrentLot', currentLot : {...lot, id: lot._id.toString()} })
                                                                          }}
                                                                          className={"cursor-pointer rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark " + lotClass}>
                                                                            {/* <td className="text-center">{block.name}</td> */}
                                                                            <td className="text-center">{lot.name}</td>
                                                                            <td className="text-center">{lot.area} sqm</td>
                                                                            <td className="text-center">{formatDecimal(lot.price_per_sqm)}</td>
                                                                            <td className="text-center">{ formatDecimal(lot.price_per_sqm * lot.area) }</td>
                                                                            <td className="text-center">{lot.remark}</td>
                                                                          </tr>
                                                                    )
                                                                  }
                                                                )
                                                            }
                                                            </tbody>
                                                          </table>
                                                          <hr className="mt-4" />
                                                      </div>
                                                  </div>
                                                  </div>
                                          )
                                    )
                                  }
                                  </div>
                              </div>
                          </div>
                      </div>
                  }
          </div>
          <div className="col-span-2 w-full">
            {state.isAddingBlock && <ProjectDetailTabBlockNewBlock  />}
            {state.isAddingLot && <ProjectDetailTabBlockNewLot  />}
            {state.isEditingBlock && <ProjectDetailTabBlockUpdateBlock/>}
            {state.isEditingLot && <ProjectDetailTabBlockUpdateLot onHoldCallback={ () => toggle('isHoldingLot')} />}
            {state.isHoldingLot && <ProjectDetailTabBlockHoldLot />}
          </div>
        </div>
    )
}
