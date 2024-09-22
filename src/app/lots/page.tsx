import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import DefaultLayout from "@/components/Layouts/DefaultLayout"


import { Metadata } from "next"

export const metadata: Metadata = {
    title:
      "List of Lots",
    description: "Lots",
};

export default function(){
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Lots" />
        </DefaultLayout>
    )
}