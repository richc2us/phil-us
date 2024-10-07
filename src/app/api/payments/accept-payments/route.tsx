import { getAcceptablePaymentsAction } from "@/actions/acceptable_payments"
import { NextRequest, NextResponse } from "next/server"

const GET = async(
    req: NextRequest
) => {
    let documents = await getAcceptablePaymentsAction()
    return NextResponse.json(documents)
}

export {
    GET
}