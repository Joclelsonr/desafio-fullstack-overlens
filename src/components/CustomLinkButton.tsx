"use client";

import Link from "next/link";
import { Button } from "./ui/button";

type CustomButtonProps = {
  label: string;
  path: string;
};

export function CustomLinkButton({ path, label }: CustomButtonProps) {
  return (
    <Link href={`${path}`}>
      <Button variant="outline">{label}</Button>
    </Link>
  );
}
