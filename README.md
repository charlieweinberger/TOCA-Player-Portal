# TOCA Player Portal

Player portal with authenticated access to profiles, training sessions, and appointments. The app uses a React + Vite client and a Hono + tRPC server backed by MongoDB. Authentication is handled by Clerk.

## Tech Stack

**Client**
- React 19 + TypeScript
- Vite
- TanStack Query + tRPC client
- Clerk (auth)
- Tailwind CSS

**Server**
- Node.js + TypeScript
- Hono + tRPC server
- MongoDB + Mongoose
- Zod for validation
- dotenv for config

## Project Structure

```
.
├── client/                 # React app (Vite)
│   ├── src/
│   │   ├── components/      # Shared UI components
│   │   ├── pages/           # Route pages
│   │   ├── lib/             # tRPC client + utilities
│   │   ├── App.tsx          # App routes
│   │   └── main.tsx         # App entry + Clerk provider
│   └── public/
├── server/                 # API server (Hono + tRPC)
│   ├── src/
│   │   ├── models/          # Mongoose models
│   │   ├── db.ts            # Mongo connection
│   │   ├── schema.ts        # Zod schemas
│   │   ├── trpc.ts          # tRPC router + auth
│   │   ├── seed.ts          # Seed script
│   │   └── index.ts         # Server entry
├── data/                   # Seed JSON data
├── .gitignore
└── README.md
```

## Environment Variables

Create these files locally:

**server/.env**
```
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>/<db>
CLERK_SECRET_KEY=sk_test_...
```

**client/.env**
```
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
```

## Install & Run (Dev)

From the repository root:

1) Install dependencies
```
cd server && npm install
cd ../client && npm install
```

2) Start the server (http://localhost:3000)
```
cd server && npm run dev
```

3) Start the client (http://localhost:5173)
```
cd client && npm run dev
```

## User Accounts

The MongoDB database has already been seeded with the JSON data in [data/](data/). Use the following sign-up info to log in:

| Name | Email | Password |
| ---- | ----- | -------- |
| Sabrina Williams | sabrina.williams@example.com | SabrinaWilliams |
| Morgan Johnson | morgan.johnson@example.com | MorganJohnson |
| Alex Jones | alex.jones@example.com | AlexJonesTOCA |

