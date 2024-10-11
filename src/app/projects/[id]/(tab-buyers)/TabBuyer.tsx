import { getProjectsBuyersApi } from "@/components/common/api";
import { usePageID } from "@/context/IDContext";
import React, { useEffect, useState } from "react";

export default function TabBuyer() {

  const id = usePageID()
  const [buyers, setBuyers] = useState([])

  useEffect(() => {
      getProjectsBuyersApi(id,  (res:any) => setBuyers(res))
  },[])

  return (
    <>
      <ol>
        {
          buyers.map( (buyer:any, key:any) => {
            return <li key={key}>{buyer.first_name}</li>
          })
        }
      </ol>
    </>
  );
}