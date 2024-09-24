'use server';
import dbConnect from "@/lib/mongodb";
import  Amortization  from "@/models/amortizations"
import { revalidatePath } from "next/cache";
import { ServerActionResponse } from "@/types/server-action-reply";
export const getAmortizations = async() => {
    await dbConnect()
    revalidatePath('/')
    return await Amortization.find()
}

export const getAmortization = async(id: string) => {
    await dbConnect()
    revalidatePath('/')
    return await Amortization.findById(id)
}

export async function saveAmortizationAction(state: any) {
    await dbConnect()
    try {
        let document = null
        document = await Amortization.create( {...state , account_type: "agent"} )
        revalidatePath("/")
        return {success: true, message: document.name + ' created', document : { id: document._id, buyer: document.toJSON() }}
    } catch (e: any) {
        let errors = []
        for(let field in e.errors) {
            errors.push(e.errors[field].message)
        }
        if(errors.length == 0) {
            errors.push(e.toString())
        }
        console.dir(errors);
        return {success: false, message: 'Error creating' , document: null, errors : errors}
    }
}

export async function updateAmortizationAction(state: any) {
    await dbConnect()
    try {
        await Amortization.updateOne({_id: state.id}, {...state})
        revalidatePath("/")
        return {success: true, message: 'updated', document : { ...state }}
    } catch (e: any) {
        let errors = []
        for(let field in e.errors) {
            errors.push(e.errors[field].message)
        }
        if(errors.length == 0) {
            errors.push(e.toString())
        }
        console.dir(errors);
        return {success: false, message: 'Error creating' , document: null, errors : errors}
    }
}


export const deleteAmortizationAction = async(id: any) : Promise <ServerActionResponse> => {
    await dbConnect()
    try {
        await Amortization.deleteOne({_id: id, account_type: "agent" })
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