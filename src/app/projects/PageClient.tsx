"use client"
import { useEffect, useState } from "react";
import ReactDataTable, {ColumnType, OptionType} from 'react-datatable-responsive';
import { useRouter } from "next/navigation";
import { dataTableOptions } from "@/actions/state";
import Loader from "@/components/common/Loader";
import { getProjectsIndexApi } from "@/components/common/api";

export default function() {
const [collections, setCollections] = useState([])
const router = useRouter()
const columns: ColumnType[] = [
  { field: { title: 'name' }, label: 'Project Name' },
  { field: { title: 'address1' }, label: 'Address' },
  { field: { title: 'total_number_of_lots' }, label: 'Total Units' },
  { field: { title: 'project_type' }, label: 'Type' },
  { field: { title: 'project_status' }, label: 'Status' },
  { field: { title: 'createdAt' }, label: 'Created' },
]

const dataOptions : OptionType = {
  ...dataTableOptions,
  searchPlaceholder : "Search Project",
  onRowClick : function(project: any) {
    router.push("/projects/"+ project._id)
  }
}

useEffect(() => {
    getProjectsIndexApi((res:any) =>  setCollections(res))
},[])
    return(
        <>
        {
          collections.length == 0 ? <Loader isFormLoading={true} /> : <ReactDataTable rows={collections} columns={columns} options={dataOptions} />
        }
        </>
    )
}