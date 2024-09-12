import { DEFAULT_COMPANY } from "@/actions/const";
import mongoose, { Schema, Document } from "mongoose"


export interface Spouse extends Document {
    company_id: Schema.Types.ObjectId,
    spouse_id: Schema.Types.ObjectId,
    first_name: string,
    middle_name?: string,
    last_name: string,
    email: string,
    phone?: string,
    tin?: string,
    tin_issuance?: string,
}

const spouseSchema = new Schema<Spouse>({
    company_id : { type : Schema.Types.ObjectId, ref: "Company", default: DEFAULT_COMPANY },
    spouse_id: {type: Schema.Types.ObjectId },
    first_name: {type : String, required: true},
    middle_name : {type : String},
    last_name : {type : String, required: true},
    email: { type: String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Email is invalid"]
    },
    phone: {type : String},
    tin: {type : String},
    tin_issuance: {type : String},
},{
    timestamps : true
});

export default mongoose.models?.Spouse || mongoose.model<Spouse>("Spouse",spouseSchema)