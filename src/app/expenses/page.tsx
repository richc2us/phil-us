import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import DefaultLayout from "@/components/Layouts/DefaultLayout"


import { Metadata } from "next"

export const metadata: Metadata = {
    title:
      "Expenses",
    description: "Expenses",
};

export default function() {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Expenses" />
        </DefaultLayout>
    )
}
