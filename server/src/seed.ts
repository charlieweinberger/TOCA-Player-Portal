import "dotenv/config";
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { connectToDatabase } from "./db";
import { ProfileModel, TrainingSessionModel, AppointmentModel } from "./models";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dataDir = resolve(__dirname, "../../data");

async function loadJson<T>(fileName: string): Promise<T> {
  const filePath = resolve(dataDir, fileName);
  const raw = await readFile(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

async function seed() {
  await connectToDatabase();

  const profiles = await loadJson<Record<string, unknown>[]>("profiles.json");
  const trainingSessions = await loadJson<Record<string, unknown>[]>(
    "trainingSessions.json",
  );
  const appointments = await loadJson<Record<string, unknown>[]>(
    "appointments.json",
  );

  if (profiles.length) {
    const profileOps = profiles.map((profile) => {
      const { clerkUserId, ...rest } = profile as Record<string, unknown>;
      return {
        updateOne: {
          filter: { id: rest.id },
          update: {
            $set: rest,
            $setOnInsert: { clerkUserId: null },
          },
          upsert: true,
        },
      };
    });
    await ProfileModel.bulkWrite(profileOps);
  }

  if (trainingSessions.length) {
    const sessionOps = trainingSessions.map((session) => ({
      updateOne: {
        filter: { id: session.id },
        update: { $set: session },
        upsert: true,
      },
    }));
    await TrainingSessionModel.bulkWrite(sessionOps);
  }

  if (appointments.length) {
    const appointmentOps = appointments.map((appointment) => ({
      updateOne: {
        filter: { id: appointment.id },
        update: { $set: appointment },
        upsert: true,
      },
    }));
    await AppointmentModel.bulkWrite(appointmentOps);
  }

  console.log("✅ Seed complete");
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  });
