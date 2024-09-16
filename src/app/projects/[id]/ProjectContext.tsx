import { createContext, useContext } from "react";

const initialParams = {
    projectID :  ""
}

const ProjectContext = createContext(initialParams)

function useProject() {
    return useContext(ProjectContext)
}
export { ProjectContext, useProject }