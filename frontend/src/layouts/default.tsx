import { Link } from "@heroui/link";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

import { Navbar } from "@/components/navbar";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = useLocation();

  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-5">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </main>
      <footer className="w-full flex items-center justify-center py-3 text-xs">
        All rights reserved to swappy books
        <Link
          isExternal
          className="ml-1 flex items-center gap-1 text-xs text-primary"
          href="https://github.com/Kyndansky/swappy-books/"
          title="Swappy books project"
          showAnchorIcon={true}
          underline="always"
        >
          team
        </Link>
      </footer>
    </div>
  );
}
