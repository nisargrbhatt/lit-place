import { algoliasearch } from "algoliasearch";

export const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.ALGOLIA_API_KEY!
);
