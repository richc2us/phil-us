import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import { Metadata } from "next"
import PageClient from "./PageClient";
import { getReceiverAccountAction } from "@/actions/receiver_accounts";
export const metadata: Metadata = {
    title:
      "New Receiver Account",
    description: "View Receiver Account",
};

export default async function({ params : {id } }: { params: { id: string } }){
    const document = await getReceiverAccountAction(id)
    return (
        <DefaultLayout>
            <Breadcrumb pageName={document?.name} />
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <PageClient document={document.toJSON()}/>
            </div>
        </DefaultLayout>
    )
}
