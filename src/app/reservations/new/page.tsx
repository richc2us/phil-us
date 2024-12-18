import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import DefaultLayout from "@/components/Layouts/DefaultLayout"

import dynamic from "next/dynamic";

const NewForm = dynamic(() => import("./NewForm"), {
    ssr: false
  })
export default function(){
    return (
        <DefaultLayout>
            <Breadcrumb pageName="New Reservation" />
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <NewForm/>
            </div>
        </DefaultLayout>
    )
}
