import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import CalculatorForm from "./CalculatorForm";


export default function(){
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Monthly Amortization Calculator" />
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <CalculatorForm/>
            </div>
        </DefaultLayout>
    )
}
