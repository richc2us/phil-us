import { DEFAULT_COMPANY } from "@/actions/const";
import mongoose, { Schema, Document, SchemaTypeOptions } from "mongoose"


export interface CommissionPercentage extends Document {
    company_id: Schema.Types.ObjectId,
    amortization_id : Schema.Types.ObjectId,
    payment_id?: Schema.Types.ObjectId,
    due_date : Schema.Types.ObjectId,
    amount: Schema.Types.ObjectId,
    paid?: Boolean
}

const commissionPercentageSchema = new Schema<CommissionPercentage>({
    company_id : { type : Schema.Types.ObjectId, ref: "Company", default: DEFAULT_COMPANY },
    amortization_id : { type : Schema.Types.ObjectId, ref: "Amortization", required : true},
    payment_id: { type : Schema.Types.ObjectId, ref: "Payment"},
    due_date : {type: Date, required : true},
    amount : {type: Number, required : true},
    paid : {type: Boolean, default: false}
},{
    toJSON: { virtuals: true },
    timestamps : true
});

export default mongoose.models?.CommissionPercentage || mongoose.model<CommissionPercentage>("CommissionPercentage", commissionPercentageSchema, 'commission_percentage')