"use client";

import { useCart } from "@/contexts/CartContext";

type CartBtnProps = {
  children: React.ReactNode;
  product_detail: {
    product_id: string;
    name: string;
    price: number;
    image: string;
  };
};

export default function CartBtn({ children, product_detail }: CartBtnProps) {
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        product_id: product_detail.product_id,
        name: product_detail.name,
        price: product_detail.price,
        image: product_detail.image,
        quantity: 1,
      },
    });
  };

  return (
    <button onClick={handleAddToCart} className="mt-0o">
      {children}
    </button>
  );
}
