import dbConnect from "@/lib/mongodb"
import Realty from "@/models/realties"
import { NextRequest, NextResponse } from "next/server"

const showRealties = async(
    req: NextRequest
) => {
    await dbConnect()
    return NextResponse.json(
        await Realty.find({})
    )
}

export {
    showRealties as GET,
}