import dbConnect from "@/lib/mongodb"
import User from "@/models/users"
import { NextRequest, NextResponse } from "next/server"
import { ACCOUNT_TYPE_TEAM_LEAD } from "@/actions/const"

const showTeamLeads = async(
    req: NextRequest
) => {
    await dbConnect()
    return NextResponse.json(
        await User.find({account_type: ACCOUNT_TYPE_TEAM_LEAD})
    )
}


export {
    showTeamLeads as GET
}