"use client"

import { deleteRealtyAction } from "@/actions/realties"

export const DeleteButton = ({id} : any ) => {
    return <form action={ async() => deleteRealtyAction(id)}>
            <button
            className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
            type="submit"
            >
            Delete
            </button>
        </form>
}
