import { LucideIcon } from "lucide-react";
import { BookOpen, Repeat, ShieldCheck, Users } from "lucide-react";

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

const benefits: Benefit[] = [
  {
    icon: BookOpen,
    title: "Libri verificati",
    description: "Ogni annuncio viene controllato per garantire descrizioni accurate delle condizioni.",
  },
  {
    icon: Repeat,
    title: "Scambi flessibili",
    description: "Scegli se vendere, comprare o scambiare. Tu decidi come procedere.",
  },
  {
    icon: ShieldCheck,
    title: "Transazioni sicure",
    description: "Monitoraggio degli scambi e supporto dedicato per ogni tua necessità.",
  },
  {
    icon: Users,
    title: "Comunità attiva",
    description: "Entra in contatto con altri lettori e scopri nuove letture insieme.",
  },
];

interface BenefitCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

function BenefitCard({ icon: Icon, title, description }: BenefitCardProps) {
  return (
    <div className="group p-6 rounded-2xl bg-default-50 dark:bg-default-100 border border-default-200 hover:border-primary transition-colors">
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
        <Icon size={24} className="text-primary" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-default-500 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

export function LandingBenefits() {
  return (
    <section className="py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          Perché scegliere Swappy Books
        </h2>
        <p className="text-default-500 max-w-xl mx-auto">
          Una piattaforma pensata per i lettori, con funzionalità che rendono 
          lo scambio semplice e sicuro.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {benefits.map((benefit) => (
          <BenefitCard key={benefit.title} {...benefit} />
        ))}
      </div>
    </section>
  );
}
