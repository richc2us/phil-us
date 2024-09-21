import DefaultLayout from "@/components/Layouts/DefaultLayout"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import RealtyDetailContentPage from "./RealtyDetailContentPage"
import { Metadata } from "next"
import { getRealty } from "@/actions/realties"

const entity = "Realty"
const entities = "Realties"

export const metadata: Metadata = {
    title: "View " + entities ,
    description: entities
};

const RealtyDetailContent = async({id = ""} : { id : string}) => {

    const document = await getRealty(id)

return (<div className="mx-auto">
            <Breadcrumb pageName={document.name} deepPages={[entity ,document.name]} />
            { id && <RealtyDetailContentPage id={id} document={document.toJSON()} /> }
        </div>)
}

function RealtyDetail({ params }: { params: { id: string } }){
    return (
    <DefaultLayout>
        { params.id.length && <RealtyDetailContent id={ params.id } />}
    </DefaultLayout>)
}

export default RealtyDetail