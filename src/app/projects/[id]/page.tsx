import DefaultLayout from "@/components/Layouts/DefaultLayout"
import { getProject } from "@/actions/projects"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import { Metadata } from "next"
import dynamic from "next/dynamic"

const PageClient = dynamic(() => import("./PageClient"), {
    ssr: false
})

export const metadata: Metadata = {
    title:
      "View Project",
    description: "Project",
};


export default async function({ params }: { params: { id: string } }){

    const project = await getProject(params.id)

    return (
    <DefaultLayout>
        <div className="mx-auto">
            <Breadcrumb pageName={project.name} deepPages={["Project",project.name]} />
            { params.id && <PageClient projectID={params.id}/> }
        </div>
    </DefaultLayout>)
}