import { useEffect, useState } from "react";
import { initialLot, useBlocks, useBlocksDispatchContext } from "../../../../../context/BlocksContext"
import { onHoldLotAction } from "@/actions/blocks";
import { SidebarIcon } from "@/components/common/functions";
import Select from 'react-select';
import { searchUsers } from "@/actions/search";
import InputTextLabel from "@/components/FormElements/Fields/InputTextLabel";
import PrimarySaveButton from "@/components/FormElements/Buttons/PrimarySaveButton";


export default function ProjectDetailTabBlockHoldLot() {
    const { blocks, currentLot, projectID } = useBlocks()
    const dispatch = useBlocksDispatchContext()

    const [selectedOption] = useState<string>(currentLot.block_id);
    const [lot, setLot] = useState({...currentLot, agentName : ""});
    const [isOptionSelected] = useState<boolean>(false);
    const [requesting, setRequesting] = useState(false)
    const [agents, setAgents] = useState([])

    useEffect(()=> {
        setLot({...currentLot})
        setRequesting(true)
        const AsyncAgents = async() => {
            const agents = await searchUsers("")
            const selectAgents:any = []
            agents.map( (item:any) => {
                if(item.data._id.toString() == lot.agent_id) {
                    setLot({...lot, agentName: item.label})
                }
                selectAgents.push(item)
            })
            console.dir(agents)
            setAgents(agents)
        }
        AsyncAgents()
        setRequesting(false)
    },[currentLot])


    return (
        <form  
        className="col-span-4 xl:col-span-2 fixed w-[25%]"
        action={
            async() => {
                await onHoldLotAction({...lot,
                    project_id:projectID,
                    block_id: selectedOption,
                    id: lot._id,
                    onhold: lot.status == "available",
                    agent_id: lot.agent_id
                })
                setLot(initialLot)
                dispatch({type:""})
            }
        }>
        <div className="">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h4 className="text-title-md font-bold text-black dark:text-white mb-5.5">
                        {lot.status == "available" ? "Hold" : "Cancel Hold"} Lot
                    </h4>
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                        <div>
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Block
                        </label>

                        <div className="relative z-20 bg-white dark:bg-form-input">
                            <span className="absolute left-4 top-1/2 z-30 -translate-y-1/2">
                                {SidebarIcon('block')}
                            </span>
                            <select
                            value={selectedOption}
                            className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-12 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
                                isOptionSelected ? "text-black dark:text-white" : ""
                            }`} disabled={true}
                            >
                            {
                                blocks.map( (block:any, index) => {
                                return <option value={block._id} className="text-body dark:text-bodydark" key={index}> {block.name}</option>
                            }) }
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
                    <div className="w-full sm:w-1/2">
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
                            className="w-full rounded border border-stroke py-3 pl-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="text"
                            name="lot_name"
                            id="lot_name"
                            placeholder="Lot Name"
                            autoComplete="off"
                            value={lot.name}
                            onChange={(e) => {
                                setLot({...lot, name: e.target.value})
                            }}
                            required
                            disabled={true}
                            />
                        </div>
                    </div>
                </div>
                
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
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
                            className="w-full rounded border border-stroke py-3 pl-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="number"
                            min="10"
                            name="lot_area"
                            id="lot_area"
                            placeholder="Lot Area sqm"
                            autoComplete="off"
                            value={lot.area}
                            onChange={(e) => {
                                setLot({...lot, area: parseInt( e.target.value )})
                            }}
                            required
                            disabled={true}
                            />
                        </div>
                    </div>
                    <div className="w-full sm:w-1/2">
                        <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="price_per_sqm"
                        >
                            Price Per sqm
                        </label>
                        <div className="relative">
                            {/* <span className="absolute left-4.5 top-4">
                            </span> */}
                            <input
                            className="w-full rounded border border-stroke py-3 pl-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="number"
                            min="10"
                            name="price_per_sqm"
                            id="price_per_sqm"
                            placeholder="Lot Area sqm"
                            autoComplete="off"
                            value={lot.price_per_sqm}
                            onChange={(e) => {
                                setLot({...lot, price_per_sqm: parseInt( e.target.value )})
                            }}
                            required
                            disabled={true}
                            />
                        </div>
                    </div>
                </div>
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                            <div className="w-full sm:w-1/1">
                                <InputTextLabel htmlFor="agent_id" >
                                        Agent
                                </InputTextLabel>
                                <Select
                                    required
                                    id="agent_id"
                                    className="border-b"
                                    styles={{
                                        control: (baseStyles, state) => ({
                                            ...baseStyles,
                                            border: 'none'
                                        })
                                    }}
                                    options={agents}
                                    value={{
                                        value:lot.agent_id,
                                        label: lot.agentName}
                                    }
                                    isDisabled={lot.status == "onhold"}
                                    isLoading={requesting}
                                    onChange={
                                        ({label,value} : any, b : any) => {
                                            setLot({ ...lot ,agent_id: value, agentName: label })
                                        }
                                    }
                                />
                            </div>
                </div>

                    <div className="flex justify-end gap-4.5">
                        <PrimarySaveButton
                            disabled={lot.status == "available" && lot.agent_id == null}
                        >
                            {lot.status == "available" ? "Hold Lot" : "Cancel Hold"}
                        </PrimarySaveButton>
                        {/* <button
                            className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90 disabled:bg-whiter disabled:text-black"
                            
                            type="submit"
                            >
                        </button> */}
                    </div>
                </div>
            </div>
        </div>

            
        </form>
    )
}