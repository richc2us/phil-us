'use server';
import dbConnect from "@/lib/mongodb";
import  Company  from "@/models/companies"
import { revalidatePath } from "next/cache";
import { ServerActionResponse } from "@/types/server-action-reply";
import { DEFAULT_COMPANY } from "./const";

export const getCompanies = async() => {
    await dbConnect()
    revalidatePath('/companies')
    return await Company.find({})
}

export const getCompany = async(id: string) => {
    await dbConnect()
    revalidatePath('/')
    return await Company.findById(id)
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