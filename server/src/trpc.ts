import { z } from "zod";
import { TRPCError, initTRPC } from "@trpc/server";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { readFile } from "fs/promises";
import {
  profileSchema,
  trainingSessionSchema,
  appointmentSchema,
  Profile,
  TrainingSession,
  Appointment,
} from "./schema";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize tRPC
const t = initTRPC.create();

export const router = t.router({
  // Procedure to get profile by email
  getProfileByEmail: t.procedure
    .input(z.object({ email: z.string().email() }))
    .query(async ({ input }) => {
      // Read profiles.json directly using Node.js fs
      const profilesPath = resolve(__dirname, "../../data/profiles.json");
      const data = await readFile(profilesPath, "utf-8");
      const profiles = JSON.parse(data);

      const profile = profiles.find(
        (p: Profile) => p.email.toLowerCase() === input.email.toLowerCase(),
      );

      if (!profile) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Profile not found",
        });
      }

      return profileSchema.parse(profile);
    }),
  getTrainingSessionsByPlayerId: t.procedure
    .input(z.object({ playerId: z.string() }))
    .query(async ({ input }) => {
      const sessionsPath = resolve(
        __dirname,
        "../../data/trainingSessions.json",
      );
      const data = await readFile(sessionsPath, "utf-8");
      const sessions = JSON.parse(data) as TrainingSession[];

      const playerSessions = sessions.filter(
        (session) => session.playerId === input.playerId,
      );

      return z.array(trainingSessionSchema).parse(playerSessions);
    }),
  getAppointmentsByPlayerId: t.procedure
    .input(z.object({ playerId: z.string() }))
    .query(async ({ input }) => {
      const appointmentsPath = resolve(
        __dirname,
        "../../data/appointments.json",
      );
      const data = await readFile(appointmentsPath, "utf-8");
      const appointments = JSON.parse(data) as Appointment[];

      const playerAppointments = appointments.filter(
        (appointment) => appointment.playerId === input.playerId,
      );

      return z.array(appointmentSchema).parse(playerAppointments);
    }),
  getTrainingSessionById: t.procedure
    .input(z.object({ sessionId: z.string() }))
    .query(async ({ input }) => {
      const sessionsPath = resolve(
        __dirname,
        "../../data/trainingSessions.json",
      );
      const data = await readFile(sessionsPath, "utf-8");
      const sessions = JSON.parse(data) as TrainingSession[];

      const session = sessions.find((item) => item.id === input.sessionId);

      if (!session) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Training session not found",
        });
      }

      return trainingSessionSchema.parse(session);
    }),
});

export type AppRouter = typeof router;
