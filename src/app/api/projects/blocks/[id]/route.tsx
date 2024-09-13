import dbConnect from "@/lib/mongodb"
import Block from "@/models/blocks"
import User from "@/models/users"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"

const getBlocks = async(
    req: NextRequest, { params } : {params: {id: string}}
) => {
    await dbConnect()
    return NextResponse.json(
        await Block.find({project_id : params.id})
    )
}

const addBlock = async(   req: NextRequest) => {
    let user = await req.json();
    try{
        const block = await Block.create( user )
        return NextResponse.json(block)
    } catch(e) {
        console.log(e)
    }
    return NextResponse.json({error: "Something went wrong"})
}

export {
    getBlocks as GET,
    addBlock as POST
}