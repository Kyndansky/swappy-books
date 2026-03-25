import { useEffect, useState } from "react";
import { BookOpen, Users, ShieldCheck } from "lucide-react";
import { Chip } from "@heroui/react";

const TITLE = "Swappy Books";

const OFFSETS = [
  { x: -120, y: 0 },
  { x: 120, y: 0 },
  { x: 0, y: -80 },
  { x: 0, y: 80 },
];

export function TypewriterTitle() {
  const [visible, setVisible] = useState<boolean[]>(Array(TITLE.length).fill(false));
  const [offsets, setOffsets] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const off = TITLE.split("").map(() => OFFSETS[Math.floor(Math.random() * OFFSETS.length)]);
    setOffsets(off);

    TITLE.split("").forEach((_, i) => {
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
    <h1 
      className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-center"
      style={{
        background: "linear-gradient(to bottom, var(--foreground), color-mix(in srgb, var(--foreground) 60%, transparent))",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {TITLE.split("").map((char, i) => {
        const offset = offsets[i] || { x: 0, y: 0 };
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: visible[i] ? 1 : 0,
              transform: visible[i] ? "translate(0, 0)" : `translate(${offset.x}px, ${offset.y}px)`,
              transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
              willChange: "transform, opacity",
              background: "inherit",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        );
      })}
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
