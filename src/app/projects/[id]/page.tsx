import DefaultLayout from "@/components/Layouts/DefaultLayout"
import ProjectDetailTabs from "./ProjectDetailTabs"
import { getProject } from "@/actions/projects"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"

const ProjectDetailContent = async({id} : {id: string}) => {
    const project = await getProject(id)
    console.dir(project)
    return (<div className="mx-auto">
            <Breadcrumb pageName={project.name} deepPages={["Project",project.name]} />
            <ProjectDetailTabs id={id} project={ project.toObject() } />
        </div>)
}
function ProjectDetail({ params }: { params: { id: string } }){
    return (
    <DefaultLayout>
        <ProjectDetailContent id={params.id}/>
    </DefaultLayout>)
}

export default ProjectDetail