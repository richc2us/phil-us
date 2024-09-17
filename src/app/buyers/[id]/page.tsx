import DefaultLayout from "@/components/Layouts/DefaultLayout"
import BuyerDetailTabs from "./BuyerDetailTabs"
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
            <Breadcrumb pageName="Buyer" deepPages={["Buyer",document.fullName]} />
            <BuyerDetailTabs id={id} />
        </div>)
}

function BuyerDetail({params : {id}} : any ){
    return (
    <DefaultLayout>
        <BuyerDetailContent id={id}/>
    </DefaultLayout>)
}

export default BuyerDetail