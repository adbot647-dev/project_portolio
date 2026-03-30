import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShoppingBag, Search, Heart, Menu, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { to: "/women", label: "WOMEN" },
  { to: "/men", label: "MEN" },
  { to: "/kids", label: "KIDS" },
  { to: "/sale", label: "SALE", sale: true },
  { to: "/new", label: "NEW ARRIVALS" },
];

export default function Header() {
  const { totalItems, setIsOpen, wishlist } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-brand-pink text-white text-xs text-center py-2 tracking-widest font-semibold">
        FREE SHIPPING ON ORDERS OVER $50 &nbsp;&middot;&nbsp; NEW ARRIVALS EVERY WEEK &nbsp;&middot;&nbsp; SPRING COLLECTION NOW LIVE
      </div>

      <header
        className={`sticky top-0 z-50 bg-brand-dark transition-shadow duration-300 ${
          scrolled ? "shadow-[0_4px_24px_rgba(232,0,92,0.15)]" : "border-b border-white/10"
        }`}
      >
        <div className="max-w-screen-xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Mobile menu btn */}
          <button
            className="lg:hidden p-1 text-white"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>

          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src="/logo.png" alt="Logo" className="h-10 w-auto object-contain" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-xs font-semibold tracking-widest transition-colors ${
                    isActive
                      ? "text-brand-yellow border-b-2 border-brand-yellow pb-0.5"
                      : "text-white/80 hover:text-brand-pink"
                  } ${link.sale ? "!text-brand-pink hover:!text-brand-yellow" : ""}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen((s) => !s)}
              className="p-1.5 text-white/70 hover:text-brand-pink transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <Link
              to="/wishlist"
              className="p-1.5 text-white/70 hover:text-brand-pink transition-colors relative"
              aria-label="Wishlist"
            >
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-yellow text-brand-dark text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsOpen(true)}
              className="p-1.5 text-white/70 hover:text-brand-pink transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-pink text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-white/10 overflow-hidden bg-brand-maroon"
            >
              <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center gap-3">
                <Search size={16} className="text-brand-pink" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search for products, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 text-sm outline-none bg-transparent text-white placeholder-white/30"
                />
                <button onClick={() => setSearchOpen(false)}>
                  <X size={16} className="text-white/40 hover:text-white" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-50"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed top-0 left-0 h-full w-72 bg-brand-dark z-50 shadow-2xl flex flex-col border-r border-white/10"
            >
              <div className="flex items-center justify-between p-5 border-b border-white/10">
                <img src="/logo.png" alt="Logo" className="h-9 w-auto object-contain" />
                <button onClick={() => setMobileOpen(false)} className="text-white/60 hover:text-white">
                  <X size={22} />
                </button>
              </div>
              <nav className="flex flex-col p-5 gap-5">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={`text-sm font-semibold tracking-widest transition-colors ${
                      link.sale ? "text-brand-pink" : "text-white/80 hover:text-brand-pink"
                    }`}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
