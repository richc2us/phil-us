import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import { getAmortization  } from "@/actions/amortizations";
import dynamic from "next/dynamic";

const PageClient = dynamic(() => import("./PageClient"), { ssr: false, });

export default async function({params : {id} } : any ){

  const document = await getAmortization(id)
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Amortizations" />
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4">
                <PageClient id={id} document={document.toJSON()} />
            </div>
        </DefaultLayout>
    )
}