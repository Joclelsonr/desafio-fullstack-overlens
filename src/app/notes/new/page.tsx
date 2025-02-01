import { auth } from "@/lib/auth";
import { NewNoteForm } from "./_components/NewNoteForm";
import { CustomLinkButton } from "@/components/CustomLinkButton";

export default async function NewNote() {
  const session = await auth();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-8 md:text-3xl">Create New Note</h1>
        <CustomLinkButton path="/notes" label="Back to Notes" />
      </div>
      <NewNoteForm user={session?.user!} />
    </div>
  );
}
