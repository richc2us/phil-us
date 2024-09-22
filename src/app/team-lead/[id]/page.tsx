import DefaultLayout from "@/components/Layouts/DefaultLayout"
import { Metadata } from "next"
import { getBuyer } from "@/actions/buyers";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import PageClient from "./PageClient";
import { getRealties } from "@/actions/realties";

export const metadata: Metadata = {
    title:
      "View Team Lead",
    description: "Team Lead",
  };

  export default async function({params : {id}} : any ){
  const document = await getBuyer(id)
    return (
    <DefaultLayout>
        <div className="mx-auto">
            <Breadcrumb pageName={document.fullName} deepPages={["Team Lead", document.fullName]}/>
            <PageClient id={id} document={document.toJSON()} />
        </div>
    </DefaultLayout>)
}
