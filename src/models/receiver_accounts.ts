import { DEFAULT_COMPANY } from "@/actions/const";
import mongoose, { Schema, Document } from "mongoose"


export interface ReceiverAccount extends Document {
    company_id: Schema.Types.ObjectId,
    created_by: Schema.Types.ObjectId,
    mode_of_payment: String,
    name: String,
    account_number: String,
    description?: String
}

const receiverAccountSchema = new Schema<ReceiverAccount>({
    company_id : { type : Schema.Types.ObjectId, ref: "Company", default: DEFAULT_COMPANY },
    created_by: { type : Schema.Types.ObjectId, required : true , ref: "User"},
    mode_of_payment : {type: String, required : true},
    name : {type: String, required : true},
    account_number : {type: String, required : true},
    description : {type: String},
},{
    timestamps : true
});
// amortSchema.index({'email' : 'text','first_name': 'text','middle_name' : 'text', 'last_name' : 'text'})
export default mongoose.models?.ReceiverAccount || mongoose.model<ReceiverAccount>("ReceiverAccount",receiverAccountSchema, 'receiver_accounts')