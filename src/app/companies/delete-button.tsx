"use client"

import { deleteCompanyAction } from "@/actions/companies"

export const CompanyDeleteButton = ({companyId} : any ) => {
    return <form action={ async() => deleteCompanyAction(companyId)}>
        <button
            className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
            type="submit"
            >
            Delete
            </button>
        </form>
}
