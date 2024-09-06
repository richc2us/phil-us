import dbConnect from "@/lib/mongodb"
import  Company  from "@/models/companies"

export const getCompanies = async() => {
    await dbConnect()
    return await Company.find({})
}
