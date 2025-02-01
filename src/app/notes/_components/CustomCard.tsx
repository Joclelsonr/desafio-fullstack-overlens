"use client";

import Link from "next/link";
import { toast } from "@/hooks/use-toast";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lock, Trash2, Unlock } from "lucide-react";
import { useTheme } from "next-themes";

interface CustomCardProps {
  id: string;
  title: string;
  content: string;
  isPublic: boolean;
  detailsUrl: string;
}

export function CustomCard({
  id,
  title,
  content,
  isPublic,
  detailsUrl,
}: CustomCardProps) {
  const { theme } = useTheme();

  const handleDelete = async () => {
    const response = await fetch(`/api/notes/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      toast({
        title: "Note deleted",
        description: "Your note has been deleted.",
      });
    } else {
      toast({
        title: "Error deleting note",
        description: "There was an error deleting your note.",
      });
    }
  };

  return (
    <Card className="max-w-md">
      <CardHeader className="flex flex-row justify-between items-center mb-4">
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        {isPublic ? (
          <Unlock className="w-5 h-5 text-green-500" />
        ) : (
          <Lock className="w-5 h-5 text-red-500" />
        )}
      </CardHeader>
      <CardContent className="min-h-52">
        <div
          className={`prose prose-sm ${theme === "dark" ? "prose-invert" : ""}`}
          dangerouslySetInnerHTML={{ __html: content.slice(0, 300) + "..." }}
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link
          href={detailsUrl}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          View Details
          <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
        <Button className="ml-2" variant="outline" onClick={handleDelete}>
          <Trash2 className="w-4 h-4" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
