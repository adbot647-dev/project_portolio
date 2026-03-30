import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

export default function WishlistPage() {
  const { wishlist } = useCart();
  const wishlisted = products.filter((p) => wishlist.includes(p.id));

  return (
    <main className="max-w-screen-xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-8">
        <Heart size={22} className="text-brand-pink" />
        <h1 className="text-xl font-bold tracking-widest">
          MY WISHLIST ({wishlisted.length})
        </h1>
      </div>

      {wishlisted.length === 0 ? (
        <div className="text-center py-24 text-gray-400">
          <Heart size={48} strokeWidth={1} className="mx-auto mb-4" />
          <p className="text-sm font-semibold tracking-widest mb-2">YOUR WISHLIST IS EMPTY</p>
          <p className="text-xs mb-6">Save items you love by tapping the heart icon.</p>
          <Link
            to="/"
            className="inline-block bg-brand-pink text-white text-xs font-bold tracking-widest px-8 py-3 hover:bg-brand-pink-h transition-colors"
          >
            EXPLORE PRODUCTS
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {wishlisted.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </main>
  );
}
