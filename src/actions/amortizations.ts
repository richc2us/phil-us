'use server';
import dbConnect from "@/lib/mongodb";
import  Amortization  from "@/models/amortizations"
import { revalidatePath } from "next/cache";
import { ServerActionResponse } from "@/types/server-action-reply";
import AmortizationBorrower from "@/models/amortization_borrowers";
import AmortizationSchedule from "@/models/amortization_schedules";
import Project from "@/models/projects";
import Block from "@/models/blocks";
import Lot from "@/models/lots";
import Realty from "@/models/realties";
import User from "@/models/users";
import EquitySchedule from "@/models/equity_schedules";
import { Session } from "inspector/promises";

export const getAmortizations = async() => {
    await dbConnect()
    await Project.findOne()
    await Block.findOne()
    await Lot.findOne()
    await Realty.findOne()
    await User.findOne()
    revalidatePath('/')
    return await Amortization.find()
    .populate([
        {path:'project_id'},
        {path:'block_id'},
        {path:'lot_id'},
        {path:'realty_id'},
        {path:'agent_id'},
        {
            path:'borrowers',
            populate:{
                path: 'user'
            }
        },
    ])
}

export const getAmortization = async(id: string) => {
    await dbConnect()
    await Project.findOne()
    await Block.findOne()
    await Lot.findOne()
    await Realty.findOne()
    await User.findOne()
    revalidatePath('/')
    return await Amortization.findById(id)
    .populate([
        {path:'project_id'},
        {path:'block_id'},
        {path:'lot_id'},
        {path:'realty_id'},
        {path:'agent_id'},
        {
            path:'borrowers',
            populate:{
                path: 'user'
            }
        },
    ])
}

export const getBuyerAmortizations = async(buyer_id:string) => {
    await dbConnect()
    await Project.findOne()
    await Block.findOne()
    await Lot.findOne()
    await Realty.findOne()
    await User.findOne()
    revalidatePath('/')
    let borrowers = await AmortizationBorrower.find({user_id: buyer_id}).select("amortization_id")
    let arrayBorrowers:any[] = []
    borrowers.map( (b:any) => arrayBorrowers.push(b.amortization_id.toString()) )
    return await Amortization.find({_id: {$in : arrayBorrowers} })
    .populate([
        {path:'project_id'},
        {path:'block_id'},
        {path:'lot_id'},
        {path:'realty_id'},
        {path:'agent_id'},
        {
            path:'borrowers',
            populate:{
                path: 'user'
            }
        },
    ])
}

export const getAmortizationSchedules = async(id: string) => {
    await dbConnect()
    return await AmortizationSchedule.find({amortization_id : id})
}

export async function updateAmortizationAction(form: any) {
    await dbConnect()
    try {
        const document = await Amortization.findById(form.id)
        console.dir(document)
        if(document) {
            document.name = form.name
            document.address = form.address
            document.address2 = form.address2
            document.description = form.description
            document.contact_number = form.contact_number
            document.tin = form.tin
            document.commission_percent = form.commission_percent
            document.save()
            revalidatePath("/")
            return {success: true, message: document.name + ' updated', document : { id: document?._id.toString() }}
        }
        return {success: false, message: 'error updating', document : { id: document?._id.toString() }}
    } catch (e: any) {
        console.dir(e);
        let errors = []
        for(let field in e.errors) {
            errors.push(e.errors[field].message)
        }
        return {success: false, message: 'Error creating company ', document: null, errors : errors}
    }
}

export async function saveAmortizationAction(state: any) {
    const db = await dbConnect()
    const session = await db.startSession()
    session.startTransaction()

    try {
        const newDocument = await Amortization.create( {...state } )
        if(newDocument) {
            await Lot.updateOne({_id: state.lot_id},{status: "sold", price_per_sqm: state.price_per_sqm, amortization_id: newDocument._id })

            state.borrowers.map( async(borrower:any) => {
                const {_id ,...rest} = borrower
                await AmortizationBorrower.create({
                    ...rest,
                    amortization_id : newDocument._id,
                    user_id : borrower._id,
                })
            })

            state.schedules.map( async(schedule:any) => {
                await AmortizationSchedule.create({
                    ...schedule,
                    amortization_id : newDocument._id,
                })
            })

            state.equity.map( async(e:any) => {
                await EquitySchedule.create({
                    ...e,
                    amortization_id : newDocument._id,
                })
            })
            session.commitTransaction()
            session.endSession()
        }

        revalidatePath("/")
        return {success: newDocument ? true : false, message: newDocument ? 'Amortization created' : "Error", document : {id: newDocument._id.toString()}}
    } catch (e: any) {
        session.abortTransaction()
        let errors = []
        for(let field in e.errors) {
            errors.push(e.errors[field].message)
        }
        console.dir(errors);
        return {success: false, message: 'Error creating', document: null, errors : errors}
    }
}


// export const cancelAmortization = async(id: any) => {
//     await dbConnect()
//     try {
//         await Lot.updateOne({_id: id}, {amortization_id: null,status:"available"})
//     } catch (e:any) {
//         let errors = []
//         console.dir(e);
//         for(let field in e.errors) {
//             errors.push(e.errors[field].message)
//         }
//         return {success: false, message: 'Error in deleting', document: null, errors: errors}
//     }
// }

export const deleteAmortizationAction = async(id: any, isActive:boolean = false) : Promise <ServerActionResponse> => {
    await dbConnect()
    try {
        // await Amortization.deleteOne({_id: id})
        await Amortization.updateOne({_id : id}, {active: isActive})
        // await AmortizationBorrower.deleteMany({amortization_id: id})
        // await AmortizationSchedule.deleteMany({amortization_id: id})
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