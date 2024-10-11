import { getBuyers } from "@/actions/buyers"
import dbConnect from "@/lib/mongodb"
import { NextRequest, NextResponse } from "next/server"

export const GET = async(
    req: NextRequest
) => {
    await dbConnect()
    return NextResponse.json(
        await getBuyers()
    )
}