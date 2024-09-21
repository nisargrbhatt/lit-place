"use server";

import prisma from "@/lib/prisma";
import { ActionError, authenticatedAction } from "@/lib/safe-action";
import { formSchema } from "./form";
import slugify from "slugify";
import { safeAsync } from "@/lib/safe";
import { client } from "@/lib/algolia";

export const getAuthors = async () => {
  const authors = await prisma.author.findMany();

  return authors;
};

export const createLiterature = authenticatedAction
  .schema(formSchema)
  .action(async ({ parsedInput }) => {
    if (parsedInput.author.type === "existing") {
      const author = await prisma.author.findFirst({
        where: {
          id: parsedInput.author.id,
        },
      });

      if (!author) {
        throw new ActionError("Author not found");
      }
    }

    const createdLiteratureResult = await safeAsync(
      prisma.literature.create({
        data: {
          title: parsedInput.title,
          content: parsedInput.content,
          slug: slugify(parsedInput.title, {
            lower: true,
            trim: true,
          }),
          ...(parsedInput.author.type === "existing"
            ? { author_id: parsedInput.author.id }
            : {
                author: {
                  create: {
                    name: parsedInput.author.name,
                    pen_name: parsedInput.author?.pen_name,
                    about: parsedInput.author?.about,
                  },
                },
              }),
        },
        include: {
          author: true,
        },
      })
    );

    if (!createdLiteratureResult.success) {
      console.error(createdLiteratureResult.error);
      throw new ActionError("Literate create failed");
    }

    if (!createdLiteratureResult.data) {
      throw new ActionError("Failed to create literature");
    }

    const createdEntry = await safeAsync(
      client.saveObject({
        indexName: "literature",
        body: createdLiteratureResult.data,
      })
    );

    console.log(createdEntry);

    return {
      id: createdLiteratureResult.data.id,
      slug: createdLiteratureResult.data.slug,
    };
  });
