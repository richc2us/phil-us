import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import { Metadata } from "next"
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import NewForm from "./NewForm";

export const metadata: Metadata = {
    title:
      "Accept Payment",
    description: "Accept Payments",
};

export default async function() {

    return (
      <DefaultLayout>
        <Breadcrumb pageName="Accept Payment"/>
          <NewForm/>
        </DefaultLayout>
    )
}
