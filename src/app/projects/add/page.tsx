import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import NewProjectForm from "./NewProjectForm"

const ProjectAddContent = () => {
    return (
        <div className="mx-auto">
            <Breadcrumb pageName="New Project" />
            <div>
                <NewProjectForm/>
            </div>
        </div>
    )
}
const ProjectAdd =  () => {
    return (
    <DefaultLayout>
        <ProjectAddContent/>
    </DefaultLayout>)
}

export default ProjectAdd