import DefaultLayout from "@/layouts/default";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { ArrowRight } from "lucide-react";
import { LandingFeatures, LandingBenefits, LandingSteps, LandingCTA } from "@/components/landing";

export default function LandingPage() {
  return (
    <DefaultLayout>
      <section className="relative flex flex-col items-center justify-center gap-8 py-24 md:py-40 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-center bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60">
          Swappy Books
        </h1>
        
        <p className="text-lg md:text-xl text-default-500 text-center max-w-2xl">
          Scambia e vendi libri usati con la tua comunità
        </p>

        <LandingFeatures />
        
        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <Button
            as={Link}
            href="/shop"
            color="primary"
            size="lg"
            endContent={<ArrowRight size={18} />}
          >
            Esplora libri
          </Button>
          <Button
            as={Link}
            href="/register"
            color="default"
            size="lg"
            variant="bordered"
          >
            Crea account gratuito
          </Button>
        </div>
      </section>

      <LandingBenefits />
      <LandingSteps />
      <LandingCTA />
    </DefaultLayout>
  );
}
