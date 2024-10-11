import { DEFAULT_COMPANY } from "@/actions/const";
import mongoose, { Schema, Document } from "mongoose"


export interface AcceptablePayment extends Document {
    company_id: Schema.Types.ObjectId,
    created_by: Schema.Types.ObjectId,
    mode_of_payment: String,
    name: String,
    description?: String,
    active?: boolean
}

const acceptablePaymentSchema = new Schema<AcceptablePayment>({
    company_id : { type : Schema.Types.ObjectId, ref: "Company", default: DEFAULT_COMPANY },
    created_by: { type : Schema.Types.ObjectId, required : true , ref: "User"},
    mode_of_payment : {type: String, required : true},
    name : {type: String, required : true},
    description : {type: String},
    active: {type: Boolean, default: true}
},{
    timestamps : true
});
// amortSchema.index({'email' : 'text','first_name': 'text','middle_name' : 'text', 'last_name' : 'text'})
export default mongoose.models?.AcceptablePayment || mongoose.model<AcceptablePayment>("AcceptablePayment",acceptablePaymentSchema, 'acceptable_payments')