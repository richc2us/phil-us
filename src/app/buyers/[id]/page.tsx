import DefaultLayout from "@/components/Layouts/DefaultLayout"
import { Metadata } from "next"
import { getBuyer } from "@/actions/buyers";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import dynamic from "next/dynamic";

const PageClient = dynamic(() => import("./PageClient"))

export const metadata: Metadata = {
    title:
      "View Buyer",
    description: "Buyers",
  };

export default async function ({params : {id}} : any ){
  const document = await getBuyer(id)

    return (
    <DefaultLayout>
        <div className="mx-auto">
            <Breadcrumb pageName={document.fullName} deepPages={["Buyer",document.fullName]} />
            <PageClient id={id} document={document.toJSON()} />
        </div>
    </DefaultLayout>)
}
