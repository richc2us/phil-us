import { getAmortizations } from "@/actions/amortizations"
import dbConnect from "@/lib/mongodb"
import { NextRequest, NextResponse } from "next/server"

const getBuyerAmortizationsRoute = async(
    req: NextRequest, { params } : {params: {id: string}}
) => {
    await dbConnect()
    return NextResponse.json(
        await getAmortizations()
    )
}


export {
    getBuyerAmortizationsRoute as GET,
}