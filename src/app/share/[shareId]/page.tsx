import { getNoteByShareId } from "@/lib/api";
import { ShareContent } from "./_components/shareContent";
import { CustomLinkButton } from "@/components/CustomLinkButton";

type ShareContentProos = Promise<{ shareId: string }>;

export default async function Page({ params }: { params: ShareContentProos }) {
  const { shareId } = await params;
  const note = await getNoteByShareId(shareId);

  if (!note) {
    return <div>Note not found</div>;
  }

  if (!note.isPublic) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">This note is not public.</h1>
        <p className="text-gray-600 mb-4">
          You will only be able to view this note if it is public.
        </p>
        <CustomLinkButton path="/" label="Back to Home" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{note.title}</h1>
      <p className="text-muted-foreground mb-4">
        By {note.author.name || "Anonymous"}
      </p>
      <ShareContent content={note.content} />
      <div className="mt-8">
        <CustomLinkButton path="/" label="Back to Home" />
      </div>
    </div>
  );
}
