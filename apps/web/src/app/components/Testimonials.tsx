"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import testimonial from "../../../public/testimonial.png";
import testimonial1 from "../../../public/testimonial-1.png";
import testimonial2 from "../../../public/testimonial-2.png";
import testimonial3 from "../../../public/testimonial-3.png";
import testimonial4 from "../../../public/testimonial-4.png";

const testimonials = [
  {
    quote:
      "Freelancia helped me find consistent work within the first week. The clients here actually value quality, and the platform makes everything simple.",
    name: "Ana P.",
    role: "Creative Studio Founder",
    image: testimonial,
  },
  {
    quote:
      "As a developer, I was tired of competing on price. Here, clients actually look at your portfolio and skills. I landed my best contract through Freelancia.",
    name: "Marko S.",
    role: "Full-Stack Developer",
    image: testimonial1,
  },
  {
    quote:
      "I posted a project and had five qualified applicants within 24 hours. The quality of freelancers on this platform is outstanding. Both freelancers and clients win here.",
    name: "Elena R.",
    role: "Marketing Director",
    image: testimonial2,
  },
  {
    quote:
      "The application process is so smooth. I love being able to showcase my portfolio and let my work speak for itself. Highly recommended!",
    name: "David K.",
    role: "UI/UX Designer",
    image: testimonial3,
  },
  {
    quote:
      "We've hired three freelancers through Freelancia and every single one delivered exceptional work. This is now our go-to platform.",
    name: "Sara M.",
    role: "Startup Co-Founder",
    image: testimonial4,
  },
];

export const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  const goTo = (index: number) => setCurrent(index);
  const prev = () =>
    setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () =>
    setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  const t = testimonials[current];

  return (
    <section
      className="bg-[#05050C] w-full min-h-screen flex flex-col items-center justify-center relative px-4 sm:px-6 overflow-hidden text-center py-20 md:py-0"
      style={{ minHeight: "min(960.47px, 100vh)" }}
    >
      <h2 className="text-white text-3xl sm:text-5xl md:text-7xl font-semibold mb-10 md:mb-20 tracking-tight">
        What our users say
      </h2>

      <div className="relative w-full max-w-4xl mx-auto mb-16 px-4 flex items-center">
        <button
          onClick={prev}
          className="absolute -left-4 md:-left-16 text-gray-300 hover:text-white transition-colors cursor-pointer p-2"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />
        </button>

        <p className="text-gray-300 text-base sm:text-xl md:text-3xl font-light italic leading-relaxed flex-1">
          &quot;{t.quote}&quot;
        </p>

        <button
          onClick={next}
          className="absolute -right-4 md:-right-16 text-gray-300 hover:text-white transition-colors cursor-pointer p-2"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />
        </button>
      </div>

      <div className="flex flex-col items-center gap-4 mb-12">
        <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-gray-700">
          <Image
            src={t.image ?? testimonial}
            alt={t.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="text-white font-bold text-lg md:text-xl">{t.name}</h3>
          <p className="text-gray-400 text-sm md:text-base">{t.role}</p>
        </div>
      </div>

      <div className="flex gap-1">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="p-3 cursor-pointer group"
            aria-label={`Go to testimonial ${i + 1}`}
          >
            <div
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === current
                  ? "bg-white scale-110"
                  : "bg-gray-600 group-hover:bg-gray-400"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
};
