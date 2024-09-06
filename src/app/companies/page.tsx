// import { getCompanies } from "@/actions/companies";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import SvgPlus from "@/components/common/Loader/svg/plus";
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import Link from "next/link";
import  Company  from "@/models/companies"
import { deleteCompanyAction } from "@/actions/companies";
import { CompanyDeleteButton } from "./delete-button";

const CompanyTable = async() => {
  const companies = await Company.find({})
    // const companies : [] = []
    return (
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="px-4 py-6 md:px-6 xl:px-7.5">
            <div className="">
                <h4 className="pt-2">
                <Link href="/companies/add" className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
                  <SvgPlus/>
                </Link>
                </h4>
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
  
        {companies.map((company:any, key) => (
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
              <CompanyDeleteButton companyId={JSON.parse(JSON.stringify(company._id))}/>
            </div>
          </div>
        ))}
      </div>
    );
  };

const Companies = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Companies" />
            <CompanyTable/>
        </DefaultLayout>
    )
}

export default Companies