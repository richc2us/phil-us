import { getProjects } from "@/actions/projects";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import Link from "next/link";
import { ProjectDeleteButton } from "./ProjectDeleteButton";


import { Metadata } from "next"

export const metadata: Metadata = {
    title:
      "List of Projects",
    description: "Projects",
};

export default async function() {
  const projects = await getProjects()
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Projects" />
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4">
              <div className="px-4 py-4 md:px-6 xl:px-7.5">
                  <div className="grid grid-cols-2">
                      <h4 className="text-xl font-semibold text-black dark:text-white">
                          Recent Projects
                      </h4>
                      <div className="flex justify-end gap-4.5">
                          <Link href="/projects/new" className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
                          <button
                              className="flex justify-center rounded bg-primary px-6 py-1 font-medium text-gray hover:bg-opacity-90"
                              type="submit"
                              >
                              New Project
                          </button>
                          </Link>
                      </div>
                  </div>
              </div>

            <div className="grid grid-cols-7 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
              <div className="col-span-1 flex items-center">
                  <p className="font-medium">ID</p>
                </div>
                <div className="col-span-1 flex items-center">
                  <p className="font-medium">Project Name</p>
                </div>
                <div className="col-span-1 hidden items-center sm:flex">
                  <p className="font-medium">Description</p>
                </div>
                <div className="col-span-1 flex items-center">
                  <p className="font-medium">Investment Amount</p>
                </div>
                <div className="col-span-1 flex items-center">
                  <p className="font-medium">Total Lots</p>
                </div>
                <div className="col-span-1 flex items-center">
                  <p className="font-medium">Created</p>
                </div>
                <div className="col-span-1 flex items-center">
                  <p className="font-medium">Action</p>
                </div>
              </div>
        
              {projects.map((project, key) => (
                <div
                  className="grid grid-cols-7 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
                  <div className="col-span-1 hidden items-center sm:flex">
                    <p className="text-sm text-black dark:text-white">
                      {key + 1}
                    </p>
                  </div>
                  <div className="col-span-1 flex items-center">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                      <p className="text-sm text-black dark:text-white">
                        {project.name}
                      </p>
                    </div>
                  </div>
                  <div className="col-span-1 hidden items-center sm:flex">
                    <p className="text-sm text-black dark:text-white">
                      {project?.description?.length > 0 ? project?.description : ""}
                    </p>
                  </div>
                  <div className="col-span-1 flex items-center">
                    <p className="text-sm text-black dark:text-white">
                      {project.investment_amount > 0 ? project.investment_amount : ""}
                    </p>
                  </div>
                  <div className="col-span-1 flex items-center">
                    <p className="text-sm text-black dark:text-white">{ project.total_number_of_lots > 0 ? project.total_number_of_lots : ""  }</p>
                  </div>
                  <div className="col-span-1 flex items-center">
                    <p className="text-sm dark:text-white">
                        { (project.createdAt.getMonth() + 1) + "/" +  project.createdAt.getDate() + "/" + project.createdAt.getFullYear() + " " + project.createdAt.getHours() + ":" + project.createdAt.getMinutes()}
                    </p>
                  </div>
                  <div className="col-span-1 flex items-center">
                    <ProjectDeleteButton id={JSON.parse(JSON.stringify(project._id))}/>
                    <Link key={project._id} href={"/projects/" + project._id} className="mx-2" >
                      <button
                        className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                        type="submit"
                        >
                        View
                        </button>
                      </Link>
                  </div>
                </div>
              ))}
            </div>
        </DefaultLayout>
    )
}