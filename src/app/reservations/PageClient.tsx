"use client"
import { useEffect, useState } from "react";
import ReactDataTable, {ColumnType, OptionType} from 'react-datatable-responsive';
import { useRouter } from "next/navigation";
import { dataTableOptions } from "@/actions/state";
import Loader from "@/components/common/Loader";
import { getAmortizationsIndexApi } from "@/components/common/api";

export default function() {
const [collections, setCollections] = useState([])
const router = useRouter()
const columns: ColumnType[] = [
  { field: { title: 'first_name' }, label: 'Borrowers' },
  { field: { title: 'project_id.name' }, label: 'Project' },
  { field: { title: 'block_id.name' }, label: 'Block' },
  { field: { title: 'lot_id.name' }, label: 'Lot' },
  { field: { title: 'reservation' }, label: 'Reservation' },
  { field: { title: 'terms' }, label: 'Terms' },
  { field: { title: 'monthly' }, label: 'Monthly' },
  { field: { title: 'createdAt' }, label: 'Reservation Date' },
]

const dataOptions : OptionType = {
  ...dataTableOptions,
  searchPlaceholder : "Search Team Lead",
  onRowClick : function(row: any) {
    router.push("/amortizations/"+ row._id)
  }
}

useEffect(() => {
  getAmortizationsIndexApi( (resp:any) => setCollections(resp))
},[])
    return(
        <>
          {
          collections.length == 0 ? <Loader isFormLoading={true} /> : <ReactDataTable rows={collections} columns={columns} options={dataOptions} />
        }
        </>
    )
}