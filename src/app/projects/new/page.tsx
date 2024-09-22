import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import NewProjectForm from "./NewProjectForm"


import { Metadata } from "next"

export const metadata: Metadata = {
    title:
      "New Project",
    description: "Projects",
};

export default function() {
    return (
    <DefaultLayout>
        <div className="mx-auto">
            <Breadcrumb pageName="New Project" />
            <div>
                <NewProjectForm/>
            </div>
        </div>
    </DefaultLayout>)
}
