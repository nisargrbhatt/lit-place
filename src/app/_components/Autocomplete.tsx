"use client";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { algoliaPublicClient } from "@/lib/algolia-public";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, type FC } from "react";
import { useForm } from "react-hook-form";
import { InstantSearch, useSearchBox, useHits } from "react-instantsearch";
import { z } from "zod";
import type { Literature, Author } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const searchSchema = z.object({
  query: z.string(),
});

interface Props {}

const Autocomplete: FC<Props> = () => {
  const searchBox = useSearchBox();
  const hits = useHits<Literature & { author: Author }>();
  const searchForm = useForm<z.infer<typeof searchSchema>>({
    defaultValues: {
      query: "",
    },
    resolver: zodResolver(searchSchema),
  });

  const searchValue = searchForm.watch("query");

  useEffect(() => {
    const timeout = setTimeout(() => {
      searchBox.refine(searchValue);
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchValue]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Search</Button>
      </DialogTrigger>
      <DialogContent className="top-[85%] sm:top-[50%] sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Search our curated literature</DialogTitle>
          <DialogDescription>
            Search among thousands of literature, and discover new authors and
            titles.
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-full flex-col gap-2">
          <Form {...searchForm}>
            <FormField
              control={searchForm.control}
              name="query"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Search something"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </Form>
          <div className="grid h-[40%] w-full grid-cols-1 gap-2 overflow-y-auto md:h-full md:grid-cols-2 lg:grid-cols-3">
            {hits.items?.map((item) => (
              <Link key={item.objectID} href={`/${item.slug}`}>
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>{item.author.name}</CardDescription>
                  </CardHeader>
                  <CardContent className="w-full text-wrap break-words text-xs">
                    {item.content?.slice(0, 30)?.replace("\n", "")}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const AutocompleteWrapper: FC = () => (
  <InstantSearch
    searchClient={algoliaPublicClient}
    indexName="literature"
    future={{
      preserveSharedStateOnUnmount: true,
    }}
  >
    <Autocomplete />
  </InstantSearch>
);

export default AutocompleteWrapper;
