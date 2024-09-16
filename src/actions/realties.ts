'use server';
import dbConnect from "@/lib/mongodb";
import  Realty  from "@/models/realties"
import { revalidatePath } from "next/cache";
import { ServerActionResponse } from "@/types/server-action-reply";

export const getRealties = async() => {
    await dbConnect()
    revalidatePath('/')
    return await Realty.find({})
}

export const getRealty = async(id: string) => {
    await dbConnect()
    revalidatePath('/')
    return await Realty.findById(id)
}

export async function saveRealtyAction(state: any) {
    await dbConnect()
    try {
        const newDocument = await Realty.create( {...state } )
        revalidatePath("/")
        return {success: true, message: newDocument.name + ' created', document : {id: newDocument._id.toString()}}
    } catch (e: any) {
        let errors = []
        for(let field in e.errors) {
            errors.push(e.errors[field].message)
        }
        console.dir(errors);
        return {success: false, message: 'Error creating', document: null, errors : errors}
    }
}

export const deleteRealtyAction = async(id: any) : Promise <ServerActionResponse> => {
    await dbConnect()
    try {
        await Realty.deleteOne({_id: id})
        revalidatePath("/");
        return {success: true, message: 'deleted', document: null}
    } catch (e:any) {
        let errors = []
        console.dir(e);
        for(let field in e.errors) {
            errors.push(e.errors[field].message)
        }
        return {success: false, message: 'Error in deleting', document: null, errors: errors}
    }
}