import { DEFAULT_COMPANY } from "@/actions/const"
import mongoose, { Schema, Document } from "mongoose"

export interface Realty extends Document {
    company_id: Schema.Types.ObjectId,
    name: string,
    address: string,
    tin: string,
    lead_id?: Schema.Types.ObjectId,
    commission_percent?: Number,
    description?: string,
    contact_number?: string
    address2?: string,
    active?: boolean
}

const realSchema = new Schema<Realty>({
    company_id : { type : Schema.Types.ObjectId, ref: "Company", default: DEFAULT_COMPANY },
    lead_id : { type : Schema.Types.ObjectId, ref: "User" },
    name : {
        type: String,
        required: [true, "Please provide a name"],
        maxlength:[200, "Name cannot be more than 200 characters"]
    },
    address: {
        type: String,
        required: [true, "Please provide address"],
        maxlength:[200, "Address cannot be more than 200 characters"]
    },
    tin: {
        type: String,
        required: [true, "Please provide tin number"],
        maxlength:[200, "Tin cannot be more than 200 characters"]
    },
    description: {
        type: String,
    },
    commission_percent: {type: Number, default: 10},
    address2: {
        type: String,
    },
    contact_number: {
        type: String
    },
    active: {type : Boolean, default: true},

}, {
    timestamps : true,
    collection:"realties",
    toJSON: {
        virtuals: true
    }
})

export default mongoose.models?.Realty || mongoose.model<Realty>("Realty", realSchema )