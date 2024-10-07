import { getCompanies } from "@/actions/companies";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import Link from "next/link";
import { CompanyDeleteButton } from "./CompanyDeleteButton";
import { BSON } from "mongodb"
import { DEFAULT_COMPANY } from "@/actions/const";

import { Metadata } from "next"

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
                      <h4 className="text-xl font-semibold text-black dark:text-white">Listed Companies</h4>
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

              <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
                <div className="col-span-1 flex items-center">
                    <p className="font-medium">Id</p>
                </div>
                <div className="col-span-2 flex items-center">
                  <p className="font-medium">Name</p>
                </div>

                <div className="col-span-1 flex items-center">
                  <p className="font-medium">Address</p>
                </div>

                <div className="col-span-1 flex items-center">
                  <p className="font-medium">Alternative Address</p>
                </div>
                <div className="col-span-2 hidden items-center sm:flex">
                  <p className="font-medium">Description</p>
                </div>
                <div className="col-span-1 hidden items-center sm:flex">
                  <p className="font-medium">Action</p>
                </div>
              </div>

              {companies.map((company:any, key:any) => (
                <div
                  className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
                  key={key}
                >
                  <div className="col-span-1 hidden items-center sm:flex">
                    <p className="text-sm text-black dark:text-white">
                      {key + 1}
                    </p>
                  </div>

                  <div className="col-span-2 flex items-center">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                      <p className="text-sm text-black dark:text-white">
                        {company.name}
                      </p>
                    </div>
                  </div>
                  <div className="col-span-1 hidden items-center sm:flex">
                    <p className="text-sm text-black dark:text-white">
                      {company.address}
                    </p>
                  </div>
                  <div className="col-span-1 flex items-center">
                    <p className="text-sm text-black dark:text-white">
                      {company.address2}
                    </p>
                  </div>
                  <div className="col-span-2 flex items-center">
                    <p className="text-sm text-black dark:text-white">
                      {company.description}
                    </p>
                  </div>
                  <div className="col-span-1 flex items-center">
                    { new BSON.ObjectId(DEFAULT_COMPANY).equals(company._id) ? "" : <CompanyDeleteButton companyId={JSON.parse(JSON.stringify(company._id))}/>  }
                    <Link key={company._id} href={"/companies/" + company._id} className="mx-2" >
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
