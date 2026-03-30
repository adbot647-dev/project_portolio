import { createContext, useContext, useReducer, useState } from "react";

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const existing = state.find(
        (i) => i.id === action.item.id && i.size === action.item.size && i.color === action.item.color
      );
      if (existing) {
        return state.map((i) =>
          i.id === action.item.id && i.size === action.item.size && i.color === action.item.color
            ? { ...i, qty: i.qty + 1 }
            : i
        );
      }
      return [...state, { ...action.item, qty: 1 }];
    }
    case "REMOVE":
      return state.filter((i) => i.cartId !== action.cartId);
    case "UPDATE_QTY":
      return state.map((i) =>
        i.cartId === action.cartId ? { ...i, qty: action.qty } : i
      );
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [isOpen, setIsOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  const addToCart = (product, size, color) => {
    const cartId = `${product.id}-${size}-${color}`;
    dispatch({ type: "ADD", item: { ...product, size, color, cartId } });
    setIsOpen(true);
  };

  const removeFromCart = (cartId) => {
    dispatch({ type: "REMOVE", cartId });
  };

  const updateQty = (cartId, qty) => {
    if (qty < 1) return dispatch({ type: "REMOVE", cartId });
    dispatch({ type: "UPDATE_QTY", cartId, qty });
  };

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]
    );
  };

  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        setIsOpen,
        wishlist,
        addToCart,
        removeFromCart,
        updateQty,
        toggleWishlist,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);
