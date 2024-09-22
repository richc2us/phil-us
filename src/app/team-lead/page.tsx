import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import Link from "next/link"
import { Metadata } from "next"
import { DeleteButton } from "./DeleteButton"
import { getTeamLeads } from "@/actions/team-lead"

export const metadata: Metadata = {
    title:
      "List of Agents",
    description: "Agents",
  };


  export default async function() {
    const documents = await getTeamLeads()

    return (
        <DefaultLayout>
            <Breadcrumb pageName="List of Team Leads" />
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4">
                    <div className="px-4 py-4 md:px-6 xl:px-7.5">
                        <div className="grid grid-cols-2">
                            <h4 className="text-xl font-semibold text-black dark:text-white">Team Leads</h4>
                            <div className="flex justify-end gap-4.5">
                                <Link href="/team-lead/new" className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
                                <button
                                    className="flex justify-center rounded bg-primary px-6 py-1 font-medium text-gray hover:bg-opacity-90"
                                    type="submit"
                                    >
                                    New Team Lead
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
                            <p className="font-medium">Realty</p>
                        </div>

                        <div className="col-span-1 flex items-center">
                            <p className="font-medium">Created</p>
                        </div>

                        <div className="col-span-1 flex items-center">
                            <p className="font-medium">Action</p>
                        </div>
                    </div>

                    {documents && documents.map( (document:any, key) => {
                                    return (
                                    <div key={key} className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-6 md:px-6 2xl:px-7.5">
                                        <div className="col-span-2 flex items-center">
                                            <p className="font-medium">#{key + 1} { document.first_name } { document.middle_name } { document.last_name }</p>
                                        </div>

                                        <div className="col-span-1 items-center sm:flex">
                                            <p className="font-medium">{ document.email }</p>
                                        </div>

                                        <div className="col-span-1 flex items-center">
                                            <p className="font-medium">{ document.phone }</p>
                                        </div>

                                        <div className="col-span-1 flex items-center">
                                            <p className="text-sm dark:text-white">
                                                { (document.createdAt.getMonth() + 1) + "/" +  document.createdAt.getDate() + "/" + document.createdAt.getFullYear() + " " + document.createdAt.getHours() + ":" + document.createdAt.getMinutes()}
                                            </p>
                                        </div>
                                        <div className="col-span-1 flex items-center">
                                            <DeleteButton id={JSON.parse(JSON.stringify(document._id))} />
                                            <Link key={document._id} href={"/team-lead/" + document._id} className="mx-2" >
                                                <button
                                                className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                                                type="submit"
                                                >
                                                    View
                                                </button>
                                            </Link>

                                        </div>
                                    </div>)
                    }) }
              </div>
        </DefaultLayout>
    )
}