import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";

const categories = [
  {
    name: "Racing Karts",
    description: "High-performance racing go-karts for competitive racing",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  },
  {
    name: "Recreational Karts",
    description: "Fun and safe go-karts perfect for leisure and family entertainment",
    image:
      "https://images.unsplash.com/photo-1612892483236-52d32a0e0ac1?w=800&q=80",
  },
  {
    name: "Electric Karts",
    description: "Eco-friendly electric go-karts with instant torque and quiet operation",
    image:
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80",
  },
  {
    name: "Racing Gear",
    description:
      "Professional racing helmets, suits, gloves, and safety equipment for karting",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  },
];

export default function Categories() {
  return (
    <section className="py-16">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
            Explore Our Collection
          </h2>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
            From professional racing karts to high-speed e-bikes and premium parts, find everything you need for your racing journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <Link
              key={index}
              href={`/products?category=${encodeURIComponent(
                category.name
              )}`}
              className="group block"
            >
              <div className="aspect-[4/3] bg-zinc-100 relative overflow-hidden border border-zinc-200 rounded-[5px] shadow-sm hover:shadow-sm transition-all duration-500 transform hover:-translate-y-1">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />

                {/* Enhanced Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/40 to-transparent opacity-90 group-hover:opacity-95 transition-all duration-500"></div>

                {/* Hover Arrow Icon */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Enhanced Text Content */}
                <div className="absolute bottom-6 left-6 right-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="font-bold text-white mb-2 group-hover:text-red-400 transition-colors duration-300 text-2xl font-caveat">
                    {category.name}
                  </h3>
                  <p className="text-zinc-200 text-sm group-hover:text-zinc-100 transition-colors duration-300 font-outfit">
                    {category.description}
                  </p>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-200 rounded-[5px] transition-colors duration-500 pointer-events-none"></div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}


