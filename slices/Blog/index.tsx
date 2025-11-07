import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import Container from "@/componnets/Container";
import { ArrowRight, Calendar, Eye, MessageSquare } from "lucide-react";
// import { Eye, MessageSquare, Calendar, ArrowRight } from "lucide-react";

export type BlogProps = SliceComponentProps<Content.BlogSlice>;

const Blog: FC<BlogProps> = ({ slice }) => {
  return (
    <span
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full max-w-[70%]"
    >
      {slice.primary.blogs.map((item, idx) => (
        <article
          key={idx}
          className="font-roboto mb-10 max-w-[850px] overflow-hidden bg-white shadow-sm"
        >
          {/* Blog Image */}
          <div className="relative">
            <PrismicNextImage
              field={item.blog_cover}
              className="w-full object-cover"
            />
          </div>

          {/* Blog Content */}
          <div className="p-6 sm:p-8">
            {/* Tag */}
            <span className="mb-4 inline-block bg-[#0D9B4D] px-5 py-1.5 text-[12px] font-semibold text-white capitalize">
              {item.category}
            </span>

            {/* Title */}
            <h2 className="font-oswald mb-4 text-2xl font-medium text-gray-900 uppercase">
              {item.blog_title}
            </h2>

            {/* Meta Info */}
            <div className="mb-5 flex flex-wrap items-center gap-4 text-[13px] text-gray-600">
              <div className="flex items-center gap-1">
                <Eye className="mr-1 h-4 w-4 text-[#0D9B4D]" />
                <span>{item.viewa ?? "232"} Views</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageSquare className="mr-1 h-4 w-4 text-[#0D9B4D]" />
                <span>{item.comments ?? "35"} Comments</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="mr-1 h-4 w-4 text-[#0D9B4D]" />
                <span>{item.date ?? "29th July 2024"}</span>
              </div>
            </div>

            {/* Description */}
            <p className="mb-6 leading-relaxed text-gray-600">
              {item.description}
            </p>

            {/* Author and Read More */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <PrismicNextImage
                  field={item.author_image}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    By {item.author_name ?? "Savannah"}
                  </p>
                </div>
              </div>

              <PrismicNextLink
                field={item.read_more}
                className="flex items-center gap-2 text-sm font-bold text-gray-900 transition hover:text-green-600"
              >
                <ArrowRight className="h-4 w-4" />
                Read More
              </PrismicNextLink>
            </div>
          </div>
        </article>
      ))}
    </span>
  );
};

export default Blog;
