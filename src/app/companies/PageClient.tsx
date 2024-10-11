"use client"
import { useEffect, useState } from "react";
import ReactDataTable, {ColumnType, OptionType} from 'react-datatable-responsive';
import { useRouter } from "next/navigation";
import { dataTableOptions } from "@/actions/state";
import Loader from "@/components/common/Loader";
import { getCompanies } from "@/actions/companies";

export default function() {
const [collections, setCollections] = useState([])
const router = useRouter()
const columns: ColumnType[] = [
  { field: { title: 'name' }, label: 'Name' },
  { field: { title: 'address' }, label: 'Address' },
  { field: { title: 'address2' }, label: 'Alternative Address' },
  { field: { title: 'description' }, label: 'Description' },
]

const dataOptions : OptionType = {
  ...dataTableOptions,
  searchPlaceholder : "Search Company",
  onRowClick : function(document: any) {
    router.push("/companies/"+ document._id)
  }
}

useEffect(() => {
    const companies = async() => {
        const companies = await getCompanies()
        setCollections(companies)
    }
    companies()
},[])
    return(
        <>
        {
          collections.length == 0 ? <Loader isFormLoading={true} /> : <ReactDataTable rows={collections} columns={columns} options={dataOptions} />
        }
        </>
    )
}