import { z } from "zod";
import { TRPCError, initTRPC } from "@trpc/server";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { readFile } from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define the profile schema
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

export type Profile = z.infer<typeof profileSchema>;

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
});

export type AppRouter = typeof router;
