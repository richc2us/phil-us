import { NextRequest, NextResponse } from "next/server"
import { getBarangays, getCities, getProvinces, getRegions } from "@/actions/addresses";

const getAddresses = async(
    req: NextRequest, { params: {region = "", province = "", city = "" , barangay = ""  }} : { params: {region? : string,province? : string, city?: string, barangay?: string}}
) => {
    if(region && region.length > 0 && province.length > 0 && city.length > 0 && barangay.length == 0) { // get barangays of that city
        return NextResponse.json(await getBarangays(city))
    } else if(region.length > 0 && province.length > 0 ) { // get cities of that province
        return NextResponse.json( await getCities(province) )
    } else if(region.length > 0 && region !== "regions" ) { // get provinces of that region
        return NextResponse.json(await getProvinces(region))
    }  else { // get regions
            return NextResponse.json( await getRegions())
    }
}

export {
    getAddresses as GET
}