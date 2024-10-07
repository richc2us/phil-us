import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import NewCompanyForm from "./NewForm";
import { Metadata } from "next"

export const metadata: Metadata = {
    title:
      "New Companies",
    description: "Companies",
};

export default function(){
    return (
        <>
            <Breadcrumb pageName="New Company" />
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <NewCompanyForm/>
            </div>
        </>
    )
}
