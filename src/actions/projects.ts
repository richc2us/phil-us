'use server';
import dbConnect from "@/lib/mongodb";
import  Project  from "@/models/projects"
import { revalidatePath } from "next/cache";
import { ServerActionResponse } from "@/types/server-action-reply";
import { auth } from "@/lib/nextAuthOptions";
import { ADMINS_USER_IDS } from "./const";

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
        const newDocument = await Project.create( {...state } )
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

export const updateProject = async(form:any) => {
    await dbConnect()
    try {
        const document = await Project.findByIdAndUpdate( form.id , { ...form })
        if(document) {
            revalidatePath("/")
            return {success: true, message:'updated', document : {} }
        }
        return {success: false, message: 'error updating', document : {} }
    } catch (e: any) {
        console.dir(e);
        let errors = []
        for(let field in e.errors) {
            errors.push(e.errors[field].message)
        }

        if(errors.length == 0) {
            errors.push(e.toString())
        }
        return {success: false, message: 'Error updating project', document: null, errors : errors}
    }
}

export const deleteProjectAction = async(id: any, isActive : boolean = false) : Promise <ServerActionResponse> => {
    await dbConnect()
    try {
        // await Project.deleteOne({_id: id})
        await Project.updateOne({_id : id}, {active: isActive})
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