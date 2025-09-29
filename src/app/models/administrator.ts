import mongoose, { model, models, Schema } from "mongoose";

export interface IAdministrator extends mongoose.Document {
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

const AdministratorSchema = new Schema<IAdministrator>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const Administrator =
  models.Administrator ||
  model<IAdministrator>("Administrator", AdministratorSchema);

export default Administrator;
