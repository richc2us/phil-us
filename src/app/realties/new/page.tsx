import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import NewForm from "./NewForm";


export default function() {
    return (
        <>
            <Breadcrumb pageName="New Realty" />
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <NewForm/>
            </div>
        </>
    )
}