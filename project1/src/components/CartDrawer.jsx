import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function CartDrawer() {
  const { cart, isOpen, setIsOpen, removeFromCart, updateQty, subtotal, totalItems } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col border-l-2 border-brand-pink"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b bg-brand-dark text-white">
              <h2 className="font-bold text-sm tracking-widest flex items-center gap-2">
                <ShoppingBag size={18} className="text-brand-pink" />
                MY BAG ({totalItems})
              </h2>
              <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white">
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-gray-400">
                  <ShoppingBag size={48} strokeWidth={1} />
                  <p className="text-sm">Your bag is empty</p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-xs font-semibold tracking-widest underline underline-offset-2"
                  >
                    CONTINUE SHOPPING
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.cartId} className="flex gap-3 border-b pb-4">
                    <div className="w-20 h-24 flex-shrink-0 bg-gray-50 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium leading-tight truncate">{item.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Size: {item.size} · Color: <span className="inline-block w-3 h-3 rounded-full align-middle border border-gray-200" style={{ background: item.color }} />
                      </p>
                      <p className="text-sm font-semibold mt-1">${item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center border border-gray-200">
                          <button
                            className="p-1 hover:bg-gray-50"
                            onClick={() => updateQty(item.cartId, item.qty - 1)}
                          >
                            <Minus size={12} />
                          </button>
                          <span className="px-3 text-sm">{item.qty}</span>
                          <button
                            className="p-1 hover:bg-gray-50"
                            onClick={() => updateQty(item.cartId, item.qty + 1)}
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.cartId)}
                          className="text-gray-400 hover:text-black transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="px-5 py-4 border-t space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-400 text-center">Shipping calculated at checkout</p>
                <button className="w-full bg-brand-pink text-white py-3.5 text-sm font-bold tracking-widest hover:bg-brand-pink-h transition-colors">
                  CHECKOUT
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full border border-brand-pink/40 text-brand-pink py-3 text-sm font-semibold tracking-widest hover:bg-brand-pink/5 transition-colors"
                >
                  CONTINUE SHOPPING
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
