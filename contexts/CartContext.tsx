"use client";
import React, { createContext, useContext, useReducer, ReactNode } from "react";

interface CartItem {
  product_id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItem[];
  total: number;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | {
      type: "UPDATE_QUANTITY";
      payload: { product_id: string; quantity: number };
    }
  | { type: "CLEAR_CART" };

interface CartContextType {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(
        (item) => item.product_id === action.payload.product_id,
      );

      if (existingItem) {
        const updatedItems = state.items.map((item) =>
          item.product_id === action.payload.product_id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item,
        );
        return {
          items: updatedItems,
          total: updatedItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0,
          ),
        };
      }

      const newItems = [...state.items, action.payload];
      return {
        items: newItems,
        total: newItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0,
        ),
      };
    }

    case "REMOVE_ITEM": {
      const filteredItems = state.items.filter(
        (item) => item.product_id !== action.payload,
      );
      return {
        items: filteredItems,
        total: filteredItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0,
        ),
      };
    }

    case "UPDATE_QUANTITY": {
      const updatedItems = state.items.map((item) =>
        item.product_id === action.payload.product_id
          ? { ...item, quantity: action.payload.quantity }
          : item,
      );
      return {
        items: updatedItems,
        total: updatedItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0,
        ),
      };
    }

    case "CLEAR_CART":
      return { items: [], total: 0 };

    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });
  console.log("Cart State:", state); // Debugging line
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
