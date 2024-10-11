import dbConnect from "@/lib/mongodb"
import AmortizationBorrower from "@/models/amortization_borrowers"
import Amortization from "@/models/amortizations"
import User from "@/models/users"
import { NextRequest, NextResponse } from "next/server"

const GET = async(
    req: NextRequest, { params } : {params:  {id: string} }
) => {
    await dbConnect()
    let amortization_ids :any = []
    const amortizations = await Amortization.find({project_id: params.id})
    amortizations.map((amort:any) => amortization_ids.push(amort._id.toString()))
    let borrowers = await AmortizationBorrower.find({amortization_id : { $in : amortization_ids}}).distinct("user_id")
    return NextResponse.json( await User.find({_id:{ $in : borrowers }}) )
}

export {
     GET
}