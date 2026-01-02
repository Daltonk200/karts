import Container from "@/components/Container";

export default function WhyChooseUs() {
  const props = [
    { title: "Fast Delivery", desc: "Quick shipping across regions with reliable carriers." },
    { title: "Warranty", desc: "Manufacturer-backed warranties on all major products." },
    { title: "Secure Payment", desc: "Safe checkout with PCI-compliant providers." },
    { title: "Support", desc: "Expert customer support available 7 days a week." },
  ];

  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-2 font-caveat">Why Choose Us</h2>
          <p className="text-zinc-600 max-w-2xl mx-auto">Trusted performance, dedicated support, and industry-leading guarantees.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {props.map((p) => (
            <div key={p.title} className="bg-zinc-50 rounded-2xl p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-red-100 mx-auto flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 mb-2">{p.title}</h3>
              <p className="text-sm text-zinc-600">{p.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
