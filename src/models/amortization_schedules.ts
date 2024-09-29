import { DEFAULT_COMPANY } from "@/actions/const";
import mongoose, { Schema, Document, SchemaTypeOptions } from "mongoose"


export interface AmortizationSchedule extends Document {
    company_id: Schema.Types.ObjectId,
    amortization_id : Schema.Types.ObjectId,
    payment_id?: Schema.Types.ObjectId,
    due_date : Schema.Types.ObjectId,
    amount: Schema.Types.ObjectId,
    paid?: Boolean
}

const AmortizationScheduleSchema = new Schema<AmortizationSchedule>({
    company_id : { type : Schema.Types.ObjectId, ref: "Company", default: DEFAULT_COMPANY },
    amortization_id : { type : Schema.Types.ObjectId, ref: "Amortization", required : true},
    payment_id: { type : Schema.Types.ObjectId, ref: "Payment"},
    due_date : {type: Date, required : true},
    amount : {type: Number, required : true},
    paid : {type: Boolean, default: false}
},{
    timestamps : true
});
// amortSchema.index({'email' : 'text','first_name': 'text','middle_name' : 'text', 'last_name' : 'text'})
export default mongoose.models?.AmortizationSchedule || mongoose.model<AmortizationSchedule>("AmortizationSchedule",AmortizationScheduleSchema, 'amortization_schedules')