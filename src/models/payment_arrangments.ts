import { DEFAULT_COMPANY } from "@/actions/const";
import mongoose, { Schema, Document } from "mongoose"


export interface PaymentArrangement extends Document {
    company_id: Schema.Types.ObjectId,
    payment_id: Schema.Types.ObjectId,
    amortization_schedule_id: Schema.Types.ObjectId,
    amortization_id: Schema.Types.ObjectId,
    receiver_account_id: Schema.Types.ObjectId,
    acceptable_payment_id: Schema.Types.ObjectId,
    lot_id: Schema.Types.ObjectId,
    created_by:Schema.Types.ObjectId,
    first_name: String,
    middle_name: String,
    last_name: String,
    amount: Number,
    invoice_number: String,
    remark: String,
    status: String, // submitted, verified, unverifiable
    files: [],
    active?: boolean
}

const paymentArrangementSchema = new Schema<PaymentArrangement>({
    company_id : { type : Schema.Types.ObjectId, ref: "Company", default: DEFAULT_COMPANY },
    payment_id: {type: Schema.Types.ObjectId, ref : "Payment" },
    amortization_schedule_id: {type: Schema.Types.ObjectId, ref : "AmortizationSchedule" },
    amortization_id: {type: Schema.Types.ObjectId, ref : "Amortization" },
    receiver_account_id: {type: Schema.Types.ObjectId, ref : "ReceiverAccount" },
    acceptable_payment_id: {type: Schema.Types.ObjectId, ref : "AcceptablePayment" },
    lot_id: {type: Schema.Types.ObjectId, ref : "Lot" },
    created_by: {type: Schema.Types.ObjectId, ref : "User" },
    first_name: {type: String},
    middle_name:{type: String},
    last_name: {type: String},
    amount: {type : Number, required: true},
    invoice_number: {type: String},
    remark: {type: String},
    status : {type : String},
    files: [{type: Schema.Types.ObjectId}],
    active: {type : Boolean, default: true}
},{
    timestamps : true
});

paymentArrangementSchema.index({'first_name': 'text','middle_name' : 'text', 'last_name' : 'text'})
export default mongoose.models?.PaymentArrangement || mongoose.model<PaymentArrangement>("PaymentArrangement",paymentArrangementSchema)