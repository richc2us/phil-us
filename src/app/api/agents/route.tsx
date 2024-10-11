import { getAgents } from "@/actions/agents"
import dbConnect from "@/lib/mongodb"
import { NextRequest, NextResponse } from "next/server"

const showAgents = async(
    req: NextRequest
) => {
    await dbConnect()
    return NextResponse.json(
        await getAgents()
    )
}

export {
    showAgents as GET,
}