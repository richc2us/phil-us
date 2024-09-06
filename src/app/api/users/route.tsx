import dbConnect from "@/lib/mongodb"
import User from "@/models/users"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"

const showUsers = async(
    req: NextRequest
) => {
    await dbConnect()
    return NextResponse.json(
        await User.find({})
    )
}

const addUser = async(   req: NextRequest) => {
    let user = await req.json();
    try{
        const found = await User.findOne({
            email: user.email
        })

        if(found) {
            return NextResponse.json({
                error: 'Email already exists'
            })
        }
        user.password = await bcrypt.hash(user.password, 10)
        const newUser = await User.create( user )
        return NextResponse.json(newUser)
    } catch(e) {
        console.log(e)
    }
    return NextResponse.json({error: "Something went wrong"})
}

export {
    showUsers as GET,
    addUser as POST
}