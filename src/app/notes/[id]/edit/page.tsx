import { UpdateNoteForm } from "./_components/UpdateNoteFform";
import { CustomLinkButton } from "@/components/CustomLinkButton";

import { getNoteById } from "../../_actions";

export default async function EditNote({ params }: { params: { id: string } }) {
  const { id } = await params;
  const note = await getNoteById(id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-8 md:text-3xl">Edit Note</h1>
        <CustomLinkButton path="/notes" label="Back to Notes" />
      </div>
      <UpdateNoteForm authorId={note.authorId} defaultValues={note} />
    </div>
  );
}
