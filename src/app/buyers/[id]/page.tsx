import DefaultLayout from "@/components/Layouts/DefaultLayout"
import BuyerDetailPage from "./BuyerDetailPage"
import { Metadata } from "next"
import { getBuyer } from "@/actions/buyers";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

export const metadata: Metadata = {
    title:
      "View Buyer",
    description: "Buyers",
  };

const BuyerDetailContent = async({id} : {id: string}) => {
    const document = await getBuyer(id)
    return (<div className="mx-auto">
            <Breadcrumb pageName={document.fullName} deepPages={["Buyer",document.fullName]} />
            <BuyerDetailPage id={id} document={document.toJSON()} />
        </div>)
}

function BuyerDetail({params : {id}} : any ){
    return (
    <DefaultLayout>
        <BuyerDetailContent id={id}/>
    </DefaultLayout>)
}

export default BuyerDetail