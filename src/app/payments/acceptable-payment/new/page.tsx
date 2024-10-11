import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import NewForm from "./NewForm";
import { Metadata } from "next"
export const metadata: Metadata = {
    title:
      "New Acceptable Payments",
    description: "List of Acceptable Payments",
};

export default async function(){
    return (
        <DefaultLayout>
            <Breadcrumb pageName="New Acceptable Payments" />
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <NewForm/>
            </div>
        </DefaultLayout>
    )
}
