"use client";

import { useCart } from "@/contexts/CartContext";
import React, { useState } from "react";
import { toast } from "sonner";

interface ProductDetailCartBtnProps {
  product: {
    product_id: string;
    name: string;
    price: number;
    image: string;
  };
}

export default function ProductDetailCartBtn({
  product,
}: ProductDetailCartBtnProps) {
  const { dispatch } = useCart();
  const [qty, setQty] = useState<number>(1);

  const increase = () => setQty((q) => q + 1);
  const decrease = () => setQty((q) => (q > 1 ? q - 1 : 1));

  const addToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        product_id: product.product_id,
        name: product.name,
        price: product.price,
        quantity: qty,
        image: product.image,
      },
    });
    toast.success(`${product.name} added to cart!`, { duration: 2000 });
  };

  return (
    <div className="mb-6 flex items-center gap-3">
      {/* Quantity Selector */}
      <div className="flex items-center rounded-sm border border-gray-300">
        <button
          onClick={decrease}
          className="border-r border-gray-300 px-3.5 py-2 text-lg font-semibold hover:bg-gray-100"
        >
          -
        </button>

        <span className="border-x border-gray-300 px-5 py-2">{qty}</span>

        <button
          onClick={increase}
          className="border-l border-gray-300 px-3.5 py-2 text-lg font-semibold hover:bg-gray-100"
        >
          +
        </button>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={addToCart}
        className="font-roboto rounded-sm bg-[#0D9B4D] px-5 py-3 text-[14px] font-bold text-white transition hover:bg-green-700"
      >
        ADD TO CART
      </button>
    </div>
  );
}
