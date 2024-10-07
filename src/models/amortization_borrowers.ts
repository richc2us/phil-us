import { DEFAULT_COMPANY } from "@/actions/const";
import mongoose, { Schema, Document, SchemaTypeOptions } from "mongoose"


export interface AmortizationBorrower extends Document {
    company_id: Schema.Types.ObjectId,
    amortization_id : Schema.Types.ObjectId,
    user_id: Schema.Types.ObjectId,
    email : String,
    phone : String,
    address : String
    tin : String
}

const AmortizationBorrowerSchema = new Schema<AmortizationBorrower>({
    company_id : { type : Schema.Types.ObjectId, ref: "Company", default: DEFAULT_COMPANY },
    amortization_id : { type : Schema.Types.ObjectId, ref: "Amortization", required : true},
    user_id: { type : Schema.Types.ObjectId, required : true , ref: "User"},
    email : {type: String, required : true},
    phone : {type: String, required : true},
    address : {type: String, required : true},
    tin : {type: String, required : true},
},{
    timestamps : true,
    toJSON: { virtuals: true },
});
// AmortizationBorrowerSchema.index({'email' : 'text','first_name': 'text','middle_name' : 'text', 'last_name' : 'text'})
AmortizationBorrowerSchema.virtual('user',{
    ref:"User",
    localField:"user_id",
    foreignField:"_id",
    justOne: true
})
export default mongoose.models?.AmortizationBorrower || mongoose.model<AmortizationBorrower>("AmortizationBorrower",AmortizationBorrowerSchema, 'amortization_borrowers')