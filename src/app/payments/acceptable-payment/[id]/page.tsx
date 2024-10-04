import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import { Metadata } from "next"
import PageClient from "./PageClient";
import { getAcceptablePaymentAction } from "@/actions/acceptable_payments";
export const metadata: Metadata = {
    title:
      "New Acceptable Payments",
    description: "List of Acceptable Payments",
};

export default async function({ params : {id } }: { params: { id: string } }){
    const document = await getAcceptablePaymentAction(id)
    return (
        <DefaultLayout>
            <Breadcrumb pageName="New Acceptable Payments" />
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <PageClient document={document.toJSON()}/>
            </div>
        </DefaultLayout>
    )
}
