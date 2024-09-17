"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useEffect } from "react";
import {
    Tab,
    initTWE,
    Collapse
  } from "tw-elements";

export default function BuyerDetailTabs({ id } : {id: string}) {

    // useEffect(() => {
    //     initTWE({ Tab, Collapse });
    // }, []);
    return(<>
            {id}
    </>)
}