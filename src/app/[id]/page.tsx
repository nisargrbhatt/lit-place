import prisma from "@/lib/prisma";
import type { NextPage } from "next";
import { notFound } from "next/navigation";

const getLit = async (slug: string) => {
  const lit = await prisma.literature.findUnique({
    where: {
      slug: slug,
    },
    include: {
      author: true,
    },
  });

  if (!lit) {
    return notFound();
  }

  return lit;
};

interface Props {
  params: {
    id: string;
  };
}

const LiteratureDetail: NextPage<Props> = async ({ params }) => {
  const slug = params.id;
  const lit = await getLit(slug);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">{lit.title}</h1>
      <p className="text-lg font-medium">
        <pre className="w-full text-wrap">{lit.content}</pre>
      </p>
      <p className="text-lg font-medium">{lit.author.name}</p>
    </div>
  );
};

export default LiteratureDetail;
