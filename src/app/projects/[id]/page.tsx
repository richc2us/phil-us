import DefaultLayout from "@/components/Layouts/DefaultLayout"
import ProjectDetailTabs from "./ProjectDetailTabs"
import { getProject } from "@/actions/projects"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"

const ProjectDetailContent = async({id} : {id: string}) => {
    const project = await getProject(id)
    return (<div className="mx-auto">
            <Breadcrumb pageName={project.name} deepPages={["Project",project.name]} />
            { id.length && <ProjectDetailTabs id={id} /> }
        </div>)
}
function ProjectDetail({ params }: { params: { id: string } }){
    return (
    <DefaultLayout>
        {
            params.id.length && <ProjectDetailContent id={params.id}/>
        }
        
    </DefaultLayout>)
}

export default ProjectDetail