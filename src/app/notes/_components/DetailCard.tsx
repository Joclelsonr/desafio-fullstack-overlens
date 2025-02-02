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
import { Clock, Edit, Lock, Share2, Unlock } from "lucide-react";
import { useTheme } from "next-themes";

type DetailCardProps = {
  id: string;
  title: string;
  content: string;
  isPublic: boolean;
  createdAt: Date;
};

export function DetailCard({
  id,
  title,
  content,
  isPublic,
  createdAt,
}: DetailCardProps) {
  const currentUrl =
    typeof window !== "undefined" ? window.location.origin : "";
  const { theme } = useTheme();

  function handleShare() {
    const shareData = {
      title: title,
      text: content,
      url: `${currentUrl}/share/${id}`,
    };
    if (navigator.share) {
      navigator.share(shareData);
    } else {
      navigator.clipboard.writeText(`${currentUrl}/share/${id}`);
      toast({
        title: "Link copied to clipboard",
        description: "You can now share this link with others.",
      });
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex space-y-0 pb-2">
        <div className="flex flex-row justify-between">
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          <div className="flex items-center space-x-2">
            {isPublic ? (
              <Unlock className="h-4 w-4 text-green-500" />
            ) : (
              <Lock className="h-4 w-4 text-red-500" />
            )}
          </div>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="mr-1 h-4 w-4" />
          Created at: {createdAt.toDateString()}
        </div>
      </CardHeader>
      <CardContent>
        <div
          className={`prose prose-sm max-w-none ${
            theme === "dark" ? "prose-invert" : ""
          }`}
        >
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href={`/notes/${id}/edit`}>
          <Button className="flex items-center">
            <Edit className="mr-2 h-4 w-4" /> Edit
          </Button>
        </Link>
        <Button
          variant="outline"
          onClick={handleShare}
          className="flex items-center"
        >
          <Share2 className="mr-2 h-4 w-4" /> Share
        </Button>
      </CardFooter>
    </Card>
  );
}
