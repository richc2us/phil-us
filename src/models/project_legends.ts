import mongoose, { Schema, Document } from "mongoose"


export interface ProjectLegend extends Document {
    project_id : Schema.Types.ObjectId,
    name: string,
    sold?: boolean,
    hold?: boolean
}

const lotSchema = new Schema<ProjectLegend>({
    project_id : { type : Schema.Types.ObjectId, ref: "Project" },
    name : {
        type: String,
        required: [true, "Please provide a legend name"],
        maxlength:[200, "Name cannot be more than 200 characters"]
    },
    sold: {type: Boolean},
    hold: {type: Boolean},
}, {
    timestamps : true
})

export default mongoose.models?.ProjectLegend || mongoose.model<ProjectLegend>("ProjectLegend", lotSchema )