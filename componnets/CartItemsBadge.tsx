"use client";

import { useCart } from "@/contexts/CartContext";

export default function CartItemsBadge() {
  const { state } = useCart();
  console.log("Cart state in CartItemsBadge:", state.items.length);
  return (
    <div>
      {state.items.length > 0 && (
        <span className="bg-primary font-roboto absolute -top-2 left-5 inline-flex items-center justify-center rounded-full px-2 py-1 text-xs font-bold text-white">
          {state.items.length}
        </span>
      )}
    </div>
  );
}
