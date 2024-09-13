'use server';
import dbConnect from "@/lib/mongodb";
import  User  from "@/models/users"
import  Spouse  from "@/models/spouses"
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
    const user  = await User.find({email: email})
    return {success: user.length > 0 , message: user.length > 0 ? 'Email already in used' : "Email is unused"}
}

export async function saveBuyerAction(state: any) {
    await dbConnect()
    try {
        let buyer = null
        let spouse = null

        buyer = await User.create( {...state , account_type: "buyer"} )

        if(state.create_spouse_user) { // create spouse as user
            if(state.spouse) {
                spouse = await User.create( {...state.spouse , account_type: "buyer"} )
                await User.updateOne({ _id: buyer._id }, { spouse_id: spouse._id });
            }
        } else {
            if(state.spouse && state.spouse?.email.length > 0) {
                spouse = await Spouse.create( {...state.spouse, spouse_id : buyer._id } )
            }
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


export const deleteBuyerAction = async(id: any) : Promise <ServerActionResponse> => {
    await dbConnect()
    try {
        await User.deleteOne({_id: id})
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