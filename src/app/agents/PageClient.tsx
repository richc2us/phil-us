"use client"
import { useEffect, useState } from "react";
import ReactDataTable, {ColumnType, OptionType} from 'react-datatable-responsive';
import { useRouter } from "next/navigation";
import { dataTableOptions } from "@/actions/state";
import Loader from "@/components/common/Loader";
import { getAgentsIndexApi } from "@/components/common/api";

export default function() {
const [collections, setCollections] = useState([])
const router = useRouter()
const columns: ColumnType[] = [
  { field: { title: 'first_name' }, label: 'First Name' },
  { field: { title: 'middle_name' }, label: 'Middle Name' },
  { field: { title: 'last_name' }, label: 'Last Name' },
  { field: { title: 'email' }, label: 'Email' },
  { field: { title: 'phone' }, label: 'Phone' },
  { field: { title: 'createdAt' }, label: 'Created' },
]

const dataOptions : OptionType = {
  ...dataTableOptions,
  searchPlaceholder : "Search Agent",
  onRowClick : function(row: any) {
    router.push("/agents/"+ row._id)
  }
}

useEffect(() => {
    getAgentsIndexApi( (resp:any) => setCollections(resp))
  
},[])
    return(
      <div className="p-4">
          {
          collections.length == 0 ? <Loader isFormLoading={true} /> : <ReactDataTable rows={collections} columns={columns} options={dataOptions} />
        }
        </div>
    )
}