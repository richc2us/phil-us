'use server';
import dbConnect from "@/lib/mongodb";
import  ReceiverAccount  from "@/models/receiver_accounts"
import { revalidatePath } from "next/cache";
import { ServerActionResponse } from "@/types/server-action-reply";
import { auth } from "@/lib/nextAuthOptions";

export const getReceiverAccountsAction = async() => {
    await dbConnect()
    revalidatePath('/')
    return await ReceiverAccount.find().populate('created_by')
}

export const getReceiverAccountNewAction = async() => {
    await dbConnect()
    revalidatePath('/')
    return await ReceiverAccount.find()
}

export const getReceiverAccountAction = async(id: string) => {
    await dbConnect()
    revalidatePath('/')
    return await ReceiverAccount.findById(id)
}

export async function saveReceiverAccountAction(state: any) {
    await dbConnect()
    try {
        let document = null
        let user  = await auth()
        document = await ReceiverAccount.create( {...state , created_by: user?.user_id } )
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

export async function updateReceiverAccountAction(state: any) {
    await dbConnect()
    try {
        await ReceiverAccount.updateOne({_id: state.id}, {...state})
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


export const deleteReceiverAccountAction = async(id: any) : Promise <ServerActionResponse> => {
    await dbConnect()
    try {
        await ReceiverAccount.deleteOne({_id: id})
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