import Link from "next/link";
import Container from "@/components/Container";
import { AiOutlineSchedule } from "react-icons/ai";

export default function TestDriveAlert() {
  return (
    <section className="bg-gradient-to-r from-red-50 to-orange-50 border-b border-red-200">
      <Container className="py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex md:items-center gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AiOutlineSchedule size={24} />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-red-900 mb-1">
                Book Test Drive
              </h3>
              <p className="text-red-800">
                Schedule a test drive with our racing experts and experience
                the thrill of our premium go-karts.
              </p>
            </div>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-medium  hover:bg-red-700 rounded-sm w-fit transition-colors duration-200 whitespace-nowrap"
          >
            Contact for Test Drive
            <svg
              className="w-4 h-4 ml-2"
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
          </Link>
        </div>
      </Container>
    </section>
  );
}


