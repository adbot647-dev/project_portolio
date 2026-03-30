import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

const sortOptions = [
  { label: "Newest", value: "new" },
  { label: "Price: Low to High", value: "asc" },
  { label: "Price: High to Low", value: "desc" },
];

export default function CategoryPage({ category, tag, title, banner }) {
  const [sort, setSort] = useState("new");
  const [sortOpen, setSortOpen] = useState(false);

  const filtered = (() => {
    if (tag) return products.filter((p) => p.tag === tag);
    if (category === "all") return [...products];
    return products.filter((p) => p.category === category);
  })();

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "asc") return a.price - b.price;
    if (sort === "desc") return b.price - a.price;
    return b.id - a.id;
  });

  return (
    <main>
      {/* Banner */}
      <div className="relative h-56 md:h-72 overflow-hidden">
        <img
          src={banner}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-6xl font-bold tracking-[0.3em]">{title}</h1>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-8">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6 border-b pb-4">
          <p className="text-sm text-gray-500">{sorted.length} products</p>
          <div className="relative">
            <button
              onClick={() => setSortOpen((s) => !s)}
              className="flex items-center gap-2 text-sm font-medium border border-gray-200 px-4 py-2 hover:border-brand-pink transition-colors"
            >
              <SlidersHorizontal size={14} />
              {sortOptions.find((o) => o.value === sort)?.label}
              <ChevronDown size={14} />
            </button>
            <AnimatePresence>
              {sortOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute right-0 top-full mt-1 bg-white border border-gray-200 shadow-lg z-10 min-w-[180px]"
                >
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => { setSort(opt.value); setSortOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${
                        sort === opt.value ? "font-semibold" : ""
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Grid */}
        {sorted.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <p className="text-4xl mb-4">👀</p>
            <p className="text-sm font-semibold tracking-widest">COMING SOON</p>
            <p className="text-xs mt-1">This collection is on its way.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sorted.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </main>
  );
}
