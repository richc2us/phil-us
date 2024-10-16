import { getCompanies } from "@/actions/companies";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import Link from "next/link";
import { ActiveButton } from "./ActiveButton";
import { BSON } from "mongodb"
import { DEFAULT_COMPANY } from "@/actions/const";

import { Metadata } from "next"
import PageClient from "./PageClient";

export const metadata: Metadata = {
    title:
      "List of Companies",
    description: "Companies",
};


export default async function() {

  const companies = await getCompanies()
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Companies" />
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="px-4 py-4 md:px-6 xl:px-7.5">
                  <div className="grid grid-cols-2">
                      <h4 className="text-xl font-semibold text-black dark:text-white">Companies</h4>
                      <div className="flex justify-end gap-4.5">
                          <Link href="/companies/new" className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
                          <button
                              className="flex justify-center rounded bg-primary px-6 py-1 font-medium text-gray hover:bg-opacity-90"
                              type="submit"
                              >
                              New Company
                          </button>
                          </Link>
                      </div>
                  </div>
              </div>
              <PageClient/>
            </div>
        </DefaultLayout>
    )
}
