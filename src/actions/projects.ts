'use server';
import dbConnect from "@/lib/mongodb";
import  Project  from "@/models/projects"
import { revalidatePath } from "next/cache";
import { ServerActionResponse } from "@/types/server-action-reply";
import { DEFAULT_COMPANY } from "./const";

export const getProjects = async() => {
    await dbConnect()
    revalidatePath('/')
    return await Project.find({})
}

export const getProject = async(id: string) => {
    await dbConnect()
    revalidatePath('/')
    return await Project.findById(id)
}

export async function saveProjectAction(state: any) {
    await dbConnect()
    try {
        console.dir(state)
        const newDocument = await Project.create( {...state , company_id : DEFAULT_COMPANY } )
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

export const deleteProjectAction = async(id: any) : Promise <ServerActionResponse> => {
    await dbConnect()
    try {
        await Project.deleteOne({_id: id})
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