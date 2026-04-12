import { Link } from "@heroui/link";
import { Button } from "@heroui/button";

export function LandingCTA() {
  return (
    <section className="py-20">
      <div className="relative rounded-3xl bg-gradient-to-br from-primary/90 to-primary overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
        <div className="relative px-8 py-16 md:px-16 md:py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to give your books a new life?</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8 text-lg">Join hundreds of readers swapping books every day. Your next favorite book might be closer than you think.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button as={Link} href="/register" size="lg" className="bg-white text-primary font-semibold">Start for free</Button>
            <Button as={Link} href="/shop" size="lg" variant="bordered" className="text-white border-white hover:bg-white/10">Browse books</Button>
          </div>
        </div>
      </div>
    </section>
  );
}