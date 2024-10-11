import { DEFAULT_COMPANY } from "@/actions/const";
import mongoose, { Schema, Document, SchemaTypeOptions } from "mongoose"


export interface Amortization extends Document {
    // borrowers: [],
    // borrowers_details: [],
    company_id: Schema.Types.ObjectId,
    project_id : Schema.Types.ObjectId,
    block_id: Schema.Types.ObjectId,
    lot_id : Schema.Types.ObjectId,
    realty_id: Schema.Types.ObjectId,
    agent_id:Schema.Types.ObjectId,
    area: Number,
    price_per_sqm:Number,
    tcp:Number,
    down_payment:Number,
    discount_percent:Number,
    discount_percent_amount : Number,
    reservation:Number,
    lot_condition: String,
    balance:Number,
    monthly:Number,
    terms:Number,
    years: Number,
    active?: Boolean
}

const amortSchema = new Schema<Amortization>({
    // borrowers: [{ type : Schema.Types.ObjectId, ref: "User"}],
    // borrowers_details: [{type: {} }],
    company_id : { type : Schema.Types.ObjectId, ref: "Company", default: DEFAULT_COMPANY },
    project_id : { type : Schema.Types.ObjectId, ref: "Project"},
    block_id: { type : Schema.Types.ObjectId, ref: "Block"},
    lot_id : { type : Schema.Types.ObjectId, ref: "Lot"},
    realty_id: { type : Schema.Types.ObjectId, ref: "Realty", default:null},
    agent_id: { type : Schema.Types.ObjectId, required : true , ref: "User"},
    area: {type: Number},
    price_per_sqm: {type: Number},
    tcp: {type: Number},
    down_payment: {type: Number},
    discount_percent: {type: Number},
    discount_percent_amount : {type: Number},
    reservation : {type: Number},
    lot_condition: {type: String},
    balance: {type: Number},
    monthly: {type: Number},
    terms: {type: Number},
    years: {type: Number},
    active: {type: Boolean, default: true}
},{
    timestamps : true,
    toJSON: { virtuals: true },
});
amortSchema.virtual('borrowers',{
    ref:"AmortizationBorrower",
    localField:"_id",
    foreignField:"amortization_id"
})
// amortSchema.index({'email' : 'text','first_name': 'text','middle_name' : 'text', 'last_name' : 'text'})
export default mongoose.models?.Amortization || mongoose.model<Amortization>("Amortization",amortSchema)