import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import Link from "next/link";
import { BSON } from "mongodb"
import { DEFAULT_COMPANY } from "@/actions/const";
import { Metadata } from "next"
import { getAcceptablePaymentsAction } from "@/actions/acceptable_payments";
import { DeleteButton } from "./DeleteButton";

export const metadata: Metadata = {
    title:
      "Acceptable Payments",
    description: "List of Acceptable Payments",
};


export default async function() {

  const documents = await getAcceptablePaymentsAction()
    return (
        <>
            <Breadcrumb pageName="Acceptable Payments" />
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="px-4 py-4 md:px-6 xl:px-7.5">
                  <div className="grid grid-cols-2">
                      <div></div>
                      <div className="flex justify-end gap-4.5">
                          <Link href="/payments/acceptable-payment/new" className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
                          <button
                              className="flex justify-center rounded bg-primary px-6 py-1 font-medium text-gray hover:bg-opacity-90"
                              type="submit"
                              >
                              New Acceptable Payment
                          </button>
                          </Link>
                      </div>
                  </div>
              </div>

              <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
                <div className="col-span-1 flex items-center">
                    <p className="font-medium">Id</p>
                </div>
                <div className="col-span-1 flex items-center">
                  <p className="font-medium">Name</p>
                </div>

                <div className="col-span-1 flex items-center">
                  <p className="font-medium">Type of Payment</p>
                </div>

                <div className="col-span-1 hidden items-center sm:flex">
                  <p className="font-medium">Description</p>
                </div>
                <div className="col-span-1 hidden items-center sm:flex">
                  <p className="font-medium">Created</p>
                </div>

                <div className="col-span-1 hidden items-center sm:flex">
                  <p className="font-medium">Action</p>
                </div>
              </div>

              {documents.map((document:any, key:any) => (
                <div
                  className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
                  key={key}
                >
                  <div className="col-span-1 hidden items-center sm:flex">
                    <p className="text-sm text-black dark:text-white">
                      {key + 1}
                    </p>
                  </div>

                  <div className="col-span-1 flex items-center">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                      <p className="text-sm text-black dark:text-white">
                        {document.name}
                      </p>
                    </div>
                  </div>
                  <div className="col-span-1 hidden items-center sm:flex">
                    <p className="text-sm text-black dark:text-white">
                      {document.mode_of_payment}
                    </p>
                  </div>
                  <div className="col-span-1 flex items-center">
                    <p className="text-sm text-black dark:text-white">
                      {document.description}
                    </p>
                  </div>
                  <div className="col-span-1 flex items-center">
                    <p className="text-sm text-black dark:text-white">
                      { (document.createdAt.getMonth() + 1) + "/" +  document.createdAt.getDate() + "/" + document.createdAt.getFullYear() + " " + document.createdAt.getHours() + ":" + document.createdAt.getMinutes()} 
                    </p>
                    <p className="text-sm text-black dark:text-white">
                      by {document.created_by?.first_name + " " + document.created_by?.last_name}
                    </p>
                  </div>
                  <div className="col-span-1 flex items-center">
                    { new BSON.ObjectId(DEFAULT_COMPANY).equals(document._id) ? "" : <DeleteButton id={JSON.parse(JSON.stringify(document._id))}/>  }
                    <Link key={document._id} href={"/payments/acceptable-payment/" + document._id} className="mx-2" >
                      <button
                        className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                        type="submit"
                        >
                        View
                        </button>
                      </Link>
                  </div>
                </div>
              ))}
            </div>
        </>
    )
}
