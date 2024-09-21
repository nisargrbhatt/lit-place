"use client";
import { liteClient as algoliasearch } from "algoliasearch/lite";
import "instantsearch.css/themes/satellite.css";
import { Hits, InstantSearch, SearchBox, Configure } from "react-instantsearch";

import { Hit } from "./Hit";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_PUBLIC_KEY!
);

export const Search = () => (
  <InstantSearch searchClient={searchClient} indexName="literature">
    <Configure hitsPerPage={5} />
    <div className="ais-InstantSearch">
      <SearchBox />
      <Hits hitComponent={Hit} />
    </div>
  </InstantSearch>
);
