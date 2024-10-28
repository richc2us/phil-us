"use client"

import { saveBlockAction } from "@/actions/blocks"
import { useState } from "react"
import { useBlocks, useBlocksDispatchContext } from "../../../../../context/BlocksContext"
import PrimarySaveButton from "@/components/FormElements/Buttons/PrimarySaveButton"

export default function ProjectDetailTabBlockNewBlock() {

    const {projectID} = useBlocks()

    const initialState = {
        name: "",
        description: "",
        project_id : projectID
    }

    const [block, setBlock] = useState(initialState)

    const dispatch = useBlocksDispatchContext()

    function updateState(prev:any) { return setBlock({ ...block, ...prev})}

    return (
        <form
        className="col-span-4 xl:col-span-2  fixed w-[25%]"
        action={ async()  => {
                await saveBlockAction(block)
                await dispatch({type:'refresh'})
                setBlock(initialState)
            }
        }>
        <div className="">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h4 className="text-title-md font-bold text-black dark:text-white mb-5.5">New Block</h4>
                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                        <div className="w-full sm:w-1/1">
                            <label
                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                htmlFor="block_name"
                            >
                                Block Name
                            </label>
                            <div className="relative">
                                {/* <span className="absolute left-4.5 top-4">
                                </span> */}
                                <input
                                className="w-full rounded border border-stroke py-3 pl-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                type="text"
                                name="block_name"
                                id="block_name"
                                placeholder="Block Name"
                                autoComplete="off"
                                required
                                value={block.name}
                                onChange={(e) => updateState({ name: e.target.value })}
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
                                Description
                            </label>
                            <div className="relative">
                                {/* <span className="absolute left-4.5 top-4">
                                </span> */}
                                <input
                                className="w-full rounded border border-stroke py-3 pl-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                type="text"
                                name="block_description"
                                id="block_description"
                                placeholder="Description"
                                autoComplete="off"
                                value={block.description}
                                onChange={(e) => updateState({ description: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4.5">
                        <PrimarySaveButton/>
                        {/* <button
                            className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                            type="submit"
                            >
                            Save
                        </button> */}
                    </div>

                </div>
            </div>
        </div>

            
        </form>
    )
}