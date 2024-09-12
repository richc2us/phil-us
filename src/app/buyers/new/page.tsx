import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import BuyerNewForm from "./BuyerNewForm"

const BuyerNewBuyer = () => {
    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4">
            <BuyerNewForm/>
        </div>
    )
}

const NewBuyer = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="New Buyer" />
            <BuyerNewBuyer/>
        </DefaultLayout>
    )
}

export default NewBuyer