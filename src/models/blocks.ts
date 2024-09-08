import mongoose, { Schema, Document } from "mongoose"


export interface Block extends Document {
    company_id: Schema.Types.ObjectId,
    project_id : Schema.Types.ObjectId,
    name: string,
    description?: string
}

const blockSchema = new Schema<Block>({
    company_id : { type : Schema.Types.ObjectId, ref: "Company" },
    project_id : { type : Schema.Types.ObjectId, ref: "Project" },
    name : {
        type: String,
        required: [true, "Please provide a name"],
        maxlength:[200, "Name cannot be more than 200 characters"]
    },
    description: {
        type: String,
    }
}, {
    timestamps : true
})

export default mongoose.models?.Block || mongoose.model<Block>("Block", blockSchema )