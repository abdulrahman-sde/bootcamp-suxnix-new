import { PrismicDocument } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import Container from "./Container";

type BlogDetailProps = {
  page: PrismicDocument;
};

export default function BlogDetail({ page }: BlogDetailProps) {
  return (
    <div className="mr-8 max-w-[70%] bg-white">
      {/* Cover Image */}
      <div className="h-[450px] overflow-hidden">
        <PrismicNextImage
          field={page.data.blog_cover}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content Wrapper */}
      <div className="px-4 py-10">
        {/* Category */}
        <p className="mb-3 inline-block rounded-md bg-green-100 px-3 py-1 text-sm font-medium text-green-600">
          {page.data.category}
        </p>

        {/* Title */}
        <h1 className="text-3xl leading-snug font-bold text-gray-900 md:text-4xl">
          {page.data.title}
        </h1>

        {/* Metadata */}
        <div className="mt-4 flex flex-wrap items-center gap-6 text-sm text-gray-500">
          {page.data.metadata.map(
            (item: { id: string; icon: any; data: string }) => (
              <div key={item.id} className="flex items-center gap-2">
                <PrismicNextImage field={item.icon} className="h-5 w-5" />
                <p>{item.data}</p>
              </div>
            ),
          )}
        </div>

        {/* Body Content */}
        <div className="prose prose-img:rounded-lg prose-p:whitespace-normal prose-img:my-6 prose-img:w-full prose-p prose-headings:font-semibold prose-headings:text-gray-900 mt-8 w-full max-w-full">
          <PrismicRichText field={page.data.content} />
        </div>

        {/* Related Tags */}
        <h3 className="mt-10 text-lg font-semibold">
          {page.data.related_tags_heading}
        </h3>
        <div className="mt-3 flex flex-wrap gap-3">
          {page.data.related_tags.map(
            (item: { tag: string }, index: number) => (
              <span
                key={index}
                className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
              >
                {item.tag}
              </span>
            ),
          )}
        </div>

        {/* Social Share */}
        <div className="mt-10 flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            {page.data.social_share_heading}
          </h3>
          <div className="flex gap-4">
            {page.data.social_links.map(
              (item: { social_link: any; social_icon: any }, index: number) => (
                <PrismicNextLink key={index} field={item.social_link}>
                  <PrismicNextImage
                    field={item.social_icon}
                    className="h-6 w-6 transition hover:opacity-75"
                  />
                </PrismicNextLink>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
