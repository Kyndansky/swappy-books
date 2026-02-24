import { Link } from "@heroui/link";

import { Navbar } from "@/components/navbar";
import { useAuth } from "@/contexts/AuthContextHandler";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3">
        All rights reserved to swappy books
        <Link
          isExternal
          className="ml-1 flex items-center gap-1 text-current"
          href="https://github.com/Kyndansky/swappy-books/"
          title="Swappy books project"
        >
          team
        </Link>
      </footer>
    </div>
  );
}
