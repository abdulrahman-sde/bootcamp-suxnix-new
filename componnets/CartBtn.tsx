"use client";

import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

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

    toast.success(`${product_detail.name} added to cart!`, { duration: 2000 });
  };

  return (
    <button onClick={handleAddToCart} className="mt-0o">
      {children}
    </button>
  );
}
