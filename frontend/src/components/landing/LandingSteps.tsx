interface Step {
  num: number;
  title: string;
  description: string;
}

const steps: Step[] = [
  { num: 1, title: "Registrati", description: "Crea il tuo profilo gratuito in meno di un minuto" },
  { num: 2, title: "Pubblica", description: "Aggiungi i tuoi libri con foto e descrizioni dettagliate" },
  { num: 3, title: "Scambia", description: "Trova acquirenti interessati e concludi lo scambio" },
];

interface StepCardProps {
  num: number;
  title: string;
  description: string;
}

function StepCard({ num, title, description }: StepCardProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mb-6 relative z-10 ring-4 ring-primary/20">
        {num}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-default-500 max-w-xs">{description}</p>
    </div>
  );
}

export function LandingSteps() {
  return (
    <section className="py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          Inizia in tre semplici passi
        </h2>
        <p className="text-default-500 max-w-xl mx-auto">
          Non serve essere esperti di tecnologia. In pochi minuti sarai pronto 
          per iniziare a scambiare.
        </p>
      </div>
      
      <div className="relative">
        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-default-200 -translate-y-1/2" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step) => (
            <StepCard key={step.num} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
}
