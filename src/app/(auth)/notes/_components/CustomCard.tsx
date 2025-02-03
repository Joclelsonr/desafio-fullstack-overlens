"use client";

import Link from "next/link";
import { useTheme } from "next-themes";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Lock, Unlock } from "lucide-react";
import { DeleteNote } from "./DeleteNote";

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
        <DeleteNote id={id} />
      </CardFooter>
    </Card>
  );
}
