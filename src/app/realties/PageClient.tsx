"use client"
import { useEffect, useState } from "react";
import ReactDataTable, {ColumnType, OptionType} from 'react-datatable-responsive';
import { useRouter } from "next/navigation";
import { dataTableOptions } from "@/actions/state";
import Loader from "@/components/common/Loader";
import {  getRealtiesApi } from "@/components/common/api";

export default function() {
const [collections, setCollections] = useState([])
const router = useRouter()
const columns: ColumnType[] = [
  { field: { title: 'name' }, label: 'Name' },
  { field: { title: 'description' }, label: 'Description' },
  { field: { title: 'tin' }, label: 'Tin' },
  { field: { title: 'contact_number' }, label: 'Contact Number' },
  { field: { title: 'createdAt' }, label: 'Created' },
]

const dataOptions : OptionType = {
  ...dataTableOptions,
  searchPlaceholder : "Search Realty",
  onRowClick : function(row: any) {
    router.push("/realties/"+ row._id)
  }
}

useEffect(() => {
    getRealtiesApi((resp:any) => setCollections(resp))
  
},[])
    return(
        <>
          {
          collections.length == 0 ? <Loader isFormLoading={true} /> : <ReactDataTable rows={collections} columns={columns} options={dataOptions} />
        }
        </>
    )
}