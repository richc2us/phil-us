import DefaultLayout from "@/components/Layouts/DefaultLayout"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import { getCompany } from "@/actions/companies"
import { Metadata } from "next"
import PageClient from "./PageClient"

export const metadata: Metadata = {
    title:
      "View Companies",
    description: "Companies",
};

export default async function({ params }: { params: { id: string } }) {
    const document = await getCompany(params.id)

    return (
    <DefaultLayout>
        <div className="mx-auto">
            <Breadcrumb pageName={document.name} deepPages={["Companies",document.name]} />
            { params.id && <PageClient id={params.id} company={document.toJSON()} /> }
        </div>
    </DefaultLayout>)
}
