import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/prisma";
import Link from "next/link";
import AutocompleteWrapper from "./_components/Autocomplete";

export const metadata = {
  title: "Literature Place",
};

const getLiteratures = async () => {
  const literatures = await prisma.literature.findMany({
    include: {
      author: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return literatures;
};

export default async function Home() {
  const lits = await getLiteratures();

  return (
    <div>
      <div className="flex w-full items-center justify-between gap-2">
        <AutocompleteWrapper />
        <Link href="/create">
          <Button>Create</Button>
        </Link>
      </div>
      <div className="grid w-full grid-cols-1 gap-4 py-2 sm:grid-cols-2 lg:grid-cols-3">
        {lits?.map((i) => (
          <Card key={i.id}>
            <CardHeader>
              <CardTitle>{i.title}</CardTitle>
              <CardDescription>{i.author.name}</CardDescription>
            </CardHeader>
            <CardContent>{i.content.slice(0, 100)}</CardContent>
            <CardFooter>
              <Link href={`/${i.slug}`}>
                <Button>Open</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
