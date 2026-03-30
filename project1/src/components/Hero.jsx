import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { heroSlides } from "../data/products";

export function HeroTriple() {
  return <HeroEditorial />;
}

export function HeroEditorial() {
  const slide = heroSlides[1];

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
      {/* Full-bleed background */}
      <img
        src={slide.image}
        alt="Collection"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Minimal dark overlay */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Centered editorial content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6">
        {/* Season label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
          className="text-[10px] md:text-xs tracking-[0.35em] font-light text-white/75 uppercase mb-7"
        >
          Spring / Summer 2025
        </motion.p>

        {/* Serif headline */}
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.35 }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[88px] font-normal leading-[1.08] tracking-tight mb-2"
        >
          Summer
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[88px] font-normal italic leading-[1.08] tracking-tight mb-8"
        >
          Essentials
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.75 }}
          className="w-14 h-px bg-white/50 mb-7 origin-center"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.95 }}
          className="text-sm font-light tracking-[0.08em] text-white/70 max-w-[260px] leading-relaxed mb-10"
        >
          {slide.subtitle}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex gap-4"
        >
          <Link
            to="/women"
            className="inline-block border border-white text-white text-[11px] font-light tracking-[0.28em] px-10 py-3.5 hover:bg-white hover:text-black transition-all duration-300"
          >
            SHOP WOMEN
          </Link>
          <Link
            to="/men"
            className="inline-block border border-white/50 text-white/80 text-[11px] font-light tracking-[0.28em] px-10 py-3.5 hover:border-white hover:text-white transition-all duration-300"
          >
            SHOP MEN
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-white/40 text-[9px] tracking-[0.25em] uppercase">Scroll</span>
        <motion.div
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="w-px h-7 bg-white/25 origin-top"
        />
      </motion.div>
    </section>
  );
}
