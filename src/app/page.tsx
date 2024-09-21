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
import { Search } from "./_components/Search";

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
      <h1 className="font-bold">Literature Place</h1>
      <Search />
      {lits?.map((i) => (
        <Card key={i.id}>
          <CardHeader>
            <CardTitle>{i.title}</CardTitle>
            <CardDescription>{i.author.name}</CardDescription>
          </CardHeader>
          <CardContent>{i.content}</CardContent>
          <CardFooter>
            <Link href={`/literature/${i.slug}`}>
              <Button>Open</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
