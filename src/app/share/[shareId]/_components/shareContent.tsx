"use client";

import { useTheme } from "next-themes";

export function ShareContent({ content }: { content: string }) {
  const { theme } = useTheme();
  return (
    <div
      className={`prose max-w-none mb-8  ${
        theme === "dark" ? "prose-invert" : ""
      }`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
