"use client";

import { useTheme } from "next-themes";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { CustomLinkButton } from "./CustomLinkButton";
import { timeSinceCreation } from "@/lib/timeSinceCreation";
import { Clock } from "lucide-react";

type NoteCardProps = {
  id: string;
  title: string;
  content: string;
  author?: string;
  isPublic: boolean;
  createdAt: Date;
};

export function NoteCard({
  id,
  title,
  content,
  author,
  isPublic,
  createdAt,
}: NoteCardProps) {
  const { theme } = useTheme();
  return (
    <Card className="border rounded-lg mb-4">
      <CardHeader className="flex space-y-0 pb-2">
        <div className="flex flex-row justify-between">
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
          {author && <p className="text-muted-foreground">By {author}</p>}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="mr-1 h-4 w-4" />
          Created {timeSinceCreation(createdAt)} ago
        </div>
      </CardHeader>
      <CardContent>
        <div
          className={`prose prose-sm prose-slate max-w-none ${
            theme === "dark" ? "prose-invert" : ""
          }`}
          dangerouslySetInnerHTML={{ __html: content.slice(0, 180) + "..." }}
        />
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <CustomLinkButton label="Read more" path={`/share/${id}`} />
        <Badge variant={isPublic ? "default" : "destructive"}>
          {isPublic ? "Public" : "Private"}
        </Badge>
      </CardFooter>
    </Card>
  );
}
