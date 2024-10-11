import { getProjects  } from "@/actions/projects"
import dbConnect from "@/lib/mongodb"
import { NextRequest, NextResponse } from "next/server"

const showProjects = async(
    req: NextRequest
) => {
    await dbConnect()
    return NextResponse.json(
        await getProjects()
    )
}

export {
    showProjects as GET,
}