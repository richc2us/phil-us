import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import Link from "next/link";
import { DeleteButton } from "./DeleteButton";
import { getAmortizations } from "@/actions/amortizations";

export default async function(){

  const colletions = await getAmortizations()
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Amortizations" />
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4">
        <div className="px-4 py-4 md:px-6 xl:px-7.5">
            <div className="grid grid-cols-2">
                <h4 className="text-xl font-semibold text-black dark:text-white"> Latest Amortization</h4>
                <div className="flex justify-end gap-4.5">
                    <Link href="/reservations/new" className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
                    <button
                        className="flex justify-center rounded bg-primary px-6 py-1 font-medium text-gray hover:bg-opacity-90"
                        type="submit"
                        >
                        New Reservations
                    </button>
                    </Link>
                </div>
            </div>
        </div>
  
      <div className="grid grid-cols-7 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-1 flex items-center">
            <p className="font-medium">ID</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Borrowers</p>
          </div>
          <div className="col-span-1 hidden items-center sm:flex">
            <p className="font-medium">Project / Block / Lot</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Reservation</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Terms</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Monthly</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Created</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Action</p>
          </div>
        </div>
  
        {colletions.map((doc :any, key:any) => (
          <div
            className="grid grid-cols-7 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5" key={key}>
            <div className="col-span-1 hidden items-center sm:flex">
              <p className="text-sm text-black dark:text-white">
                {key + 1}
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <ul>
                  {/* { doc.borrowers[0].toString()} */}
                  {
                    doc.borrowers.map( (borrower:any,k:any) =>
                        <li key={k}>
                            {borrower.email} {borrower.last_name}
                        </li>
                    )
                  }
                </ul>
              </div>
            </div>
            <div className="col-span-1 flex items-center">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <p className="text-sm text-black dark:text-white">
                  {doc.project_id.name} / {doc.block_id.name} / {doc.lot_id.name}
                </p>
              </div>
            </div>
            <div className="col-span-1 hidden items-center sm:flex">
              <p className="text-sm text-black dark:text-white">
              ₱ {doc.reservation}
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-black dark:text-white">
                {doc.terms}
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-black dark:text-white">₱ {doc.monthly}</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-sm dark:text-white">
                  { (doc.createdAt.getMonth() + 1) + "/" +  doc.createdAt.getDate() + "/" + doc.createdAt.getFullYear() + " " + doc.createdAt.getHours() + ":" + doc.createdAt.getMinutes()}
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              {/* <DeleteButton id={doc._id.toString()}/> */}
              <Link key={doc._id} href={"/amortizations/" + doc._id} className="mx-2" >
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
        </DefaultLayout>
    )
}