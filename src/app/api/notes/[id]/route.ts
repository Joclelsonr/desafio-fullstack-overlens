import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

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
    return NextResponse.json({ error: "Note not found" }, { status: 404 });
  }

  return NextResponse.json(note);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const { title, content, isPublic } = await request.json();

  const updatedNote = await prisma.note.update({
    where: { id },
    data: {
      title,
      content,
      isPublic,
    },
  });

  revalidatePath("/notes");
  return NextResponse.json(updatedNote);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  await prisma.note.delete({
    where: { id },
  });

  revalidatePath("/");
  revalidatePath("/notes");
  return NextResponse.json({ message: "Note deleted successfully" });
}
