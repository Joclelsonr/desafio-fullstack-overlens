import { auth } from "@/lib/auth";
import { getNotes } from "@/lib/api";
import { NoteCard } from "@/components/NoteCard";
import { CustomLinkButton } from "@/components/CustomLinkButton";

export default async function Home() {
  const session = await auth();
  const notes = await getNotes();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-8 md:text-3xl">Latest Notes</h1>
        {session?.user ? (
          <CustomLinkButton label="Go to Notes" path="/notes" />
        ) : (
          <CustomLinkButton label="Create Your Note" path="/login" />
        )}
      </div>
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          id={note.id}
          title={note.title}
          content={note.content}
          author={note.author.name || "Anonymous"}
          isPublic={note.isPublic}
          createdAt={note.createdAt}
        />
      ))}
    </div>
  );
}
