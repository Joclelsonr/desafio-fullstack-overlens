import { allNotesUser } from "./_actions";
import { CustomLinkButton } from "@/components/CustomLinkButton";
import { CustomCard } from "./_components/CustomCard";

export default async function Page() {
  const allNotes = await allNotesUser();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-8 md:text-3xl">Yours Note</h1>
        <CustomLinkButton path="/notes/new" label="New Note" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {allNotes?.notes.map((note) => (
          <CustomCard
            key={note.id}
            id={note.id}
            title={note.title}
            content={note.content}
            isPublic={note.isPublic}
            detailsUrl={`/notes/${note.id}`}
          />
        ))}
      </div>
    </div>
  );
}
