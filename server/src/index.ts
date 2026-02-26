import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
// import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { trpcServer } from "@hono/trpc-server";
import { router } from "./trpc";

const app = new Hono();

// Enable CORS for localhost development
app.use(
  "/trpc/*",
  cors({
    origin: "http://localhost:5173",
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type"],
  }),
);

// tRPC endpoint
app.use(
  "/trpc/*",
  trpcServer({
    router,
  }),
);

// Health check endpoint
app.get("/health", (c) => {
  return c.json({ status: "ok" });
});

const PORT = 3000;

console.log(`🚀 Server running at http://localhost:${PORT}`);
console.log(`📡 tRPC endpoint at http://localhost:${PORT}/trpc`);

serve({
  fetch: app.fetch,
  port: PORT,
});
