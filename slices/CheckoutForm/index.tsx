"use client";

import { FC, useState, useEffect } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Container from "@/componnets/Container";
import PlaceOrder from "@/componnets/PlaceOrder";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { CheckoutSchema } from "@/lib/zodSchema";

export type CheckoutForm2Props =
  SliceComponentProps<Content.CheckoutForm2Slice>;

const countries = ["United Kingdom (UK)", "United States (US)", "Pakistan"];
const districts = ["Alabama", "London", "Punjab"];

const CheckoutForm2: FC<CheckoutForm2Props> = ({ slice }) => {
  const { state } = useCart();
  const params = useSearchParams();
  const [offer, setOffer] = useState<any>(null);

  // ✅ Initialize formData with all fields
  const [formData, setFormData] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    slice.primary.fields.forEach((item) => {
      const fieldName =
        item.field_label?.toLowerCase().replace(/\s+/g, "_") || "";
      initial[fieldName] = "";
    });
    initial.country = countries[0];
    initial.district = districts[0];
    initial.additional_info = "";
    return initial;
  });

  useEffect(() => {
    const offerParam = params.get("offer");
    if (offerParam) setOffer(JSON.parse(offerParam));
  }, [params]);

  const handleChange = (
    e: React.FormEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleSubmit = async () => {
    // ✅ Validate using Zod
    const validation = CheckoutSchema.safeParse(formData);

    if (!validation.success) {
      const errors = validation.error.issues;
      toast.error(
        `${errors[0].message}
      `,
      );
      return false;
    }

    // ✅ Payload: offer or cart
    const payload = offer ? { items: [offer] } : { items: state.items };

    try {
      const response = await fetch("https://formspree.io/f/mpwkapyb", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, ...payload }),
      });

      if (response.ok) {
        toast.success("Order placed successfully!");
        return true;
      } else {
        toast.error("Failed to place order. Please try again.");
        return false;
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Failed to send form data");
      return false;
    }
  };

  return (
    <Container className="mx-auto flex w-full flex-col gap-10 px-4 py-12 md:flex-row">
      <div className="w-full border border-gray-200 p-6 md:max-w-[70%]">
        <h1 className="mb-6 border-b pb-2 text-2xl font-bold tracking-wide uppercase">
          {slice.primary.billing_detail_heading}
        </h1>

        <div className="font-roboto space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {slice.primary.fields.map((item, index) => {
              const fieldName =
                item.field_label?.toLowerCase().replace(/\s+/g, "_") || "";

              return (
                <div key={index}>
                  <label className="text-sm font-medium">
                    {item.field_label}
                  </label>
                  <input
                    name={fieldName}
                    required={item.required}
                    type={item.type || "text"}
                    placeholder={item.placeholder || ""}
                    value={formData[fieldName]}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-sm bg-[#F5F5F5] px-3 py-2.5 focus:ring-2 focus:ring-gray-700"
                  />
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Country / Region *</label>
              <select
                name="country"
                required
                value={formData.country}
                onChange={handleChange}
                className="mt-1 w-full rounded-sm bg-[#F5F5F5] px-3 py-2.5 text-[14px] focus:ring-2 focus:ring-gray-700"
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
                value={formData.district}
                onChange={handleChange}
                className="mt-1 w-full rounded-sm bg-[#F5F5F5] px-3 py-3 text-[14px] focus:ring-2 focus:ring-gray-700"
              >
                {districts.map((d, i) => (
                  <option key={i} className="py-3">
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <h2 className="price mt-10 mb-2 border-b border-b-gray-200 pb-2 text-xl font-bold tracking-wide uppercase">
            {slice.primary.additional_info_heading}
          </h2>

          <label className="text-[14px] text-gray-400">
            Order Notes (optional)
          </label>

          <textarea
            name="additional_info"
            placeholder={
              slice.primary.placeholder || "Notes about your order..."
            }
            value={formData.additional_info}
            onChange={handleChange}
            className="mt-2 h-32 w-full rounded-sm bg-[#F5F5F5] px-3 py-3 focus:ring-2 focus:ring-gray-700"
          />
        </div>
      </div>

      <PlaceOrder onPlaceOrder={handleSubmit} offer={offer} />
    </Container>
  );
};

export default CheckoutForm2;
