import { getBuyers } from "@/actions/buyers"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import Link from "next/link"
import { ActiveButton } from "./ActiveButton"
import { Metadata } from "next"
import PageClient from "./PageClient"

export const metadata: Metadata = {
    title:
      "Buyers",
    description: "Buyers",
  };


export default async function() {
    const buyers = await getBuyers()
    return (
        <DefaultLayout>
            <Breadcrumb pageName="" />
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4">
                    <div className="px-4 py-4 md:px-6 xl:px-7.5">
                        <div className="grid grid-cols-2">
                            <h4 className="text-xl font-semibold text-black dark:text-white">Buyers</h4>
                            <div className="flex justify-end gap-4.5">
                                <Link href="/buyers/new" className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
                                <button
                                    className="flex justify-center rounded bg-primary px-6 py-1 font-medium text-gray hover:bg-opacity-90"
                                    type="submit"
                                    >
                                    New Buyer
                                </button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* {buyers && buyers.map( (buyer, key) => {
                                    return (
                                    <div key={key} className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-6 md:px-6 2xl:px-7.5">
                                        <div className="col-span-2 flex items-center">
                                            <p className="font-medium">#{key + 1} { buyer.first_name } { buyer.middle_name } { buyer.last_name }</p>
                                        </div>

                                        <div className="col-span-2 items-center">
                                            <p className="font-medium block">{ buyer.email }</p>
                                            <p className="font-medium block">{ buyer.phone }</p>
                                        </div>

                                        <div className="col-span-1 flex items-center">
                                            <p className="text-sm dark:text-white">
                                                { new Intl.DateTimeFormat('en-GB',{
                                                       year: "numeric",
                                                       month: "long",
                                                       day: "numeric",
                                                       hour: "numeric",
                                                       minute: "numeric"
                                                }).format(buyer.createdAt)}
                                            </p>
                                        </div>
                                        <div className="col-span-1 flex items-center">
                                            <ActiveButton id={JSON.parse(JSON.stringify(buyer._id))} active={!buyer.active}/>
                                            <Link key={buyer._id} href={"/buyers/" + buyer._id} className="mx-2" >
                                                <button
                                                className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                                                type="submit"
                                                >
                                                View
                                                </button>
                                            </Link>
                                        </div>
                                    </div>)
                    }) } */}
                    <PageClient/>
            </div>
        </DefaultLayout>
    )
}
