import { BookOpen, Repeat, ShieldCheck, Users } from "lucide-react";

const benefits = [
  { 
    icon: BookOpen, 
    title: "Verified books", 
    description: "Each listing is checked to ensure accurate condition descriptions." 
  },
  { 
    icon: Repeat, 
    title: "Flexible swaps", 
    description: "Choose whether to sell, buy, or swap. You decide how to proceed." 
  },
  { 
    icon: ShieldCheck, 
    title: "Secure transactions", 
    description: "Exchange monitoring and dedicated support for all your needs." 
  },
  { 
    icon: Users, 
    title: "Active community", 
    description: "Connect with other readers and discover new reads together." 
  },
];

export function LandingBenefits() {
  return (
    <section className="py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">Why choose Swappy Books</h2>
        <p className="text-default-500 max-w-xl mx-auto">
          A platform designed for readers, with features that make swapping simple and secure.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {benefits.map((b) => (
          <div key={b.title} className="group p-6 rounded-2xl bg-default-50 dark:bg-default-100 border border-default-200 hover:border-primary transition-colors">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <b.icon size={24} className="text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{b.title}</h3>
            <p className="text-default-500 text-sm">{b.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}