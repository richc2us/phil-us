import mongoose, {Schema} from "mongoose";


export interface Company extends mongoose.Document {
    name: string,
    address: string,
    address2: string,
    description: string,
    projects:[Schema.Types.ObjectId]
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
    },
    projects: [{
        type: Schema.Types.ObjectId , ref: "Project"
    }]
}, {
    timestamps : true
})

export default mongoose.models?.Company || mongoose.model<Company>("Company", companySchema)