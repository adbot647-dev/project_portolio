import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import WishlistPage from "./pages/WishlistPage";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <CartDrawer />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/women"
                element={
                  <CategoryPage
                    category="women"
                    title="WOMEN"
                    banner="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&q=80&auto=format"
                  />
                }
              />
              <Route
                path="/men"
                element={
                  <CategoryPage
                    category="men"
                    title="MEN"
                    banner="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=1400&q=80&auto=format"
                  />
                }
              />
              <Route
                path="/new"
                element={
                  <CategoryPage
                    tag="NEW"
                    title="NEW ARRIVALS"
                    banner="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1400&q=80&auto=format"
                  />
                }
              />
              <Route
                path="/sale"
                element={
                  <CategoryPage
                    tag="SALE"
                    title="SALE"
                    banner="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1400&q=80&auto=format"
                  />
                }
              />
              <Route
                path="/kids"
                element={
                  <CategoryPage
                    category="kids"
                    title="KIDS"
                    banner="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1400&q=80&auto=format"
                  />
                }
              />
              <Route path="/wishlist" element={<WishlistPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
