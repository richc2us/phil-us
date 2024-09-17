import mongoose, {Schema} from "mongoose";


export interface Company extends mongoose.Document {
    name: string,
    address: string,
    address2: string,
    description: string,
}

const companySchema = new mongoose.Schema<Company>({
    name: {
        type : String,
        required : [true,"Please provide a company name"],
        maxlength:[60, "Company Name cannot be more than 60 characters"]
    },
    address: {
        type : String,
        required : [true,"Please provide an address"],
        maxlength:[60, "Company Name cannot be more than 60 characters"]
    },
    address2: {
        type : String,
        maxlength:[60, "Address Name cannot be more than 60 characters"]
    },
    description : {
        type: String,
        required: [true, "Please provide a company description"],
        maxlength:[1000, "Description cannot be more than 1000 characters"]
    }
}, {
    timestamps : true
})

export default mongoose.models?.Company || mongoose.model<Company>("Company", companySchema)