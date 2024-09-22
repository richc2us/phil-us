import DefaultLayout from "@/components/Layouts/DefaultLayout"
import { Metadata } from "next"
import { getBuyer } from "@/actions/buyers";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import PageClient from "./PageClient";

export const metadata: Metadata = {
    title:
      "View Agent",
    description: "Agent",
  };

  export default async function({params : {id}} : any ){
  const document = await getBuyer(id)
    return (
    <DefaultLayout>
        <div className="mx-auto">
            <Breadcrumb pageName="Agent" deepPages={["Agent",document.fullName]} />
            <PageClient id={id} document={document.toJSON()} />
        </div>
    </DefaultLayout>)
}
