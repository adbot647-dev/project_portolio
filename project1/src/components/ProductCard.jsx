import { useState } from "react";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import ProductModal from "./ProductModal";

export default function ProductCard({ product }) {
  const { wishlist, toggleWishlist } = useCart();
  const [hovered, setHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalKey, setModalKey] = useState(0);
  const isWishlisted = wishlist.includes(product.id);

  const openModal = () => {
    setModalKey((k) => k + 1);
    setModalOpen(true);
  };

  const tagColor =
    product.tag === "SALE"
      ? "bg-brand-yellow text-brand-dark"
      : product.tag === "NEW"
      ? "bg-brand-pink text-white"
      : "";

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="group cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image */}
        <div
          className="relative overflow-hidden bg-gray-50 aspect-[3/4]"
          onClick={openModal}
        >
          <img
            src={hovered && product.hoverImage ? product.hoverImage : product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&q=80&auto=format";
            }}
          />

          {/* Tag */}
          {product.tag && (
            <span
              className={`absolute top-2 left-2 ${tagColor} text-[10px] font-bold px-2 py-0.5 tracking-widest`}
            >
              {product.tag}
            </span>
          )}

          {/* Wishlist */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow transition-all hover:scale-110"
            aria-label="Wishlist"
          >
            <Heart
              size={16}
              className={isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"}
            />
          </button>

          {/* Quick add overlay */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
            className="absolute bottom-0 left-0 right-0 bg-brand-pink text-white text-xs font-bold tracking-widest py-3 text-center"
            onClick={openModal}
          >
            QUICK ADD
          </motion.div>
        </div>

        {/* Info */}
        <div className="mt-2.5 space-y-1">
          <p className="text-sm font-medium leading-snug">{product.name}</p>
          <div className="flex items-center gap-2">
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            <span
              className={`text-sm font-semibold ${
                product.originalPrice ? "text-brand-pink" : ""
              }`}
            >
              ${product.price.toFixed(2)}
            </span>
          </div>
          {/* Color dots */}
          <div className="flex items-center gap-1.5 pt-0.5">
            {product.colors.map((c) => (
              <span
                key={c}
                className="w-3 h-3 rounded-full border border-gray-200 cursor-pointer hover:scale-125 transition-transform"
                style={{ background: c }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      <ProductModal
        key={modalKey}
        product={product}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
