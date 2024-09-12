import { getBuyers } from "@/actions/buyers"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import Link from "next/link"
import { BuyerDeleteButton } from "./BuyerDeleteButton"

const BuyerIndex = async() => {

    const buyers = await getBuyers()

    return (<div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4">
                    <div className="px-4 py-4 md:px-6 xl:px-7.5">
                        <div className="grid grid-cols-2">
                            <h4 className="text-xl font-semibold text-black dark:text-white">Buyers</h4>
                            <div className="flex justify-end gap-4.5">
                                <Link href="/buyers/new" className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
                                <button
                                    className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                                    type="submit"
                                    >
                                    New Buyer
                                </button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-6 md:px-6 2xl:px-7.5">
                        <div className="col-span-2 flex items-center">
                            <p className="font-medium">Name</p>
                        </div>

                        <div className="col-span-1 items-center sm:flex">
                            <p className="font-medium">Email</p>
                        </div>

                        <div className="col-span-1 flex items-center">
                            <p className="font-medium">Phone</p>
                        </div>

                        <div className="col-span-1 flex items-center">
                            <p className="font-medium">Created</p>
                        </div>

                        <div className="col-span-1 flex items-center">
                            <p className="font-medium">Action</p>
                        </div>
                    </div>

                    {buyers && buyers.map( (buyer, key) => {
                                    return (
                                    <div key={key} className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-6 md:px-6 2xl:px-7.5">
                                        <div className="col-span-2 flex items-center">
                                            <p className="font-medium">#{key + 1} { buyer.first_name } { buyer.middle_name } { buyer.last_name }</p>
                                        </div>

                                        <div className="col-span-1 items-center sm:flex">
                                            <p className="font-medium">{ buyer.email }</p>
                                        </div>

                                        <div className="col-span-1 flex items-center">
                                            <p className="font-medium">{ buyer.phone }</p>
                                        </div>

                                        <div className="col-span-1 flex items-center">
                                            <p className="text-sm dark:text-white">
                                                { (buyer.createdAt.getMonth() + 1) + "/" +  buyer.createdAt.getDate() + "/" + buyer.createdAt.getFullYear() + " " + buyer.createdAt.getHours() + ":" + buyer.createdAt.getMinutes()}
                                            </p>
                                        </div>
                                        <div className="col-span-1 flex items-center">
                                            <p className="font-medium"></p>
                                            <Link key={buyer._id} href={"/buyers/" + buyer._id} className="mx-2" >
                                                <button
                                                className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                                                type="submit"
                                                >
                                                View
                                                </button>
                                            </Link>
                                            <BuyerDeleteButton id={JSON.parse(JSON.stringify(buyer._id))}/>
                                        </div>
                                    </div>)
                    }) }
              </div>)
}

const Buyers = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="List of Buyers" />
            <BuyerIndex/>
        </DefaultLayout>
    )
}

export default Buyers