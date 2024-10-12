import { DEFAULT_COMPANY } from "@/actions/const";
import mongoose, { Schema, Document } from "mongoose"


export interface Payment extends Document {
    company_id: Schema.Types.ObjectId,
    amortization_id: Schema.Types.ObjectId,
    lot_id: Schema.Types.ObjectId,
    created_by:Schema.Types.ObjectId,
    amount: Number,
    status: String, // created , partial , paid
    type: String, // down or amortization
    active?: boolean,
}

const paymentSchema = new Schema<Payment>({
    company_id : { type : Schema.Types.ObjectId, ref: "Company", default: DEFAULT_COMPANY },
    amortization_id: {type: Schema.Types.ObjectId, ref : "Amortization" },
    lot_id: {type: Schema.Types.ObjectId, ref : "Lot" },
    created_by: {type: Schema.Types.ObjectId, ref : "User" },
    amount: {type : Number, required: true},
    status : {type : String},
    type : {type : String, required: true},
    active: {type : Boolean, default: true},
},{
    timestamps : true
});
// userSchema.index({'email' : 'text','first_name': 'text','middle_name' : 'text', 'last_name' : 'text'})
export default mongoose.models?.Payment || mongoose.model<Payment>("Payment",paymentSchema)