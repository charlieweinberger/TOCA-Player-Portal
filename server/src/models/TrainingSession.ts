import mongoose, { Schema } from "mongoose";

export interface TrainingSessionDocument {
  id: string;
  playerId: string;
  trainerName: string;
  startTime: string;
  endTime: string;
  numberOfBalls: number;
  bestStreak: number;
  numberOfGoals: number;
  score: number;
  avgSpeedOfPlay: number;
  numberOfExercises: number;
}

const TrainingSessionSchema = new Schema<TrainingSessionDocument>(
  {
    id: { type: String, required: true, unique: true, index: true },
    playerId: { type: String, required: true, index: true },
    trainerName: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    numberOfBalls: { type: Number, required: true },
    bestStreak: { type: Number, required: true },
    numberOfGoals: { type: Number, required: true },
    score: { type: Number, required: true },
    avgSpeedOfPlay: { type: Number, required: true },
    numberOfExercises: { type: Number, required: true },
  },
  {
    versionKey: false,
  },
);

export const TrainingSessionModel =
  mongoose.models.TrainingSession ||
  mongoose.model<TrainingSessionDocument>(
    "TrainingSession",
    TrainingSessionSchema,
  );
