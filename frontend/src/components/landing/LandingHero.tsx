import { useEffect, useState } from "react";
import { BookOpen, Users, ShieldCheck } from "lucide-react";
import { Chip } from "@heroui/react";

const TITLE = "Swappy Books";

export function TypewriterTitle() {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= TITLE.length) {
        setDisplayText(TITLE.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowCursor(false), 500);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-center bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60">
      {displayText}
      <span className={`inline-block w-[3px] h-[0.8em] bg-foreground ml-1 align-middle transition-opacity ${showCursor ? "opacity-100" : "opacity-0"}`} />
    </h1>
  );
}

const features = [
  { icon: BookOpen, label: "Migliaia di libri" },
  { icon: Users, label: "Comunità attiva" },
  { icon: ShieldCheck, label: "Transazioni sicure" },
];

export function LandingFeatures() {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {features.map((f) => (
        <Chip key={f.label} startContent={<f.icon size={16} />} variant="flat" classNames={{ base: "bg-default-100 dark:bg-default-50" }}>
          {f.label}
        </Chip>
      ))}
    </div>
  );
}
