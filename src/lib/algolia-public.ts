"use client";
import { liteClient } from "algoliasearch/lite";

export const algoliaPublicClient = liteClient(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_PUBLIC_KEY!
);
