import DefaultLayout from "@/components/Layouts/DefaultLayout"
import ProjectDetailTabs from "./ProjectDetailTabs"
import { getProject } from "@/actions/projects"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"

import { Metadata } from "next"

export const metadata: Metadata = {
    title:
      "View Project",
    description: "Project",
};


export default async function({ params }: { params: { id: string } }){

    const project = await getProject(params.id)

    return (
    <>
        <div className="mx-auto">
            <Breadcrumb pageName={project.name} deepPages={["Project",project.name]} />
            { params.id && <ProjectDetailTabs projectID={params.id}/> }
        </div>
    </>)
}