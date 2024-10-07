import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import NewForm from "./NewForm"


import { Metadata } from "next"

export const metadata: Metadata = {
    title:"New Team Lead",
    description: "Team Lead",
};

export default function (){
    return (
        <DefaultLayout>
            <Breadcrumb pageName="New Team Lead" />
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4">
                <NewForm/>
            </div>
        </DefaultLayout>
    )
}