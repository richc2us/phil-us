'use server';
import  Company  from "@/models/companies"
import { revalidatePath } from "next/cache";

export const getCompanies = async() => {
    return await Company.find({})
}

export const saveCompanyAction = async(form: any) => {
    try {
        const newCompany = await Company.create(form)
        revalidatePath("/companies");
        // redirect('/companies')
        return newCompany.toString();
    } catch (error) {
        console.dir(error);
        return {message: 'error creating company'};
    }
}

export const deleteCompanyAction = async(id: any) => {
    try {
        await Company.deleteOne({_id: id})
        revalidatePath("/");
        return ('company deleted');
    } catch (error) {
        console.dir(error);
        return {message: 'error deleting company'};
    }
}