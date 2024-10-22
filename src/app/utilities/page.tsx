import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import { Metadata } from "next"
import PageClient from "./PageClient"

export const metadata: Metadata = {
    title:
      "Utilities",
    description: "Utilities",
};

export default async function() {
    return (
      <DefaultLayout>
            <Breadcrumb pageName="Utilities" />
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4">
              <PageClient/>
            </div>
       </DefaultLayout>
    )
}