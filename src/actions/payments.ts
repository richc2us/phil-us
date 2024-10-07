'use server';
import dbConnect from "@/lib/mongodb";
import  AcceptablePayment  from "@/models/acceptable_payments"
import { revalidatePath } from "next/cache";
import { ServerActionResponse } from "@/types/server-action-reply";
import { auth } from "@/lib/nextAuthOptions";

export const getAcceptablePaymentsAction = async() => {
    await dbConnect()
    revalidatePath('/')
    return await AcceptablePayment.find().populate('created_by')
}

export const getAcceptablePaymentsNewAction = async() => {
    await dbConnect()
    revalidatePath('/')
    return await AcceptablePayment.find()
}

export const getAcceptablePaymentAction = async(id: string) => {
    await dbConnect()
    revalidatePath('/')
    return await AcceptablePayment.findById(id)
}

export async function saveAcceptablePaymentsAction(state: any) {
    await dbConnect()
    try {
        let document = null
        let user  = await auth()
        document = await AcceptablePayment.create( {...state , created_by: user?.user_id } )
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

export async function updateAcceptablePaymentsAction(state: any) {
    await dbConnect()
    try {
        await AcceptablePayment.updateOne({_id: state.id}, {...state})
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


export const deleteAcceptablePaymentsAction = async(id: any) : Promise <ServerActionResponse> => {
    await dbConnect()
    try {
        await AcceptablePayment.deleteOne({_id: id})
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