"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "next-auth";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { formSchema, FormValues } from "../../schema";
import { TipTapEditor } from "@/components/TipTapEditor";

type NewNoteFormProps = {
  user: User | undefined;
};

export function NewNoteForm({ user }: NewNoteFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<FormValues>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      isPublic: false,
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);

    const response = await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...values,
        authorId: user?.id,
      }),
    });

    if (response.ok) {
      const createdNote = await response.json();
      router.push(`/notes/${createdNote.id}`);
    } else {
      console.error("Failed to create note");
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Title" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <TipTapEditor content={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isPublic"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Make public</FormLabel>
              </div>
            </FormItem>
          )}
        />

        <Button type="submit">
          {isLoading ? "Creating..." : "Create Note"}
        </Button>
      </form>
    </Form>
  );
}
