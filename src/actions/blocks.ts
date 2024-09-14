'use server';
import dbConnect from "@/lib/mongodb";
import  Block  from "@/models/blocks"
import { revalidatePath } from "next/cache";
import { ServerActionResponse } from "@/types/server-action-reply";

export const getProjectBlocks = async(project_id : string) => {
    await dbConnect()
    revalidatePath('/')
    return await Block.find({project_id:project_id})
}

export const getBlock = async(id: string) => {
    await dbConnect()
    revalidatePath('/')
    return await Block.findById(id)
}
export async function saveBlockAction(state: any) {
    await dbConnect()
    try {
        const document = await Block.create({...state})
        revalidatePath("/")
        return {success: true, message: document.name + ' created', document : { id: document._id }}
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


export const deleteBlockAction = async(id: any) : Promise <ServerActionResponse> => {
    await dbConnect()
    try {
        await Block.deleteOne({_id: id})
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