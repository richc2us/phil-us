import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import DefaultLayout from "@/components/Layouts/DefaultLayout"


import { Metadata } from "next"

export const metadata: Metadata = {
    title:
      "Expenses",
    description: "Expenses",
};

const ExpensesPage = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Expenses" />
            
        </DefaultLayout>
    )
}

export default ExpensesPage