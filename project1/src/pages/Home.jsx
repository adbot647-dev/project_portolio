import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Truck, RotateCcw, Lock, MessageSquare } from "lucide-react";
import { HeroTriple } from "../components/Hero";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

const tabs = ["ALL", "WOMEN", "MEN", "KIDS"];

const campaigns = [
  {
    id: 1,
    label: "WOMEN",
    title: "Spring Essentials",
    sub: "Light fabrics for the new season",
    cta: "SHOP WOMEN",
    link: "/women",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&q=80&auto=format",
  },
  {
    id: 2,
    label: "MEN",
    title: "Casual Classics",
    sub: "Relaxed fits, everyday style",
    cta: "SHOP MEN",
    link: "/men",
    image: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=900&q=80&auto=format",
  },
  {
    id: 3,
    label: "KIDS",
    title: "Playful Layers",
    sub: "Easy outfits for school and weekends",
    cta: "SHOP KIDS",
    link: "/kids",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=900&q=80&auto=format",
  },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("ALL");

  const filtered = activeTab === "ALL"
    ? products
    : products.filter((p) => p.category === activeTab.toLowerCase());

  const newArrivals = products.filter((p) => p.tag === "NEW").slice(0, 4);

  return (
    <main>
      {/* Hero */}
      <HeroTriple />

      {/* Promo strip */}
      <section className="bg-[#0a0a0a] text-white text-center py-3.5">
        <p className="text-[10px] tracking-[0.3em] font-light text-white/70 uppercase">
          Free shipping on orders over $50 &nbsp;&middot;&nbsp; New drops weekly &nbsp;&middot;&nbsp; Spring &rsquo;25 now live
        </p>
      </section>

      {/* Category campaigns */}
      <section className="grid md:grid-cols-3 gap-px bg-brand-dark">
        {campaigns.map((c) => (
          <Link key={c.id} to={c.link} className="relative overflow-hidden group h-[50vw] md:h-[35vw] max-h-[500px]">
            <img
              src={c.image}
              alt={c.label}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/20 to-transparent" />
            <div className="absolute top-6 left-0 right-0 text-center">
              <p className="text-white text-sm font-bold tracking-[0.3em]">{c.label}</p>
              <div className="w-8 h-px bg-brand-pink mx-auto mt-1.5" />
            </div>
            <div className="absolute bottom-8 left-0 right-0 text-center text-white">
              <h3 className="text-2xl font-light mb-1">{c.title}</h3>
              <p className="text-sm text-white/60 mb-4">{c.sub}</p>
              <span className="inline-block bg-brand-pink text-white text-xs font-bold tracking-widest px-6 py-2 group-hover:bg-brand-pink-h transition-colors">
                {c.cta}
              </span>
            </div>
          </Link>
        ))}
      </section>

      {/* New Arrivals */}
      <section className="max-w-screen-xl mx-auto px-4 py-14">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold tracking-widest">NEW ARRIVALS</h2>
          <Link to="/new" className="text-xs font-semibold tracking-widest text-brand-pink hover:text-brand-pink-h underline underline-offset-4">
            VIEW ALL
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {newArrivals.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Full-width banner */}
      <section className="relative h-[50vw] max-h-[550px] min-h-[250px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1400&q=80&auto=format"
          alt="Campaign"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/80 to-transparent" />
        <div className="absolute inset-0 flex items-center px-10 md:px-20">
          <div className="text-white max-w-md">
            <span className="text-xs font-bold tracking-[0.3em] text-brand-pink mb-3 block">LIMITED OFFER</span>
            <h2 className="text-3xl md:text-5xl font-light leading-tight mb-4">
              Up to 50% Off<br />Summer Picks
            </h2>
            <p className="text-sm text-white/60 mb-6">Shop our curated sale selection before it&apos;s gone.</p>
            <Link
              to="/sale"
              className="inline-block bg-brand-pink text-white text-xs font-bold tracking-widest px-8 py-3 hover:bg-brand-pink-h transition-colors"
            >
              SHOP SALE
            </Link>
          </div>
        </div>
      </section>

      {/* All Products with filter tabs */}
      <section className="max-w-screen-xl mx-auto px-4 py-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold tracking-widest">ALL PRODUCTS</h2>
          <div className="flex gap-1 border border-brand-pink/30 p-0.5">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-xs font-bold tracking-widest px-4 py-1.5 transition-all ${
                  activeTab === tab
                    ? "bg-brand-pink text-white"
                    : "text-gray-400 hover:text-brand-pink"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Features */}
      <section className="bg-brand-dark border-t border-white/10">
        <div className="max-w-screen-xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { iconEl: <Truck size={28} className="mx-auto mb-3 text-brand-pink" strokeWidth={1.5} />, title: "Free Shipping", sub: "On orders over $50" },
            { iconEl: <RotateCcw size={28} className="mx-auto mb-3 text-brand-pink" strokeWidth={1.5} />, title: "Easy Returns", sub: "30-day return policy" },
            { iconEl: <Lock size={28} className="mx-auto mb-3 text-brand-pink" strokeWidth={1.5} />, title: "Secure Payment", sub: "100% secure checkout" },
            { iconEl: <MessageSquare size={28} className="mx-auto mb-3 text-brand-pink" strokeWidth={1.5} />, title: "Live Support", sub: "24/7 customer chat" },
          ].map(({ iconEl, title, sub }) => (
            <div key={title} className="text-center">
              {iconEl}
              <h4 className="text-sm font-bold tracking-wide mb-1 text-white">{title}</h4>
              <p className="text-xs text-white/40">{sub}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
