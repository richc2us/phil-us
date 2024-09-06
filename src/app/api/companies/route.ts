import dbConnect from "@/lib/mongodb"
import Company from "@/models/companies"
import { NextRequest, NextResponse } from "next/server"

const show = async(
    req: NextRequest
) => {
    await dbConnect()
    return NextResponse.json(
        await Company.find({})
    )
}

const add = async(   req: NextRequest) => {
    let data = await req.json();
    try{
        const newData = await Company.create( data )
        return NextResponse.json(newData)
    } catch(e) {
        console.log(e)
    }
    return NextResponse.json({error: "Something went wrong"})
}

export {
    show as GET,
    add as POST
}