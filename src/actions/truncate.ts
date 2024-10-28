"use server"

import dbConnect from "@/lib/mongodb"
import { auth } from "@/lib/nextAuthOptions"
import { ADMINS_USER_IDS, DEFAULT_COMPANY, DEFAULT_USER_IDS } from "./const"
import Project from "@/models/projects"
import Company from "@/models/companies"
import Amortization from "@/models/amortizations"
import AmortizationBorrower from "@/models/amortization_borrowers"
import AmortizationSchedule from "@/models/amortization_schedules"
import Block from "@/models/blocks"
import Lot from "@/models/lots"
import Realty from "@/models/realties"
import User from "@/models/users"
import EquitySchedule from "@/models/equity_schedules"

async function isAdmin(){
    let user = await auth()
    return ADMINS_USER_IDS.includes(user?.user_id+"")
}

export const truncateProject = async() => {
    await dbConnect()
    if(await isAdmin()) {
        await Project.deleteMany({})
        await truncateAmortizations()
        await truncateBlocks()
        await truncateLots()
    }
}

export const truncateCompanies = async() => {
    await dbConnect()
    if(await isAdmin()) {
        await Company.deleteMany({_id: {$ne: DEFAULT_COMPANY}})
    }
}

export const truncateAmortizations = async() => {
    await dbConnect()
    if(await isAdmin()) {
        await Amortization.deleteMany({})
        await AmortizationBorrower.deleteMany({})
        await AmortizationSchedule.deleteMany({})
        await EquitySchedule.deleteMany({})
    }
}

export const truncateBlocks = async() => {
    await dbConnect()
    if(await isAdmin()) {
        await Block.deleteMany({})
    }
}

export const truncateLots = async() => {
    await dbConnect()
    if(await isAdmin()) {
        await Lot.deleteMany({})
    }
}

export const truncateRealties = async() => {
    await dbConnect()
    if(await isAdmin()) {
        await Realty.deleteMany({})
    }
}

export const truncateUsers = async() => {
    await dbConnect()
    if(await isAdmin()) {
        await User.deleteMany({_id: {$nin : DEFAULT_USER_IDS }})
    }
}


