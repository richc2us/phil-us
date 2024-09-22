import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import BuyerNewForm from "./BuyerNewForm"


import { Metadata } from "next"

export const metadata: Metadata = {
    title:"New Buyers",
    description: "Buyers",
};

export default function (){
    return (
        <DefaultLayout>
            <Breadcrumb pageName="New Buyer" />
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4">
                <BuyerNewForm/>
            </div>
        </DefaultLayout>
    )
}