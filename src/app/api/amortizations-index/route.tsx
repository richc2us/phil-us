import {  getAmortizations } from "@/actions/amortizations"
import dbConnect from "@/lib/mongodb"
import { NextRequest, NextResponse } from "next/server"

const showAmortizations = async(
    req: NextRequest
) => {
    await dbConnect()
    return NextResponse.json(
        await getAmortizations()
    )
}

export {
    showAmortizations as GET,
}