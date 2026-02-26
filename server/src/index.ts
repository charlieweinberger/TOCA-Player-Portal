import "dotenv/config";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { trpcServer } from "@hono/trpc-server";
import { router, createContext } from "./trpc";
import { connectToDatabase } from "./db";

const app = new Hono();

// Enable CORS for localhost development
app.use(
  "/trpc/*",
  cors({
    origin: "http://localhost:5173",
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  }),
);

// tRPC endpoint
app.use(
  "/trpc/*",
  trpcServer({
    router,
    createContext,
  }),
);

// Health check endpoint
app.get("/health", (c) => {
  return c.json({ status: "ok" });
});

const PORT = 3000;

async function startServer() {
  await connectToDatabase();

  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📡 tRPC endpoint at http://localhost:${PORT}/trpc`);

  serve({
    fetch: app.fetch,
    port: PORT,
  });
}

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
