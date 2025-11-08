"use client";

import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

interface PlaceOrderProps {
  onPlaceOrder: () => Promise<boolean>;
  offer?: any;
}

export default function PlaceOrder({ onPlaceOrder, offer }: PlaceOrderProps) {
  const { state, dispatch } = useCart();

  const handlePlaceOrder = async () => {
    if (!offer && state.items.length === 0) {
      toast.error("No items selected for purchase.", { duration: 3000 });
      return;
    }

    const success = await onPlaceOrder();
    if (!success) return;

    toast.success("Order placed successfully!", { duration: 3000 });

    if (!offer) dispatch({ type: "CLEAR_CART" });
  };

  const itemsToShow = offer ? [offer] : state.items;

  // Calculate total: use `total_price` if offer, else price*quantity
  const total = itemsToShow.reduce((sum, item) => {
    if (item.total_price) return sum + item.total_price;
    return sum + item.price * (item.quantity || 1);
  }, 0);

  return (
    <div className="text-black-200 border-primary max-h-fit w-full max-w-[30%] border-[1.5px] p-6">
      <h2 className="mb-4 text-2xl font-extrabold tracking-wide">YOUR ORDER</h2>

      <div className="border-black-700 text-black-400 flex justify-between border-b border-b-gray-200 pb-2 text-sm font-semibold">
        <span>Product</span>
        <span>Subtotal</span>
      </div>

      {itemsToShow.length > 0 ? (
        itemsToShow.map((item) => (
          <div
            key={item.product_id || item.id}
            className="border-black-700 flex justify-between border-b border-b-gray-200 py-3 text-sm"
          >
            <span>
              {item.name} × {item.quantity || item.units || 1}
            </span>
            <span className="font-semibold">
              $
              {item.total_price?.toFixed(2) ||
                (item.price * (item.quantity || 1)).toFixed(2)}
            </span>
          </div>
        ))
      ) : (
        <div className="border-b border-b-gray-200 py-3 text-sm text-gray-500">
          No products selected.
        </div>
      )}

      <div className="border-black-700 flex justify-between border-b border-b-gray-200 py-3 text-sm">
        <span className="font-semibold">Subtotal</span>
        <span className="font-semibold">${total.toFixed(2)}</span>
      </div>

      <div className="border-black-700 flex justify-between border-b border-b-gray-200 py-3">
        <span className="text-lg font-bold">Total</span>
        <span className="text-lg font-bold">${total.toFixed(2)}</span>
      </div>

      <p className="text-black-400 mt-4 text-sm leading-relaxed">
        Sorry, it seems that there are no available payment methods for your
        state. Please contact us if you require assistance or wish to make
        alternate arrangements.
      </p>

      <p className="text-black-400 mt-4 text-sm leading-relaxed">
        Your personal data will be used to process your order, support your
        experience throughout this website, and for other purposes described in
        our{" "}
        <a href="#" className="text-yellow-500 underline">
          privacy policy
        </a>
        .
      </p>

      <button
        onClick={handlePlaceOrder}
        className="font-roboto mt-6 w-full rounded-full bg-[#0D9B4D] py-3 text-center font-semibold text-white transition hover:bg-green-700"
      >
        Place Order
      </button>
    </div>
  );
}
