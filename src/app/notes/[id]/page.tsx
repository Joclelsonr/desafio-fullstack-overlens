import { DetailCard } from "../_components/DetailCard";
import { CustomLinkButton } from "@/components/CustomLinkButton";

import { getNote } from "@/lib/api";

type DetailsNoteProps = Promise<{ id: string }>;

export default async function Page({ params }: { params: DetailsNoteProps }) {
  const { id } = await params;
  const note = await getNote(id);

  if (!note) {
    return <div>Note not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-8 md:text-3xl">Note Details</h1>
        <CustomLinkButton path="/notes" label="Back to all Notes" />
      </div>
      <DetailCard
        id={note.id}
        title={note.title}
        content={note.content}
        isPublic={note.isPublic}
        createdAt={note.createdAt}
      />
    </div>
  );
}
