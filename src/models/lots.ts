import { DEFAULT_COMPANY } from "@/actions/const"
import mongoose, { Schema, Document } from "mongoose"

// {
//    "date_of_the_month_dues": "",
// }
export interface Lot extends Document {
    company_id: Schema.Types.ObjectId,
    project_id : Schema.Types.ObjectId,
    block_id : Schema.Types.ObjectId,
    buyer_id?: Schema.Types.ObjectId,
    agent_id?: Schema.Types.ObjectId,
    transfer_by?: Schema.Types.ObjectId,
    legend?: Schema.Types.ObjectId,
    name: string,
    area: Number,
    contract_price?: Number,
    price_per_sqm?: Number,
    lot_condition?: String,
    listed_price?: Number,
    premium?: Boolean,
    discount_percentage?: Number,
    discount_price?: Number,
    status?: String,
    latitude?: String,
    longitude?: String
    date_sold?: Date,
    payment_scheme?: String,
    special_stipulation?: String
    restriction?: String,
    vat?: String,
    transfer_tax?: Number,
    buyer_seller_pay_tax?: Number,
    transfer_date?: Date,
}

const lotSchema = new Schema<Lot>({
    company_id : { type : Schema.Types.ObjectId, ref: "Company", default: DEFAULT_COMPANY },
    project_id : { type : Schema.Types.ObjectId, ref: "Project" },
    block_id : { type : Schema.Types.ObjectId, ref: "Block" },
    buyer_id : { type : Schema.Types.ObjectId, ref: "User" },
    agent_id : { type : Schema.Types.ObjectId, ref: "User" },
    transfer_by: { type : Schema.Types.ObjectId, ref: "User" },
    legend: {type: Schema.Types.ObjectId, ref : "ProjectLegend"},
    name : {
        type: String,
        required: [true, "Please provide a name"],
        maxlength:[200, "Name cannot be more than 200 characters"]
    },
    area: {type: Number},
    contract_price :  {type: Number},
    price_per_sqm:   {type: Number},
    lot_condition:   {type: String},
    listed_price:   {type: Number},
    premium:   {type: Boolean, default: false},
    discount_percentage:   {type: Number},
    discount_price:   {type: Number},
    status:   {type: String},
    latitude:   {type: String},
    longitude:   {type: String},
    date_sold:   {type: Date},
    payment_scheme:   {type: String},
    special_stipulation: {type: String},
    restriction: {type: String},
    vat: {type: Number},
    transfer_tax: {type: Number},
    buyer_seller_pay_tax: {type: Number},
    transfer_date: {type: Date}
}, {
    timestamps : true
})

export default mongoose.models?.Lot || mongoose.model<Lot>("Lot", lotSchema )