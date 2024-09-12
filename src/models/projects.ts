import { DEFAULT_COMPANY } from "@/actions/const"
import mongoose, { Schema, Document } from "mongoose"


export interface Project extends Document {
    company_id: Schema.Types.ObjectId,
    name: string,
    address1?: string,
    address2?: string,
    region?: string,
    province?: string,
    city?: string,
    barangay?: string,
    zip?: string
    landmark?: string,
    latitude?: string,
    longitude?: string,
    original_owners?: Schema.Types.ObjectId, // linked to users
    purchase_scheme?: string,
    title_information?: string,
    legal_documentation?: string,
    restrictions?: string,
    terrane_information?: string,
    total_number_of_lots?: Number,
    date_bought?: Date,
    date_begin_selling?: Date,
    date_begin_grading?: Date,
    investment_amount?: Number,
    geographic_layer_file?: string,
    bulk_discount_scheme?: Number,
    LTS?: string,
    legends?: []
}

const projectSchema = new Schema<Project>({
    company_id : { type : Schema.Types.ObjectId, ref: "Company", default: DEFAULT_COMPANY },
    name : {
        type: String,
        required: [true, "Please provide a name"],
        maxlength:[200, "Name cannot be more than 200 characters"]
    },
    address1 : {
        type: String,
        // required: [true, "Please provide an address"],
        maxlength:[255, "Address cannot be more than 255 characters"]
    },
    address2 : {
        type: String,
        // required: [false, "Please provide an address2"],
        maxlength:[255, "Address2 cannot be more than 255 characters"]
    },
    region : {
        type: String,
        // required: [true, "Please provide an region"],
        maxlength:[255, "Region cannot be more than 255 characters"]
    },
    province : {
        type: String,
        // required: [true, "Please provide a province"],
        maxlength:[255, "Province cannot be more than 255 characters"]
    },
    city: {
        type: String,
        // required: [true, "Please provide a city"],
        maxlength:[255, "City cannot be more than 255 characters"]
    },
    barangay:  {
        type: String,
        // required: [true, "Please provide a barangay"],
        maxlength:[255, "Barangay cannot be more than 255 characters"]
    },
    zip: {
        type: String,
        // required: [true, "Please provide a zip"],
        maxlength:[255, "Zip cannot be more than 255 characters"]
    },
    landmark: {
        type: String,
        // required: [true, "Please provide a landmark"],
        maxlength:[255, "Landmark cannot be more than 255 characters"]
    },
    latitude: {
        type: String,
        // required: [true, "Please provide a latitude"],
        maxlength:[255, "Latitude cannot be more than 255 characters"]
    },
    longitude: {
        type: String,
        // required: [true, "Please provide a longitude"],
        maxlength:[255, "Longitude cannot be more than 255 characters"]
    },
    original_owners : [{ type : Schema.Types.ObjectId, ref: 'User'}],
    purchase_scheme: {
        type: String,
        // required: [true, "Please provide a purchase scheme"],
        maxlength:[255, "Purchase Scheme cannot be more than 255 characters"]
    },
    title_information: {
        type: String,
        // required: [true, "Please provide a purchase scheme"],
        maxlength:[255, "Purchase Scheme cannot be more than 255 characters"]
    },
    legal_documentation: {
        type: String,
        // required: [false, "Please provide a purchase scheme"],
        maxlength:[255, "Purchase Scheme cannot be more than 255 characters"]
    },
    restrictions: {
        type: String,
        // required: [false, "Please provide a purchase scheme"],
    },
    terrane_information: {
        type: String,
        // required: [false, "Please provide a Terrane Information"],
        maxlength:[255, "Terrane information Scheme cannot be more than 255 characters"]
    },
    total_number_of_lots: {
        type: Number,
        // required: [true, "Please provide a number of lots"],
    },
    date_bought: {
        type: Date,
    },
    date_begin_selling: {
        type: Date,
    },
    date_begin_grading: {
        type: Date,
    },
    investment_amount: {
        type: Number,
    },
    geographic_layer_file: {
        type: String,
    },
    bulk_discount_scheme: {
        type: Number,
    },
    LTS: {
        type: String,
    },
    legends:[
        {type: String,}
    ]
}, {
    timestamps : true
})

export default mongoose.models?.Project || mongoose.model<Project>("Project", projectSchema )