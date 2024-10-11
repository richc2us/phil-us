'use server';
import dbConnect from "@/lib/mongodb";
import  User  from "@/models/users"
import { revalidatePath } from "next/cache";
import { ServerActionResponse } from "@/types/server-action-reply";
export const getAgents = async() => {
    await dbConnect()
    revalidatePath('/')
    return await User.find({account_type: "agent"})
}

export const getAgent = async(id: string) => {
    await dbConnect()
    revalidatePath('/')
    return await User.findById(id)
}

export const checkEmailExists = async(email:string) : Promise<ServerActionResponse> => {
    const user  = await User.findOne({email: email})
    return {success: user && user.email.length > 0 , message: user && user.email.length > 0 ? 'Email already in used' : "Email is unused", document: [  user && user.email.length > 0 ?  { first_name: user.first_name, middle_name: user.middle_name, last_name : user.last_name ,email: user.email } : {} ] }
}

export async function saveAgentAction(state: any) {
    await dbConnect()
    try {
        let document = null
        document = await User.create( {...state , account_type: "agent"} )
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

export async function updateAgentAction(state: any) {
    await dbConnect()
    try {
        await User.updateOne({_id: state.id}, {...state})
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


export const deleteAgentAction = async(id: any, isActive : boolean = false) : Promise <ServerActionResponse> => {
    await dbConnect()
    try {
        // await User.deleteOne({_id: id, account_type: "agent" })
        await User.updateOne({_id : id}, {active: isActive})
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