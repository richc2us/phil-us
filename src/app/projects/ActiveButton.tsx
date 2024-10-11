"use client"
import { deleteProjectAction } from "@/actions/projects"

export const ActiveButton = ({id, active = false} : {id: any, active : boolean } ) => {
    return <form action={ async() => deleteProjectAction(id, active)}>
        <button
            className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
            type="submit"
            >
                {!active ? "Deactivate" : "Activate" }
            </button>
        </form>
}
