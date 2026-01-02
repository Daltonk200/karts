import Container from "@/components/Container";
import Image from "next/image";
import Link from "next/link";

export default function Brands() {
  const partners = [
    "/apex_logo.png",
    "/next.svg",
    "/vercel.svg",
  ];

  return (
    <section className="py-12 bg-zinc-50">
      <Container>
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-zinc-900">Trusted By</h3>
          <p className="text-zinc-600 text-sm">Our partners and brands</p>
        </div>
        <div className="flex items-center justify-center gap-8 flex-wrap">
          {partners.map((p, i) => (
            <div key={i} className="w-28 h-12 relative">
              <Image src={p} alt={`brand-${i}`} fill className="object-contain" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
