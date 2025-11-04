import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import Container from "@/componnets/Container";
import { Calendar, Eye, MessageSquare } from "lucide-react";
// import { Eye, MessageSquare, Calendar, ArrowRight } from "lucide-react";

export type BlogProps = SliceComponentProps<Content.BlogSlice>;

const Blog: FC<BlogProps> = ({ slice }) => {
  return (
    <Container
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
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
              className="h-[380px] w-full object-cover"
            />
          </div>

          {/* Blog Content */}
          <div className="p-6 sm:p-8">
            {/* Tag */}
            <span className="mb-4 inline-block bg-green-700 px-3 py-1 text-sm font-semibold text-white">
              {item.category}
            </span>

            {/* Title */}
            <h2 className="font-oswald mb-4 text-2xl font-medium text-gray-900 sm:text-4xl">
              {item.blog_title}
            </h2>

            {/* Meta Info */}
            <div className="mb-5 flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>{item.viewa ?? "232"} Views</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span>{item.comments ?? "35"} Comments</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
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
                className="flex items-center gap-2 text-sm font-medium text-gray-900 transition hover:text-green-600"
              >
                Read More
                {/* <ArrowRight className="h-4 w-4" /> */}
              </PrismicNextLink>
            </div>
          </div>
        </article>
      ))}
    </Container>
  );
};

export default Blog;
