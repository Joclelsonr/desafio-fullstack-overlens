import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="loading-container flex items-center justify-center h-screen">
      <Loader2 className="animate-spin h-10 w-10" />
    </div>
  );
}
