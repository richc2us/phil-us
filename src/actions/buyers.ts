'use server';
import dbConnect from "@/lib/mongodb";
import  User  from "@/models/users"
import { revalidatePath } from "next/cache";
import { ServerActionResponse } from "@/types/server-action-reply";
export const getBuyers = async() => {
    await dbConnect()
    revalidatePath('/')
    return await User.find({account_type: 'buyer'})
}

export const getBuyer = async(id: string) => {
    await dbConnect()
    revalidatePath('/')
    return await User.findById(id)
}

export const checkEmailExists = async(email:string) : Promise<ServerActionResponse> => {
    const user  = await User.findOne({email: email})
    return {success: user && user.email.length > 0 , message: user && user.email.length > 0 ? 'Email already in used' : "Email is unused", document: [  user && user.email.length > 0 ?  { first_name: user.first_name, middle_name: user.middle_name, last_name : user.last_name ,email: user.email } : {} ] }
}

export async function saveBuyerAction(state: any) {
    await dbConnect()
    try {
        let buyer = null
        let spouse = null

        buyer = await User.create( {...state , account_type: "buyer"} )
        if(state.spouse.email.length) {
            spouse = await User.create( {...state.spouse , account_type: "buyer", spouse_user_id: buyer._id} )
            await User.updateOne({ _id: buyer._id }, { spouse_user_id: spouse._id });
        }
        revalidatePath("/")
        return {success: true, message: buyer.name + ' created', document : { id: buyer._id, buyer: buyer.toJSON(), spouse: spouse ? spouse.toJSON() : {} }}
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

export async function updateBuyerAction(state: any) {
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


export const deleteBuyerAction = async(id: any, isActive:boolean = false) : Promise <ServerActionResponse> => {
    await dbConnect()
    try {
        // await User.deleteOne({_id: id, account_type: "buyer" })
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