import mongoose, { model, models, Schema } from "mongoose";

export interface IOrganization extends mongoose.Document {
  administrator_id: mongoose.Types.ObjectId;
  org_name: string;
  created_at: Date;
  updated_at: Date;
}

const OrganizationSchema = new Schema<IOrganization>(
  {
    administrator_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Administrator",
      required: true,
    },
    org_name: {
      type: String,
      required: [true, "Organization name is required"],
      unique: true,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const Organization =
  models.Organization ||
  model<IOrganization>("Organization", OrganizationSchema);

export default Organization;
