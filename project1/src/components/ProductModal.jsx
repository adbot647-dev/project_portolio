import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, ShoppingBag, Check } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function ProductModal({ product, isOpen, onClose }) {
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] ?? null);
  const [added, setAdded] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const isWishlisted = wishlist.includes(product?.id);

  const handleAdd = () => {
    if (!selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 1500);
      return;
    }
    addToCart(product, selectedSize, selectedColor);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <div
              className="bg-white w-full max-w-3xl rounded-none shadow-2xl overflow-hidden flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image */}
              <div className="md:w-1/2 aspect-square md:aspect-auto bg-gray-50 flex-shrink-0">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&q=80&auto=format";
                  }}
                />
              </div>

              {/* Details */}
              <div className="md:w-1/2 p-7 flex flex-col relative overflow-y-auto">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full"
                >
                  <X size={18} />
                </button>

                {product.tag && (
                  <span
                    className={`text-[10px] font-bold tracking-widest mb-2 ${
                      product.tag === "SALE" ? "text-brand-yellow" : "text-brand-pink"
                    }`}
                  >
                    {product.tag}
                  </span>
                )}

                <h2 className="text-lg font-bold leading-snug mb-1">{product.name}</h2>

                <div className="flex items-center gap-3 mb-4">
                  {product.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                  <span
                    className={`text-xl font-bold ${
                      product.originalPrice ? "text-brand-pink" : ""
                    }`}
                  >
                    ${product.price.toFixed(2)}
                  </span>
                </div>

                <p className="text-sm text-gray-500 leading-relaxed mb-5">
                  {product.description}
                </p>

                {/* Color */}
                <div className="mb-4">
                  <p className="text-xs font-semibold tracking-widest mb-2">
                    COLOR
                  </p>
                  <div className="flex gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c}
                        onClick={() => setSelectedColor(c)}
                        className={`w-7 h-7 rounded-full border-2 transition-all ${
                          selectedColor === c
                            ? "border-brand-pink scale-110"
                            : "border-gray-200 hover:border-brand-pink"
                        }`}
                        style={{ background: c }}
                      />
                    ))}
                  </div>
                </div>

                {/* Size */}
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold tracking-widest">SIZE</p>
                    <button className="text-xs text-gray-400 underline underline-offset-2">
                      Size Guide
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`border text-xs font-medium px-3 py-1.5 transition-all ${
                          selectedSize === s
                            ? "border-brand-pink bg-brand-pink text-white"
                            : "border-gray-200 hover:border-brand-pink"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  {sizeError && (
                    <p className="text-red-500 text-xs mt-1">Please select a size</p>
                  )}
                </div>

                {/* CTA */}
                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={handleAdd}
                    className={`flex-1 py-3.5 text-sm font-bold tracking-widest transition-all flex items-center justify-center gap-2 ${
                      added
                        ? "bg-green-600 text-white"
                        : "bg-brand-pink text-white hover:bg-brand-pink-h"
                    }`}
                  >
                    {added ? (
                      <>
                        <Check size={16} /> ADDED!
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={16} /> ADD TO BAG
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`border px-3.5 py-3 transition-colors ${
                      isWishlisted
                        ? "border-brand-pink text-brand-pink"
                        : "border-gray-200 hover:border-brand-pink"
                    }`}
                    aria-label="Wishlist"
                  >
                    <Heart size={18} className={isWishlisted ? "fill-red-500" : ""} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
