import { toast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export function DeleteNote({ id }: { id: string }) {
  const handleDelete = async () => {
    const response = await fetch(`/api/notes/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      toast({
        title: "Note deleted",
        description: "Your note has been deleted.",
      });
    } else {
      toast({
        title: "Error deleting note",
        description: "There was an error deleting your note.",
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button className="ml-2" variant="outline">
          <Trash2 className="w-4 h-4" />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure about this?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. It will permanently delete your note
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
