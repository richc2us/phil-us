import dbConnect from "@/lib/mongodb";
import {Model}  from "mongoose";
import { revalidatePath } from "next/cache";

export async function getAll(model: InstanceType<Model<any>>,filter:any = {}) {
    await dbConnect()
    revalidatePath('/')
    return model.find(filter)
}

export async function getSingleById(model: InstanceType<Model<any>>,id:any) {
    await dbConnect()
    revalidatePath('/')
    return model.findById(id)
}

export async function saveDocument(model: InstanceType<Model<any>>,form:any) {
    await dbConnect()
    revalidatePath('/')
    try {
        const newCompany = await model.create(form)
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

export async function updateDocument(model: InstanceType<Model<any>>,id:any) {
    await dbConnect()
    revalidatePath('/')
}

export async function deleteDocument(model: InstanceType<Model<any>>,id:any) {
    await dbConnect()
    revalidatePath('/')
}