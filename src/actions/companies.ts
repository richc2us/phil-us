'use server';
import dbConnect from "@/lib/mongodb";
import  Company  from "@/models/companies"
import { revalidatePath } from "next/cache";
import { ServerActionResponse } from "@/types/server-action-reply";

export const getCompanies = async() => {
    return await Company.find({})
}

export const saveCompanyAction = async(form: any) : Promise<ServerActionResponse> => {
    await dbConnect()
    try {
        const newCompany = await Company.create(form)
        revalidatePath("/");
        return {success: true, message: 'Company '+ newCompany.name + ' created', document: newCompany}
    } catch (e: any) {
        console.dir(e);
        let errors = []
        for(let field in e.errors) {
            errors.push(e.errors[field].message)
        }
        return {success: false, message: 'Error creating company ', document: null, errors : errors}
    }
}

export const deleteCompanyAction = async(id: any) : Promise <ServerActionResponse> => {
    await dbConnect()
    try {
        if(id !== "66da989213b8e3d6f81346d3") {
            await Company.deleteOne({_id: id})
            revalidatePath("/");
            return {success: true, message: 'company deleted', document: null}
        }
        return {success: false, message: 'Company cannot be deleted', document: null}
    } catch (e:any) {
        console.dir(e);
        let errors = []
        for(let field in e.errors) {
            errors.push(e.errors[field].message)
        }
        return {success: false, message: 'Error in deleting company', document: null, errors: errors}
    }
}