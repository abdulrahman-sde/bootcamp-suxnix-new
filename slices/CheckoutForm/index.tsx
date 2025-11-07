"use client";
import { FC, useState } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Container from "@/componnets/Container";
import PlaceOrder from "@/componnets/PlaceOrder";

export type CheckoutForm2Props =
  SliceComponentProps<Content.CheckoutForm2Slice>;

const countries = ["United Kingdom (UK)", "United States (US)", "Pakistan"];
const districts = ["Alabama", "London", "Punjab"];

const CheckoutForm2: FC<CheckoutForm2Props> = ({ slice }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (
    e: React.FormEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    await fetch("https://formspree.io/f/yourFormId", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
  };

  return (
    <Container className="mx-auto flex w-full gap-10 px-4 py-12">
      <div className="w-full max-w-[70%] border border-gray-200 p-6">
        <h1 className="mb-6 border-b pb-2 text-2xl font-bold tracking-wide uppercase">
          {slice.primary.billing_detail_heading}
        </h1>

        <form onSubmit={handleSubmit} className="b font-roboto space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {slice.primary.fields.map((item, index) => (
              <div key={index}>
                <label className="text-sm font-medium">
                  {item.field_label}
                </label>
                <input
                  name={item.field_label?.toLowerCase().replace(/\s+/g, "_")}
                  type={item.type || "text"}
                  placeholder={item.placeholder || ""}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-sm bg-gray-100 px-3 py-2 focus:ring-2 focus:ring-gray-700"
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Country / Region *</label>
              <select
                name="country"
                onChange={handleChange}
                className="mt-1 w-full rounded-sm bg-gray-100 px-3 py-2 focus:ring-2 focus:ring-gray-700"
              >
                {countries.map((c, i) => (
                  <option key={i}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">District *</label>
              <select
                name="district"
                onChange={handleChange}
                className="mt-1 w-full rounded-sm bg-gray-100 px-3 py-2 focus:ring-2 focus:ring-gray-700"
              >
                {districts.map((d, i) => (
                  <option key={i}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          <h2 className="price mt-10 mb-2 border-b border-b-gray-200 pb-2 text-xl font-bold tracking-wide uppercase">
            {slice.primary.additional_info_heading}
          </h2>
          <label htmlFor="" className="text-[14px] text-gray-400">
            {" "}
            Order Notes (optional)
          </label>
          <textarea
            name="additional_info"
            placeholder={
              slice.primary.placeholder || "Notes about your order..."
            }
            onChange={handleChange}
            className="mt-2 h-32 w-full rounded-sm bg-gray-100 px-3 py-3 focus:ring-2 focus:ring-gray-700"
          ></textarea>

          <button
            type="submit"
            className="w-full rounded-lg bg-black py-3 text-white transition hover:bg-gray-800"
          >
            Submit Order
          </button>
        </form>
      </div>
      <PlaceOrder />
    </Container>
  );
};

export default CheckoutForm2;
