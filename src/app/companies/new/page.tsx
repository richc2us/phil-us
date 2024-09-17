import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import NewCompanyForm from "./NewCompanyForm";


import { Metadata } from "next"

export const metadata: Metadata = {
    title:
      "New Companies",
    description: "Companies",
};

const NewCompany = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="New Company" />
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <NewCompanyForm/>
            </div>
        </DefaultLayout>
    )
}

export default NewCompany