import { z } from "zod";
import { TRPCError, initTRPC } from "@trpc/server";
import { createClerkClient, verifyToken } from "@clerk/backend";
import {
  profileSchema,
  trainingSessionSchema,
  appointmentSchema,
} from "./schema";
import { ProfileModel, TrainingSessionModel, AppointmentModel } from "./models";

type Context = {
  userId: string | null;
};

export async function createContext({
  req,
}: {
  req: Request;
}): Promise<Context> {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.slice("Bearer ".length)
    : null;

  if (!token) {
    return { userId: null };
  }

  try {
    const { sub } = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });

    return { userId: sub ?? null };
  } catch {
    return { userId: null };
  }
}

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

const t = initTRPC.context<Context>().create();

const requireAuth = t.middleware(({ ctx, next }) => {
  if (!ctx.userId) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Authentication required",
    });
  }

  return next({ ctx: { ...ctx, userId: ctx.userId } });
});

const protectedProcedure = t.procedure.use(requireAuth);

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

async function resolveProfileForUser(userId: string) {
  const existing = await ProfileModel.findOne({ clerkUserId: userId }).lean();
  if (existing) {
    return existing;
  }

  const user = await clerkClient.users.getUser(userId);
  const email =
    user.primaryEmailAddress?.emailAddress ??
    user.emailAddresses.find(
      (address: { id: string; emailAddress: string }) =>
        address.id === user.primaryEmailAddressId,
    )?.emailAddress ??
    user.emailAddresses[0]?.emailAddress;

  if (!email) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "No email found for Clerk user",
    });
  }

  const match = await ProfileModel.findOne({
    email: { $regex: new RegExp(`^${escapeRegExp(email)}$`, "i") },
  });

  if (!match) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Profile not found for this user",
    });
  }

  match.clerkUserId = userId;
  await match.save();

  return match.toObject();
}

export const router = t.router({
  getMyProfile: protectedProcedure.query(async ({ ctx }) => {
    const profile = await resolveProfileForUser(ctx.userId);
    return profileSchema.parse(profile);
  }),
  getMyTrainingSessions: protectedProcedure.query(async ({ ctx }) => {
    const profile = await resolveProfileForUser(ctx.userId);
    const sessions = await TrainingSessionModel.find({ playerId: profile.id })
      .sort({ startTime: 1 })
      .lean();
    return z.array(trainingSessionSchema).parse(sessions);
  }),
  getMyAppointments: protectedProcedure.query(async ({ ctx }) => {
    const profile = await resolveProfileForUser(ctx.userId);
    const appointments = await AppointmentModel.find({ playerId: profile.id })
      .sort({ startTime: 1 })
      .lean();
    return z.array(appointmentSchema).parse(appointments);
  }),
  getMyTrainingSessionById: protectedProcedure
    .input(z.object({ sessionId: z.string() }))
    .query(async ({ input, ctx }) => {
      const profile = await resolveProfileForUser(ctx.userId);
      const session = await TrainingSessionModel.findOne({
        id: input.sessionId,
        playerId: profile.id,
      }).lean();

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
