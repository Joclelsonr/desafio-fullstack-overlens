"use server";

import { prisma } from "./prisma";

export async function getNotes() {
  const notes = await prisma.note.findMany({
    where: {
      isPublic: true,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return notes;
}

export async function getNote(id: string) {
  const note = await prisma.note.findUnique({
    where: {
      id: id,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  return note;
}

export async function getNoteByShareId(shareId: string) {
  const note = await prisma.note.findUnique({
    where: {
      id: shareId,
      // shareId: shareId,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  return note;
}
