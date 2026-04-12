import DefaultLayout from "@/layouts/default";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { ArrowRight } from "lucide-react";
import { LandingBenefits } from "@/components/landing/LandingBenefits";
import { LandingCTA } from "@/components/landing/LandingCTA";
import { TypewriterTitle, LandingFeatures } from "@/components/landing/LandingHero";
import { LandingSteps } from "@/components/landing/LandingSteps";


export default function LandingPage() {
  return (
    <DefaultLayout>
      <section className="relative flex flex-col items-center justify-center gap-8 py-24 md:py-40 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" />
        </div>
        
        <TypewriterTitle />
        
        <p className="text-lg md:text-xl text-default-500 text-center max-w-2xl">
          Swap and sell used books with your community
        </p>

        <LandingFeatures />
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button as={Link} href="/shop" color="primary" size="lg" endContent={<ArrowRight size={18} />}>
            Explore books
          </Button>
          <Button as={Link} href="/register" color="default" size="lg" variant="bordered">
            Create free account
          </Button>
        </div>
      </section>

      <LandingBenefits />
      <LandingSteps />
      <LandingCTA />
    </DefaultLayout>
  );
}