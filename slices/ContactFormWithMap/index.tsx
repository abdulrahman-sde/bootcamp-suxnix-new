"use client";

import { FC, useState } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Container from "@/componnets/Container";

export type ContactFormWithMapProps =
  SliceComponentProps<Content.ContactFormWithMapSlice>;

const ContactFormWithMap: FC<ContactFormWithMapProps> = ({ slice }) => {
  // const formspreeEndpoint = slice.primary.formspree_endpoint;

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"success" | "error" | "">("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    const formData = new FormData(e.currentTarget);

    // try {
    //   const response = await fetch(formspreeEndpoint, {
    //     method: "POST",
    //     body: formData,
    //     headers: {
    //       Accept: "application/json",
    //     },
    //   });

    //   if (response.ok) {
    //     setStatus("success");
    //     e.currentTarget.reset();
    //   } else {
    //     setStatus("error");
    //   }
    // } catch {
    //   setStatus("error");
    // }

    setLoading(false);
  };

  return (
    <Container
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="px-6 py-20"
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* LEFT — MAP */}
        <div className="h-[500px] w-full overflow-hidden rounded-lg shadow">
          <iframe
            src={slice.primary.map_link || ""}
            className="h-full w-full"
            loading="lazy"
          ></iframe>
        </div>

        {/* RIGHT — FORM */}
        <div>
          <p className="text-primary mb-1 text-sm tracking-widest uppercase">
            {slice.primary.subtitle}
          </p>

          <h1 className="upper mb-8 text-5xl leading-tight font-medium text-gray-900 uppercase">
            {slice.primary.heading}
          </h1>

          <form onSubmit={handleSubmit} className="font-roboto space-y-6">
            {/* Full Name + Email Row */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  {slice.primary.full_name_label}
                </label>
                <input
                  name="fullName"
                  type="text"
                  required
                  placeholder="Enter here "
                  className="w-full rounded-md border border-gray-200 px-4 py-3 placeholder:text-[14px] focus:ring-2 focus:ring-green-300"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  {slice.primary.email_address_label}
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Enter here "
                  className="w-full rounded-md border border-gray-200 px-4 py-3 placeholder:text-[14px] focus:ring-2 focus:ring-green-300"
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              {/* <label className="mb-2 block text-sm font-medium">
                {slice.primary.subject_label}
              </label> */}
              <select
                name="subject"
                required
                className="w-full rounded-md border border-gray-200 bg-white px-4 py-3 pr-6 focus:ring-2 focus:ring-green-300"
              >
                <option value="">Select Subject</option>
                {slice.primary.subject_options.map((option, index) => (
                  <option key={index}>{option.subject_option}</option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                {slice.primary.message_label}
              </label>
              <textarea
                name="message"
                rows={5}
                required
                placeholder="Enter here"
                className="w-full resize-none rounded-md border border-gray-200 px-4 py-3 placeholder:text-[14px] focus:ring-2 focus:ring-green-300"
              ></textarea>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-green-700/75 px-8 py-3 font-semibold text-white capitalize transition hover:bg-green-600 disabled:opacity-50"
            >
              {loading ? "Sending..." : slice.primary.button_text}
            </button>

            {/* Status Messages */}
            {status === "success" && (
              <p className="font-medium text-green-600">
                ✅ Your message has been sent!
              </p>
            )}
            {status === "error" && (
              <p className="font-medium text-red-600">
                ❌ Something went wrong. Please try again.
              </p>
            )}
          </form>
        </div>
      </div>
    </Container>
  );
};

export default ContactFormWithMap;
