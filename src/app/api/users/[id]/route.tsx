import dbConnect from "@/lib/mongodb"
import User from "@/models/users"
import { NextRequest, NextResponse } from "next/server"

const showUser = async(
    req: NextRequest, { params } : {params: {id: string}}
) => {
    await dbConnect()
    return NextResponse.json(
        await User.findById(params.id)
    )
}

export {
    showUser as GET
}