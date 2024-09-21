'use server';
import dbConnect from "@/lib/mongodb";
import  Company  from "@/models/companies"
import { revalidatePath } from "next/cache";
import { ServerActionResponse } from "@/types/server-action-reply";
import { DEFAULT_COMPANY } from "./const";
import { getAll, getSingleById, saveDocument } from "./cores";

export const getCompanies = async() => {
    return await getAll(Company)
}

export const getCompany = async(id: string) => {
    return await getSingleById(Company, id)
}

export const updateCompany = async(form:any) => {
    await dbConnect()
    try {
        const document = await Company.findById(form.id)
        if(document) {
            document.name = form.name
            document.address = form.address
            document.address2 = form.address2
            document.description = form.description
            document.save()
            revalidatePath("/")
            return {success: true, message: document.name + ' updated', document : { id: document._id.toString() }}
        }
        return {success: false, message: 'error updating', document : { id: document._id.toString() }}
    } catch (e: any) {
        console.dir(e);
        let errors = []
        for(let field in e.errors) {
            errors.push(e.errors[field].message)
        }
        return {success: false, message: 'Error creating company ', document: null, errors : errors}
    }
}

export const saveCompanyAction = async(form: any) : Promise<ServerActionResponse> => {
    // {success: true, message: newCompany.name + ' created', document: newCompany}
    // const newCompany = await saveDocument(Company, form)
    // return {success: newCompany?._id ?  true : false, message: newCompany?.message ? 'error' : 'created', document: newCompany}
    await dbConnect()
    revalidatePath('/')
    try {
        const newCompany = await Company.create(form)
        return {success: true, message: newCompany.name + ' created', document: newCompany}
    } catch (e: any) {
        console.dir(e);
        let errors = []
        for(let field in e.errors) {
            errors.push(e.errors[field].message)
        }
        return {success: false, message: 'error', document: null, errors : errors}
    }
}

export const deleteCompanyAction = async(id: any) : Promise <ServerActionResponse> => {
    await dbConnect()
    try {
        if(id !== DEFAULT_COMPANY) {
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