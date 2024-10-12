import { DEFAULT_COMPANY } from "@/actions/const";
import mongoose, { Schema, Document } from "mongoose"


export interface File extends Document {
    company_id: Schema.Types.ObjectId,
    created_by:Schema.Types.ObjectId,
    name: String,
    extension:String,
    size: Number,
    path:String,
    remark: String,
    active?: boolean,
}

const fileSchema = new Schema<File>({
    company_id : { type : Schema.Types.ObjectId, ref: "Company", default: DEFAULT_COMPANY },
    created_by: {type: Schema.Types.ObjectId, ref : "User" },
    name : {type : String, required: true},
    extension: {type : String, required: true},
    size: {type : Number, required: true},
    path: {type : String, required: true},
    remark: {type : String},
    active: {type : Boolean, default: true},
},{
    timestamps : true
});
// userSchema.index({'email' : 'text','first_name': 'text','middle_name' : 'text', 'last_name' : 'text'})
export default mongoose.models?.File || mongoose.model<File>("File",fileSchema)