"use client";

import { User } from "next-auth";
import { LogOut } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { ThemeToggle } from "./ThemeToggle";
import Link from "next/link";

type HeaderProps = {
  user: User | null;
};

export function Header({ user }: HeaderProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({
      redirect: false,
    });
    router.push("/");
  };

  const getAvatarFallback = (name: string) => {
    const splittedName = name.split(" ");

    if (splittedName.length === 1) {
      return splittedName[0].charAt(0);
    }

    const firstLetter = splittedName[0].charAt(0);
    const lastLetter = splittedName[splittedName.length - 1].charAt(0);

    return `${firstLetter}${lastLetter}`;
  };
  const avatarFallback = getAvatarFallback(user?.name ?? "");

  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-primary">
          <Link href="/">NotesApp</Link>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.image ?? ""} alt={user?.name ?? ""} />
                  <AvatarFallback>{avatarFallback}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user?.name}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleLogout()}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
