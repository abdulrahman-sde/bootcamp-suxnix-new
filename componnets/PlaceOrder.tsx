"use client";

import { useCart } from "@/contexts/CartContext";

export default function PlaceOrder() {
  const { state } = useCart();

  return (
    <div className="text-black-200 border-primary w-full max-w-[30%] border-[1.5px] p-6">
      {/* Title */}
      <h2 className="mb-4 text-2xl font-extrabold tracking-wide">YOUR ORDER</h2>

      {/* Header Row */}
      <div className="border-black-700 text-black-400 flex justify-between border-b border-b-gray-200 pb-2 text-sm font-semibold">
        <span>Product</span>
        <span>Subtotal</span>
      </div>

      {/* Product Items */}
      {state.items.map((item) => (
        <div
          key={item.product_id}
          className="border-black-700 flex justify-between border-b border-b-gray-200 py-3 text-sm"
        >
          <span>
            {item.name} × {item.quantity}
          </span>
          <span className="font-semibold">
            ${(item.price * item.quantity).toFixed(2)}
          </span>
        </div>
      ))}

      {/* Subtotal */}
      <div className="border-black-700 flex justify-between border-b border-b-gray-200 py-3 text-sm">
        <span className="font-semibold">Subtotal</span>
        <span className="font-semibold">${state.total.toFixed(2)}</span>
      </div>

      {/* Total */}
      <div className="border-black-700 flex justify-between border-b border-b-gray-200 py-3">
        <span className="text-lg font-bold">Total</span>
        <span className="text-lg font-bold">${state.total.toFixed(2)}</span>
      </div>

      {/* Warning Text */}
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

      {/* Button */}
      <button className="font-roboto mt-6 w-full rounded-full bg-[#0D9B4D] py-3 text-center font-semibold text-white transition hover:bg-green-700">
        Place Order
      </button>
    </div>
  );
}
