"use client";
import { Highlight } from "react-instantsearch";
import type { FC } from "react";

interface Props {
  hit: any;
}

export const Hit: FC<Props> = ({ hit }) => (
  <article>
    <div className="hit-title">
      <Highlight attribute="title" hit={hit} />
    </div>
    <div className="hit-content">
      <Highlight attribute="content" hit={hit} />
    </div>
    <div className="hit-slug">
      <Highlight attribute="slug" hit={hit} />
    </div>
  </article>
);
