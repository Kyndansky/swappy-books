import { useEffect, useState } from "react";
import { BookOpen, Users, ShieldCheck } from "lucide-react";
import { Chip } from "@heroui/react";

const TITLE = "Swappy Books";

const DIRS = ["-translate-x-32", "translate-x-32", "-translate-y-24", "translate-y-24"];

export function TypewriterTitle() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState<boolean[]>(Array(TITLE.length).fill(false));
  const [offsets, setOffsets] = useState<string[]>([]);

  useEffect(() => {
    const off = TITLE.split("").map(() => DIRS[Math.floor(Math.random() * DIRS.length)]);
    setOffsets(off);

    visible.forEach((_, i) => {
      setTimeout(() => {
        setVisible(prev => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, 100 + i * 80);
    });
  }, []);

  return (
    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-center">
      <span className="bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60">
        {TITLE.split("").map((char, i) => (
          <span
            key={i}
            className={`inline-block transition-all duration-500 ${
              visible[i] ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${offsets[i]}`
            }`}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
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
