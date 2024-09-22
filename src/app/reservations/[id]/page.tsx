import DefaultLayout from "@/components/Layouts/DefaultLayout"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import PageClient from "./PageClient"
import { Metadata } from "next"
import { getRealty } from "@/actions/realties"

const entity = "Realty"
const entities = "Realties"

export const metadata: Metadata = {
    title: "View " + entities ,
    description: entities
};

export default async function({ params }: { params: { id: string } }) {

    const document = await getRealty(params.id)

    return (
    <DefaultLayout>
        <div className="mx-auto">
            <Breadcrumb pageName={document.name} deepPages={[entity ,document.name]} />
            { params.id && <PageClient id={params.id} document={document.toJSON()} /> }
        </div>
    </DefaultLayout>)
}
