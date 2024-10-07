import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import NewForm from "./NewForm";
import { Metadata } from "next"
export const metadata: Metadata = {
    title:
      "New Receiver Account",
    description: "List of New Receiver Account",
};

export default async function(){
    return (
        <>
            <Breadcrumb pageName="New Receiver Account" />
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <NewForm/>
            </div>
        </>
    )
}
