import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import NewRealtyForm from "./NewRealtyForm";


const NewRealty = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="New Realty" />
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <NewRealtyForm/>
            </div>
        </DefaultLayout>
    )
}

export default NewRealty