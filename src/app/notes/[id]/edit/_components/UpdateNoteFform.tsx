"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TipTapEditor } from "@/components/TipTapEditor";
import { formSchema, FormValues } from "../../../schema";

type UpdateNoteFormProps = {
  authorId: string;
  defaultValues?: FormValues;
};

export function UpdateNoteForm({
  authorId,
  defaultValues,
}: UpdateNoteFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const form = useForm<FormValues>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const watchedTitle = form.watch("title");
  const watchedContent = form.watch("content");

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    const response = await saveNote(values);
    if (response.ok) {
      toast({
        title: "Note updated successfully",
        description: "Your note has been updated successfully.",
      });
    } else {
      toast({
        title: "Error updating note",
        description: "Something went wrong while updating your note.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const timeout = setTimeout(async () => {
      const values = form.getValues();
      if (
        defaultValues &&
        (values.title !== defaultValues.title ||
          values.content !== defaultValues.content)
      ) {
        setIsSaving(true);
        await saveNote(values);
        setIsSaving(false);
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, [watchedTitle, watchedContent]);

  const saveNote = async (values: FormValues) => {
    const result = await fetch(`/api/notes/${defaultValues?.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, authorId }),
    });
    return result;
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
                <Input
                  {...field}
                  placeholder="Title"
                  defaultValue={defaultValues?.title}
                />
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
                <TipTapEditor
                  content={defaultValues?.content}
                  onChange={field.onChange}
                />
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
                  defaultChecked={defaultValues?.isPublic}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Make public</FormLabel>
              </div>
            </FormItem>
          )}
        />

        <Button type="submit">
          {isLoading ? "Updating..." : "Update Note"}
        </Button>
        {isSaving && <p className="text-sm text-gray-500">Auto-saving...</p>}
      </form>
    </Form>
  );
}
