import { DEFAULT_COMPANY } from "@/actions/const";
import { get } from "http";
import mongoose, { Schema, Document, SchemaTypeOptions } from "mongoose"


export interface User extends Document {
    company_id: Schema.Types.ObjectId,
    spouse_user_id: Schema.Types.ObjectId,
    first_name: string,
    middle_name?: string,
    last_name: string,
    address?: string,
    region?: string,
    province?: string,
    city?: string,
    barangay?: string,
    zip?: string,
    password? : string,
    email: string,
    phone?: string,
    account_type: string,
    tin?: string,
    tin_issuance?: string,
    verified?: boolean
}

const userSchema = new Schema<User>({
    company_id : { type : Schema.Types.ObjectId, ref: "Company", default: DEFAULT_COMPANY },
    spouse_user_id: {type: Schema.Types.ObjectId, ref : "User" },
    first_name: {type : String, required: true},
    middle_name : {type : String},
    last_name : {type : String, required: true},
    address: {type : String},
    region: {type : String},
    province: {type : String},
    city: {type : String},
    barangay: {type : String},
    zip: {type : String},
    password: {type: String, select : false},
    email: { type: String,
        unique: true,
        required: [true, "Email is required"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Email is invalid"]
    },
    phone: {type : String},
    tin: {type : String},
    tin_issuance: {type : String},
    account_type:{type : String, default: 'admin'},
    verified: {type : Boolean, default: false}
},{
    timestamps : true
});
userSchema.virtual('fullName').get(function(){ return this.first_name + ' ' + this.middle_name+ ' ' + this.last_name })
export default mongoose.models?.User || mongoose.model<User>("User",userSchema)