'use server';
import dbConnect from "@/lib/mongodb";
import  Block  from "@/models/blocks"
import  Lot  from "@/models/lots"
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
        return {success: true, message: document.name + ' created', document : { id: document._id.toString() }}
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

export async function updateBlockAction(state: any) {
    await dbConnect()
    try {
        const document = await Block.findById(state.id)
        if(document) {
            document.name = state.name
            document.description = state.description
            document.save()
        }
        revalidatePath("/")
        return {success: true, message: document.name + ' updated', document : { id: document._id.toString() }}
    } catch (e: any) {
        let errors = []
        for(let field in e.errors) {
            errors.push(e.errors[field].message)
        }
        if(errors.length == 0) {
            errors.push(e.toString())
        }
        console.dir(errors);
        return {success: false, message: 'Error updating' , document: null, errors : errors}
    }
}


export const deleteBlockAction = async(id: any, isActive : boolean =  false) : Promise <ServerActionResponse> => {
    await dbConnect()
    try {
        // await Block.deleteOne({_id: id})
        await Block.updateOne({_id : id}, {active: isActive})
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

export const deleteLotAction = async(id: any, isActive : boolean =  false) : Promise <ServerActionResponse> => {
    await dbConnect()
    try {
        // await Block.deleteOne({_id: id})
        await Lot.updateOne({_id : id}, {active: isActive})
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

export const saveLotAction = async(state:any) => {
    await dbConnect()
    try {
        console.dir(state)
        const document = await Lot.create({...state })
        revalidatePath("/")
        return {success: true, message: document.name + ' created', document : { id: document._id.toString() }}
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

export const updateLotAction = async(state:any) => {
    await dbConnect()
    try {
        const document = await Lot.findById(state.id)
        if(document) {
            document.name = state.name
            document.area = state.area
            document.block_id = state.block_id
            document.price_per_sqm = state.price_per_sqm
            document.remark = state.remark
            document.save()
        }
        revalidatePath("/")
        return {success: true, message: document.name + ' updated', document : { id: document._id.toString() }}
    } catch (e: any) {
        let errors = []
        for(let field in e.errors) {
            errors.push(e.errors[field].message)
        }
        if(errors.length == 0) {
            errors.push(e.toString())
        }
        console.dir(errors);
        return {success: false, message: 'Error updating' , document: null, errors : errors}
    }
}

export const onHoldLotAction = async(state:any) => {
    await dbConnect()
    try {
        const document = await Lot.findById(state.id)
        if(document) {
            document.status = state.onhold ? "onhold" : "available"
            document.agent_id = state.onhold ? state.agent_id : null
            document.save()
        }
        revalidatePath("/")
        return {success: true, message: document.name + ' updated', document : { id: document._id.toString() }}
    } catch (e: any) {
        let errors = []
        for(let field in e.errors) {
            errors.push(e.errors[field].message)
        }
        if(errors.length == 0) {
            errors.push(e.toString())
        }
        console.dir(errors);
        return {success: false, message: 'Error updating' , document: null, errors : errors}
    }
}