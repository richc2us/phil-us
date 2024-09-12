import DefaultLayout from "@/components/Layouts/DefaultLayout"
// import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
// import { getBuyer } from "@/actions/buyers"
import BuyerDetailTabs from "./BuyerDetailTabs"

const BuyerDetailContent = async({id} : {id: string}) => {
    return (<div className="mx-auto">
            <BuyerDetailTabs id={id} />
        </div>)
}
function ProjectDetail(props : any){
    console.dir(props) 
    return (
    <DefaultLayout>
        <BuyerDetailContent id={props.params.id}/>
    </DefaultLayout>)
}

export default ProjectDetail