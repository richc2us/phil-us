import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import NewForm from "./NewForm"


import { Metadata } from "next"

export const metadata: Metadata = {
    title:"New Agent",
    description: "Agent",
};

export default function (){
    return (
        <>
            <Breadcrumb pageName="New Agent" />
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4">
                <NewForm/>
            </div>
        </>
    )
}