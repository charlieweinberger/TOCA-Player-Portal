import mongoose, { Schema } from "mongoose";

export interface ProfileDocument {
  id: string;
  clerkUserId?: string | null;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  gender: "Male" | "Female";
  dob: string;
  centerName: string;
  createdAt: string;
}

const ProfileSchema = new Schema<ProfileDocument>(
  {
    id: { type: String, required: true, unique: true, index: true },
    clerkUserId: { type: String, default: null, index: true },
    email: { type: String, required: true, index: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    dob: { type: String, required: true },
    centerName: { type: String, required: true },
    createdAt: { type: String, required: true },
  },
  {
    versionKey: false,
  },
);

export const ProfileModel =
  mongoose.models.Profile || mongoose.model<ProfileDocument>("Profile", ProfileSchema);
