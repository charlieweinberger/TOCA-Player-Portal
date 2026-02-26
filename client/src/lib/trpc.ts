import { QueryClient } from "@tanstack/react-query";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import type { AppRouter } from "../../../server/src/trpc";

export const queryClient = new QueryClient();

const getClerkToken = async () => {
  const clerk = (
    window as Window & {
      Clerk?: { session?: { getToken: () => Promise<string | null> } };
    }
  ).Clerk;

  if (!clerk?.session) {
    return null;
  }

  return clerk.session.getToken();
};

const trpcClient = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/trpc",
      maxURLLength: 2083,
      headers: async () => {
        const token = await getClerkToken();
        return token ? { Authorization: `Bearer ${token}` } : {};
      },
    }),
  ],
});

export const trpc = createTRPCOptionsProxy<AppRouter>({
  client: trpcClient,
  queryClient,
});
