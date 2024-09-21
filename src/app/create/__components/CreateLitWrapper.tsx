"use client";
import { useState, type FC } from "react";
import type { getAuthors } from "../actions";
import { createLiterature } from "../actions";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { formSchema } from "../form";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface Props {
  authors: Awaited<ReturnType<typeof getAuthors>>;
}

const CreateLitWrapper: FC<Props> = ({ authors }) => {
  const router = useRouter();
  const [showAuthorForm, setShowAuthorForm] = useState<boolean>(false);

  const { executeAsync, status } = useAction(createLiterature, {
    onSuccess: ({ data }) => {
      console.log("Success", data);
      if (data) {
        router.push(`/${data.slug}`);
      }
    },
    onError: ({ error }) => {
      console.error("Error", error);
    },
  });

  const litForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      author: { type: "existing", id: "" },
    },
  });

  const onSubmit = litForm.handleSubmit(async (data) => {
    await executeAsync(data);
  });

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <form onSubmit={onSubmit} className="w-full max-w-md">
        <Form {...litForm}>
          <FormField
            control={litForm.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} type="text" placeholder="Title" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={litForm.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Likh likh" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          {showAuthorForm ? (
            <Button
              variant={"outline"}
              type="button"
              onClick={() => {
                setShowAuthorForm(() => false);
                litForm.setValue("author.type", "new");
              }}
            >
              Select existing Author
            </Button>
          ) : (
            <Button
              variant={"outline"}
              type="button"
              onClick={() => {
                setShowAuthorForm(() => true);
                litForm.setValue("author.type", "new");
              }}
            >
              Add Author instead
            </Button>
          )}

          {!showAuthorForm ? (
            <FormField
              control={litForm.control}
              name="author.id"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Author</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? authors?.find(
                                (author) => author.id === field.value
                              )?.name
                            : "Select Author"}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search author..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No author found.</CommandEmpty>
                          <CommandGroup>
                            {authors?.map((author) => (
                              <CommandItem
                                value={author.id}
                                key={author.id}
                                onSelect={() => {
                                  litForm.setValue("author.id", author.id);
                                }}
                              >
                                {author.name}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    author.id === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <>
              <FormField
                control={litForm.control}
                name="author.name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author Name</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Author Name" />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={litForm.control}
                name="author.pen_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author Pen name</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={litForm.control}
                name="author.about"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Author about" />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
          <Button type="submit" disabled={status === "executing"}>
            Create
          </Button>
        </Form>
      </form>
    </div>
  );
};

export default CreateLitWrapper;
