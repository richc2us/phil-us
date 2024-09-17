import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import NewProjectForm from "./NewProjectForm"


import { Metadata } from "next"

export const metadata: Metadata = {
    title:
      "New Project",
    description: "Projects",
};

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