import mongoose, { Schema } from "mongoose";

export interface AppointmentDocument {
  id: string;
  playerId: string;
  trainerName: string;
  startTime: string;
  endTime: string;
}

const AppointmentSchema = new Schema<AppointmentDocument>(
  {
    id: { type: String, required: true, unique: true, index: true },
    playerId: { type: String, required: true, index: true },
    trainerName: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
  },
  {
    versionKey: false,
  },
);

export const AppointmentModel =
  mongoose.models.Appointment ||
  mongoose.model<AppointmentDocument>("Appointment", AppointmentSchema);
