import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import { Metadata } from "next"
import PageClient from "./PageClient";
import { getAcceptablePaymentAction } from "@/actions/acceptable_payments";
export const metadata: Metadata = {
    title:
      "View Acceptable Payments",
    description: "View Acceptable Payments",
};

export default async function({ params : {id } }: { params: { id: string } }){
    const document = await getAcceptablePaymentAction(id)
    return (
        <DefaultLayout>
            <Breadcrumb pageName="View Acceptable Payments" />
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <PageClient document={document.toJSON()}/>
            </div>
        </DefaultLayout>
    )
}
