import mongoose, { Schema, Document } from "mongoose"


export interface User extends Document {
    first_name: string,
    middle_name: string,
    last_name: string,
    password : string,
    email: string,
    phone: string,
    account_type: string,
    created_at: Date,
    updated_at: Date
}

const userSchema = new Schema<User>({
    first_name: {type : String, required: true},
    middle_name : {type : String},
    last_name : {type : String, required: true},
    password: {type: String, select : false},
    email: { type: String,
        unique: true,
        required: [true, "Email is required"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Email is invalid"]
    },
    phone: {type : String},
    account_type:{type : String, default: 'admin'}
},{
    timestamps : true
});

export default mongoose.models?.User || mongoose.model<User>("User",userSchema)