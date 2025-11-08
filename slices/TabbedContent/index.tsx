"use client";
import { FC, useState } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Container from "@/componnets/Container";

/**
 * Props for `TabbedContent`.
 */
export type TabbedContentProps =
  SliceComponentProps<Content.TabbedContentSlice>;

/**
 * Component for "TabbedContent" Slices.
 */
const TabbedContent: FC<TabbedContentProps> = ({ slice }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Container
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="max-w-[400px] py-20"
    >
      {/* Tab Headers */}
      <div className="flex gap-8 border-b border-gray-200">
        {slice.primary.tabs.map((item, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`font-roboto relative pb-4 text-base font-bold transition-colors ${
              activeTab === index
                ? "text-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {item.tab_label}
            {activeTab === index && (
              <span className="f absolute right-0 bottom-0 left-0 h-0.5 bg-emerald-500" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-8 max-w-[900px]">
        <div className="prose prose-headings:text-gray-900 prose-headings:uppercase prose-headings:tracking-wide prose-headings:mb-5 prose-headings:font-medium prose-headings:text-3xl prose-p:font-roboto prose-p:text-[15px] prose-li:my-0 prose-p:text-gray-600 prose-p:leading-relaxed prose-ul:font-roboto prose-ul:text-gray-600 max-w-none">
          <PrismicRichText field={slice.primary.tabs[activeTab].body} />
        </div>
      </div>
    </Container>
  );
};

export default TabbedContent;
