"use client"
import {  useEffect } from "react";
import {
    Tab,
    initTWE
} from "tw-elements";

import { IDContextProvider } from "@/context/IDContextProvider";
import DetailsTab from "./DetailsTab";

export default function PageClient({id, company} : {id: string, company:any}) {

    useEffect(() => {
        initTWE({ Tab })
    }, [])

    return (
        <IDContextProvider id={id}>
        <ul
            className="mb-5 flex list-none flex-row flex-wrap border-b-0 ps-0"
            role="tablist"
            data-twe-nav-ref>
            <li role="presentation">
                <a
                href="#tabs-overview"
                className="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[twe-nav-active]:border-primary data-[twe-nav-active]:text-primary dark:text-white/50 dark:hover:bg-neutral-700/60 dark:data-[twe-nav-active]:text-primary"
                data-twe-toggle="pill"
                data-twe-target="#tabs-overview"
                data-twe-nav-active
                role="tab"
                aria-controls="tabs-overview"
                aria-selected="true"
                >Overview</a>
            </li>
            <li role="presentation">
                <a
                href="#tabs-details"
                className="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[twe-nav-active]:border-primary data-[twe-nav-active]:text-primary dark:text-white/50 dark:hover:bg-neutral-700/60 dark:data-[twe-nav-active]:text-primary"
                data-twe-toggle="pill"
                data-twe-target="#tabs-details"
                role="tab"
                aria-controls="tabs-details"
                aria-selected="false"
                >Details</a>
            </li>
            <li role="presentation">
                <a
                href="#tabs-projects"
                className="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[twe-nav-active]:border-primary data-[twe-nav-active]:text-primary dark:text-white/50 dark:hover:bg-neutral-700/60 dark:data-[twe-nav-active]:text-primary"
                data-twe-toggle="pill"
                data-twe-target="#tabs-projects"
                role="tab"
                aria-controls="tabs-projects"
                aria-selected="false"
                >Projects</a>
            </li>
        </ul>

        <div className="mb-6">
            <div
                className="hidden opacity-100 transition-opacity duration-150 ease-linear data-[twe-tab-active]:block"
                id="tabs-overview"
                role="tabpanel"
                aria-labelledby="tabs-overview-tab"
                data-twe-tab-active>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">

                </div>
            </div>

            <div
                className="hidden opacity-0 transition-opacity duration-150 ease-linear data-[twe-tab-active]:block"
                id="tabs-details"
                role="tabpanel"
                aria-labelledby="tabs-details-tab">
                    <DetailsTab company={company} />
            </div>

            <div
                className="hidden opacity-0 transition-opacity duration-150 ease-linear data-[twe-tab-active]:block"
                id="tabs-projects"
                role="tabpanel"
                aria-labelledby="tabs-projects-tab">
                    <p>Show list of projects</p>
            </div>

        </div>
        </IDContextProvider>
    )
}