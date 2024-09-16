import dbConnect from "@/lib/mongodb"
import Project from "@/models/projects"
import { NextRequest, NextResponse } from "next/server"

const getProject = async(
    req: NextRequest, { params } : {params: {id: string}}
) => {
    await dbConnect()
    return NextResponse.json(
        await Project.findById( params.id )
    )
}

// const addBlock = async(   req: NextRequest) => {
//     let user = await req.json();
//     try{
//         const block = await Project.create( user )
//         return NextResponse.json(block)
//     } catch(e) {
//         console.log(e)
//     }
//     return NextResponse.json({error: "Something went wrong"})
// }

export {
    getProject as GET,
    // addBlock as POST
}