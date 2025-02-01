"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { User, Note } from "@prisma/client";

export async function allNotesUser(): Promise<
  (User & { notes: Note[] }) | null
> {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user?.id },
    include: {
      notes: true,
    },
  });
  return user;
}

export async function getNoteById(id: string) {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const note = await prisma.note.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  if (!note) {
    throw new Error("Note not found");
  }
  return note;
}
