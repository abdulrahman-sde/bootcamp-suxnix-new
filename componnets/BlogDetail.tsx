import { PrismicDocument } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";

type BlogDetailProps = {
  page: PrismicDocument;
};

export default function BlogDetail({ page }: BlogDetailProps) {
  return (
    <div className="mr-8 w-full bg-white md:max-w-[70%]">
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
        <p className="mb-3 inline-block bg-[#0D9B4D] px-4 py-1.5 text-sm font-medium text-white">
          {page.data.category}
        </p>

        {/* Title */}
        <h1 className="text-3xl leading-snug font-bold text-gray-900 uppercase md:text-4xl">
          {page.data.title}
        </h1>

        {/* Metadata */}
        <div className="mt-4 flex flex-wrap items-center gap-6 text-sm text-gray-500">
          {page.data.metadata.map(
            (item: { id: string; icon: any; data: string }, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <PrismicNextImage field={item.icon} className="h-5 w-5" />
                <p>{item.data}</p>
              </div>
            ),
          )}
        </div>

        {/* Body Content */}
        <div className="prose prose-img:rounded-lg prose-h3:uppercase prose-p:whitespace-normal prose-img:my-6 prose-img:w-full prose-p prose-headings:font-semibold prose-headings:text-gray-900 mt-8 w-full max-w-full">
          <PrismicRichText field={page.data.content} />
        </div>

        <div className="flex flex-row justify-between">
          {/* Related Tags */}
          <div className="mt-3 flex flex-col flex-wrap gap-3">
            <h3 className="mt-10 text-lg font-semibold uppercase">
              {page.data.related_tags_heading}
            </h3>
            <div className="flex gap-4">
              {page.data.related_tags.map(
                (item: { tag: string }, index: number) => (
                  <span
                    key={index}
                    className="rounded-sm bg-gray-100 px-4 py-1 text-sm text-gray-700"
                  >
                    {item.tag}
                  </span>
                ),
              )}
            </div>
          </div>

          {/* Social Share */}
          <div className="mt-15 flex flex-col items-center justify-between">
            <h3 className="text-lg font-semibold uppercase">
              {page.data.social_share_heading}
            </h3>
            <div className="flex gap-4">
              {page.data.social_links.map(
                (
                  item: { social_link: any; social_icon: any },
                  index: number,
                ) => (
                  <PrismicNextLink key={index} field={item.social_link}>
                    <PrismicNextImage
                      field={item.social_icon}
                      className="mr-2 h-5 w-5 transition hover:opacity-75"
                    />
                  </PrismicNextLink>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
