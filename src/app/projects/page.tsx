import { getProjects } from "@/actions/projects";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import SvgPlus from "@/components/common/Loader/svg/plus";
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import Image from "next/image";
import Link from "next/link";
import { ProjectDeleteButton } from "./ProjectDeleteButton";


const ProjectTable = async() => {
  const projects = await getProjects()
    return (
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="px-4 py-6 md:px-6 xl:px-7.5">
            <div className="">
                <h4 className="text-xl font-semibold text-black dark:text-white">
                    Recent Projects
                </h4>
                <h4 className="pt-2">
                <Link href="/projects/add" className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
                    <SvgPlus/>
                </Link>
                </h4>
            </div>
        </div>
  
        <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
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
            <p className="font-medium">Discount Scheme</p>
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
                {project.address}
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-black dark:text-white">
                {project.address2}
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-black dark:text-white">{project.investment_amount}</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-meta-3">{project.bulk_discount_scheme ? project.bulk_discount_scheme +"%"  :""}</p>
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
    );
  };

const Projects = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Projects" />
            <ProjectTable/>
        </DefaultLayout>
    )
}

export default Projects