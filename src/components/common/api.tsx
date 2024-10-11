import { requestApi } from "./functions"


const getRealtiesApi = async(callback:any) => {
    await requestApi("/api/realties", callback )
}

const getBuyersIndexApi = async(callback:any) => {
    await requestApi("/api/buyers-index", callback)
}

const getProjectsIndexApi = async(callback:any)  => {
    await requestApi("/api/projects-index",  callback )
}

const getProjectsSearchApi = async(callback:any)  => {
    await requestApi("/api/projects",  callback )
}

const getTeamLeadsIndexApi = async(callback:any)  => {
    await requestApi("/api/team-lead",  callback )
}

const getAgentsIndexApi = async(callback:any)  => {
    await requestApi("/api/agents",  callback )
}

const getAmortizationsIndexApi = async(callback:any)  => {
    await requestApi("/api/amortizations-index",  callback )
}

// require ID, Single

const getUserSingleApi = async(id:any,callback:any) => {
    await requestApi( "/api/users/"+id, callback )
}

const getProjectSingleApi = async(id:any,callback:any)  => {
    await requestApi("/api/projects/" + id,  callback )
}

// Multiple Collections

const getBuyerAmortizationsApi = async(id:any, callback:any) => {
    await requestApi("/api/amortizations/" + id,  callback )
}

const getProjectBlocksApi = async(id:any,callback:any)  => {
    await requestApi("/api/projects/blocks/"+id,  callback )
}

const getProjectsBuyersApi = async(id:any,callback:any)  => {
    await requestApi("/api/projects/buyers/"+id,  callback )
}



export {
    getRealtiesApi,
    getBuyersIndexApi,
    getProjectsIndexApi,
    getTeamLeadsIndexApi,
    getProjectsSearchApi,
    getAgentsIndexApi,
    getAmortizationsIndexApi,

    getUserSingleApi,
    getProjectSingleApi,

    getBuyerAmortizationsApi,
    getProjectBlocksApi,
    getProjectsBuyersApi,
}