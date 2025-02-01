import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  const notes = await prisma.note.findMany({
    where: {
      OR: [
        { isPublic: true },
        { authorId: userId !== null ? userId : undefined },
      ],
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

  return NextResponse.json(notes);
}
export async function POST(request: Request) {
  const { title, content, isPublic, authorId } = await request.json();

  const note = await prisma.note.create({
    data: {
      title,
      content,
      isPublic,
      authorId,
    },
  });

  revalidatePath("/notes");
  return NextResponse.json(note);
}
