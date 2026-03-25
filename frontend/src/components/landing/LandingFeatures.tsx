import { Chip } from "@heroui/react";
import { LucideIcon } from "lucide-react";
import { BookOpen, Users, ShieldCheck } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  label: string;
}

const features: Feature[] = [
  { icon: BookOpen, label: "Migliaia di libri" },
  { icon: Users, label: "Comunità attiva" },
  { icon: ShieldCheck, label: "Transazioni sicure" },
];

export function LandingFeatures() {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {features.map((feature) => (
        <Chip
          key={feature.label}
          startContent={<feature.icon size={16} />}
          variant="flat"
          classNames={{ base: "bg-default-100 dark:bg-default-50" }}
        >
          {feature.label}
        </Chip>
      ))}
    </div>
  );
}
