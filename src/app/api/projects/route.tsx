import { searchProject } from "@/actions/search"
import dbConnect from "@/lib/mongodb"
import Project from "@/models/users"
import { NextRequest, NextResponse } from "next/server"

const showProjects = async(
    req: NextRequest
) => {
    await dbConnect()
    return NextResponse.json(
        await searchProject()
    )
}

export {
    showProjects as GET,
}