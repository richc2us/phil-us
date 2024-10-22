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
    <div className="rounded-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-body-dark mb-2 p-4">
      <table className="table table-auto h-full w-full">
          <thead>
              <tr>
                  <th className="text-start">#</th>
                  <th className="text-start">Full Name</th>
                  <th className="text-start">Address</th>
              </tr>
          </thead>
          <tbody>
              {
                buyers.map( (buyer:any, key:any) => {
                  return <tr className="text-start" key={key}>
                      <td>{key + 1}</td>
                      <td>
                        {buyer.first_name} {buyer.middle_name} {buyer.last_name}
                      </td>
                      <td>
                        {buyer.address}
                      </td>
                    </tr>
                })
              }
          </tbody>
      </table>
    </div>
  );
}