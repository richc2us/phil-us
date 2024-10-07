import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import Link from "next/link";
import { getAmortizations } from "@/actions/amortizations";

export default async function(){

  const colletions = await getAmortizations()
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Amortizations" />
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4">
            </div>
        </DefaultLayout>
    )
}