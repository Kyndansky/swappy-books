const steps = [
  { num: 1, title: "Sign up", description: "Create your free profile in less than a minute" },
  { num: 2, title: "List", description: "Add your books with photos and detailed descriptions" },
  { num: 3, title: "Swap", description: "Find interested buyers and complete the swap" },
];

export function LandingSteps() {
  return (
    <section className="py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">Get started in three simple steps</h2>
        <p className="text-default-500 max-w-xl mx-auto">No tech expertise needed. In just a few minutes, you'll be ready to start swapping.</p>
      </div>
      <div className="relative">
        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-default-200 -translate-y-1/2" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((s) => (
            <div key={s.num} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mb-6 relative z-10 ring-4 ring-primary/20">
                {s.num}
              </div>
              <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
              <p className="text-default-500 max-w-xs">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}