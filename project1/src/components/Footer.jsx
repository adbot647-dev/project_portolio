import { Link } from "react-router-dom";
import { Music, MessageCircle, Play, Rss, Check, Heart } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  const handleJoin = (e) => {
    e.preventDefault();
    if (email) {
      setJoined(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-brand-dark text-white mt-16">
      {/* Newsletter */}
      <div className="border-b border-gray-800">
        <div className="max-w-screen-xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-base font-bold tracking-widest mb-1">STAY IN THE LOOP</h3>
            <p className="text-sm text-gray-400">Get early access to drops, exclusive deals & style tips.</p>
          </div>
          {joined ? (
            <p className="text-green-400 text-sm font-medium flex items-center gap-1.5">
              <Check size={14} /> Thanks for subscribing!
            </p>
          ) : (
            <form onSubmit={handleJoin} className="flex w-full max-w-sm gap-0">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 bg-gray-800 border border-gray-700 text-white text-sm px-4 py-2.5 outline-none placeholder-gray-500 focus:border-white transition-colors"
              />
              <button
                type="submit"
                className="bg-brand-pink text-white text-xs font-bold tracking-widest px-5 py-2.5 hover:bg-brand-pink-h transition-colors flex-shrink-0"
              >
                JOIN
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Links */}
      <div className="max-w-screen-xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-5 gap-8">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <img src="/logo.png" alt="Logo" className="h-10 w-auto object-contain mb-4" />
          <p className="text-sm text-gray-400 leading-relaxed mb-4">
            Fashion for everyone.<br />Quality style at honest prices.
          </p>
          <div className="flex gap-4">
            {[Music, MessageCircle, Play, Rss].map((Icon, i) => (
              <a key={i} href="#" className="text-gray-500 hover:text-white transition-colors">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold tracking-widest mb-4 text-gray-300">SHOP</h4>
          <ul className="space-y-2.5">
            {["Women", "Men", "Kids", "Sale", "New Arrivals"].map((item) => (
              <li key={item}>
                <Link to="/" className="text-sm text-gray-500 hover:text-white transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold tracking-widest mb-4 text-gray-300">HELP</h4>
          <ul className="space-y-2.5">
            {["FAQ", "Size Guide", "Shipping Info", "Returns", "Contact Us"].map((item) => (
              <li key={item}>
                <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold tracking-widest mb-4 text-gray-300">COMPANY</h4>
          <ul className="space-y-2.5">
            {["About GU", "Sustainability", "Careers", "Press", "Stores"].map((item) => (
              <li key={item}>
                <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold tracking-widest mb-4 text-gray-300">LEGAL</h4>
          <ul className="space-y-2.5">
            {["Privacy Policy", "Terms of Service", "Cookie Policy", "Accessibility"].map((item) => (
              <li key={item}>
                <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-screen-xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-gray-600">
          <p>© 2025 GU Fashion. All rights reserved.</p>
          <p className="flex items-center gap-1">Made with <Heart size={11} className="fill-red-500 text-red-500" /> &middot; Built with React + Tailwind</p>
        </div>
      </div>
    </footer>
  );
}
