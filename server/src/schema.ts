import { z } from "zod";

export const profileSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string(),
  gender: z.enum(["Male", "Female"]),
  dob: z.string(),
  centerName: z.string(),
  createdAt: z.string(),
});

export const trainingSessionSchema = z.object({
  id: z.string(),
  playerId: z.string(),
  trainerName: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  numberOfBalls: z.number(),
  bestStreak: z.number(),
  numberOfGoals: z.number(),
  score: z.number(),
  avgSpeedOfPlay: z.number(),
  numberOfExercises: z.number(),
});

export const appointmentSchema = z.object({
  id: z.string(),
  playerId: z.string(),
  trainerName: z.string(),
  startTime: z.string(),
  endTime: z.string(),
});

export type Profile = z.infer<typeof profileSchema>;
export type TrainingSession = z.infer<typeof trainingSessionSchema>;
export type Appointment = z.infer<typeof appointmentSchema>;
