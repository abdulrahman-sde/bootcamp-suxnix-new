"use client";

import { FC, useState } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

/**
 * Props for `AccordionFaq`.
 */
export type AccordionFaqProps = SliceComponentProps<Content.AccordionFaqSlice>;

/**
 * Component for "AccordionFaq" Slices.
 */
const AccordionFaq: FC<AccordionFaqProps> = ({ slice }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-white py-16 md:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Side - Latest News */}
          <div>
            {/* News Header */}
            <p className="mb-2 text-[15px] font-semibold tracking-wider text-[#FAA432]">
              .. {slice.primary.latest_new_eyebrow} ..
            </p>
            <h2 className="mb-8 text-4xl font-medium text-gray-900 uppercase md:text-[50px]">
              {slice.primary.latest_new_heading}
            </h2>

            {/* News Items */}
            <div className="space-y-6">
              {slice.primary.news.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                >
                  {/* News Image */}
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg sm:h-28 sm:w-28">
                    <PrismicNextImage
                      field={item.image}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* News Content */}
                  <div className="flex flex-1 flex-col">
                    {/* Tips & Tricks + Time */}
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-[14px] font-semibold text-gray-700 uppercase">
                        {item.tips_and_tricks}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <svg
                          className="h-3.5 w-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {item.days_ago} days ago
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="mb-3 line-clamp-2 text-base font-medium text-gray-900 uppercase sm:text-[20px]">
                      {item.title}
                    </h3>

                    {/* Meta Info */}
                    <div className="mt-auto flex items-center justify-between text-xs text-gray-600">
                      <span>
                        Post By -{" "}
                        <span className="font-semibold text-[#FAA432] capitalize">
                          {item.post_by}
                        </span>
                      </span>

                      <div className="flex items-center gap-4">
                        {/* Comments */}
                        <span className="flex items-center gap-1">
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                          {item.images}
                        </span>

                        {/* Views */}
                        <span className="flex items-center gap-1">
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                          {item.viewers}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - FAQ Accordion */}
          <div>
            {/* FAQ Header */}
            <p className="mb-2 text-[15px] font-semibold tracking-wider text-[#FAA432]">
              .. {slice.primary.faq_eyebrow} ..
            </p>
            <h2 className="mb-8 text-4xl font-medium text-gray-900 uppercase md:text-[50px]">
              {slice.primary.faq_heading}
            </h2>

            {/* Accordion Items */}
            <div className="space-y-4">
              {slice.primary.faqs.map((item, index) => (
                <div
                  key={index}
                  className={`overflow-hidden rounded-lg transition-all ${
                    openIndex === index
                      ? "border border-gray-300 shadow-lg"
                      : "border-b border-gray-200"
                  }`}
                >
                  {/* Accordion Header */}
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="flex w-full items-center justify-between gap-4 p-6 text-left transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      {/* Number */}
                      <span className="price text-[18px] font-medium text-[#FAA432]">
                        {String(index + 1).padStart(2, "0")}.
                      </span>

                      {/* Question */}
                      <h3 className="font-medium text-gray-900 uppercase sm:text-[18px]">
                        {item.heading}
                      </h3>
                    </div>

                    {/* Chevron Icon */}
                    <svg
                      className={`h-5 w-5 flex-shrink-0 text-gray-500 transition-transform ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Accordion Content */}
                  {openIndex === index && (
                    <div className="border-t border-gray-200 bg-white px-6 py-4">
                      <p className="pl-10 text-sm leading-relaxed text-gray-600">
                        {item.description}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccordionFaq;
