import { DEFAULT_COMPANY } from "@/actions/const";
import mongoose, { Schema, Document, SchemaTypeOptions } from "mongoose"


export interface User extends Document {
    company_id: Schema.Types.ObjectId,
    spouse_user_id?: Schema.Types.ObjectId,
    realty_id?: Schema.Types.ObjectId,
    first_name: string,
    middle_name?: string,
    last_name: string,
    address?: string,
    region?: string,
    province?: string,
    city?: string,
    barangay?: string,
    zip?: string,
    gender?: string,
    civil_status?: string,
    password? : string,
    email: string,
    phone?: string,
    account_type: string,
    tin?: string,
    tin_issuance?: string,
    verified?: boolean,
    references: [],
    active?: boolean
}

const userSchema = new Schema<User>({
    company_id : { type : Schema.Types.ObjectId, ref: "Company", default: DEFAULT_COMPANY },
    spouse_user_id: {type: Schema.Types.ObjectId, ref : "User" },
    realty_id: {type: Schema.Types.ObjectId, ref : "Realty" },
    first_name: {type : String, required: true},
    middle_name : {type : String},
    last_name : {type : String, required: true},
    address: {type : String},
    region: {type : String},
    province: {type : String},
    city: {type : String},
    barangay: {type : String},
    zip: {type : String},
    gender: {type : String},
    civil_status: {type : String},
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
    verified: {type : Boolean, default: false},
    active: {type : Boolean, default: true},
    references: [{type : {}}] // {name: "", relationship: "", contact: ""}
},{
    timestamps : true
});
userSchema.virtual('fullName').get(function(){ return this.first_name + ' ' + this.middle_name+ ' ' + this.last_name })
userSchema.index({'email' : 'text','first_name': 'text','middle_name' : 'text', 'last_name' : 'text'})
export default mongoose.models?.User || mongoose.model<User>("User",userSchema)