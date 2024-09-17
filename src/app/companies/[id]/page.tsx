import DefaultLayout from "@/components/Layouts/DefaultLayout"
import { getProject } from "@/actions/projects"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import { getCompany } from "@/actions/companies"
import CompanyDetailContentPage from "./CompanyDetailContentPage"


import { Metadata } from "next"

export const metadata: Metadata = {
    title:
      "View Companies",
    description: "Companies",
};

const CompanyDetailContent = async({id = ""} : { id : string}) => {

    const document = await getCompany(id)

return (<div className="mx-auto">
            <Breadcrumb pageName={document.name} deepPages={["Companies",document.name]} />
            { id && <CompanyDetailContentPage id={id} company={document.toJSON()} /> }
        </div>)
}

function ProjectDetail({ params }: { params: { id: string } }){
    return (
    <DefaultLayout>
        { params.id.length && <CompanyDetailContent id={ params.id } />}
    </DefaultLayout>)
}

export default ProjectDetail