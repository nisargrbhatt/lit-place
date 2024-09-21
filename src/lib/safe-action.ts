import { currentUser } from "@clerk/nextjs/server";
import { createSafeActionClient } from "next-safe-action";

const DEFAULT_SERVER_ERROR =
  "Something went wrong while executing the operation";

const actionClient = createSafeActionClient({
  handleServerError: (e) => {
    if (e instanceof ActionError) {
      return e.message;
    }

    return DEFAULT_SERVER_ERROR;
  },
});

export const unauthenticatedAction = actionClient;

export const authenticatedAction = actionClient.use(async ({ next }) => {
  const meResult = await currentUser();

  if (!meResult) {
    throw new ActionError("Session is not valid!");
  }

  return next({
    ctx: { userId: meResult.id, metadata: meResult },
  });
});

export class ActionError extends Error {}
