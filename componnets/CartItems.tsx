"use client";
import { useCart } from "@/contexts/CartContext";
import Image from "next/image";
import Link from "next/link";
import Container from "./Container";

export default function Cart() {
  const { state, dispatch } = useCart();

  const increaseQty = (id: string, qty: number) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { product_id: id, quantity: qty + 1 },
    });
  };

  const decreaseQty = (id: string, qty: number) => {
    if (qty > 1) {
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { product_id: id, quantity: qty - 1 },
      });
    }
  };

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  return (
    <Container className="font-roboto grid grid-cols-1 gap-10 p-6 lg:grid-cols-3">
      {/* LEFT SIDE - Cart Items */}
      <div className="space-y-6 rounded-lg p-6 lg:col-span-2">
        {/* Header */}
        <div className="grid grid-cols-4 border-b-2 pb-3 font-semibold text-gray-600">
          <h3 className="col-span-2">Product</h3>
          <h3>Price</h3>
          <h3>Quantity</h3>
        </div>

        {/* Cart Items */}
        {state.items.length === 0 ? (
          <p className="py-6 text-gray-500">Your cart is empty.</p>
        ) : (
          state.items.map((item) => (
            <div
              key={item.product_id}
              className="grid grid-cols-4 items-center border-b border-gray-200 pb-6"
            >
              {/* Product Info */}
              <div className="col-span-2 flex items-center gap-4">
                {/* Product Image (placeholder) */}
                <div className="h-20 w-20 overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={item.image}
                    width={80}
                    height={80}
                    alt="product"
                    className="object-cover"
                  />
                </div>

                <span className="font-semibold text-gray-700">{item.name}</span>
              </div>

              {/* Price */}
              <p className="font-semibold text-gray-700">${item.price}.00</p>

              {/* Quantity */}
              <div className="flex items-center gap-2">
                <button
                  className="rounded border px-2 hover:bg-gray-200"
                  onClick={() => decreaseQty(item.product_id, item.quantity)}
                >
                  -
                </button>

                <span className="w-8 text-center">{item.quantity}</span>

                <button
                  className="rounded border px-2 hover:bg-gray-200"
                  onClick={() => increaseQty(item.product_id, item.quantity)}
                >
                  +
                </button>

                {/* Remove Item */}
                <button
                  className="ml-4 text-xl text-orange-500 hover:text-orange-700"
                  onClick={() => removeItem(item.product_id)}
                >
                  ×
                </button>
              </div>
            </div>
          ))
        )}

        {/* Bottom Row: Coupon + Update Buttons */}
        <div className="flex flex-col items-center justify-between gap-4 pt-4 md:flex-row">
          <div className="flex w-full gap-3 md:w-auto">
            <input
              type="text"
              placeholder="Coupon code"
              className="w-full rounded-md border px-4 py-2"
            />
            <button className="w-[200px] rounded-md bg-[#0D9B4D] px-4 py-2 text-white hover:bg-green-600">
              Apply Coupon
            </button>
          </div>

          <button className="rounded-md bg-[#0D9B4D] px-6 py-2 text-white hover:bg-green-600">
            Update Cart
          </button>
        </div>
      </div>

      {/* RIGHT SIDE - Cart Total */}
      <div className="h-fit rounded-lg border border-gray-200 p-6">
        <h2 className="price mb-6 border-b border-gray-200 pb-2 text-2xl font-medium">
          CART TOTALS
        </h2>

        <div className="flex justify-between text-gray-600">
          <span className="font-bold">Subtotal</span>
          <span className="font-semibold">${state.total.toFixed(0)}.00</span>
        </div>

        <div className="mt-2 mb-7 flex justify-between border-t border-b border-gray-200 py-2 text-lg font-bold">
          <span>Total</span>
          <span>${state.total.toFixed(0)}.00</span>
        </div>

        <Link
          href="/checkout"
          className="mt-10 w-full rounded-full bg-[#0D9B4D] px-20 py-3 font-semibold text-white hover:bg-green-600"
        >
          Proceed To Checkout
        </Link>
      </div>
    </Container>
  );
}
