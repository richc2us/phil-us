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

const ProjectDetailContent = async({projectID = ""} : { projectID : string}) => {
const project = await getProject(projectID)

return (<div className="mx-auto">
            <Breadcrumb pageName={project.name} deepPages={["Project",project.name]} />
            { projectID && <ProjectDetailTabs projectID={projectID}/> }
        </div>)
}

function ProjectDetail({ params }: { params: { id: string } }){
    return (
    <DefaultLayout>
        { params.id.length && <ProjectDetailContent projectID={ params.id } />}
    </DefaultLayout>)
}

export default ProjectDetail