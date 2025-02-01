import { auth } from "@/lib/auth";

import { Header } from "@/components/Header";

export default async function NotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <main className="flex flex-col h-screen">
      <Header user={session?.user ?? null} />
      {children}
    </main>
  );
}
