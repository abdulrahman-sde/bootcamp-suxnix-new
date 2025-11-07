"use client";

import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { CalendarIcon, Facebook, Search } from "lucide-react";

export type ProfileSidebarProps =
  SliceComponentProps<Content.ProfileSidebarSlice>;

const ProfileSidebar: FC<ProfileSidebarProps> = ({ slice }) => {
  return (
    <aside
      className={`space-y-8 ${
        slice.primary.is_blog_sidebar ? "w-[30%]" : "w-full"
      }`}
    >
      {/* ABOUT ME BLOCK */}
      <div className="border border-gray-200 p-6">
        <h2 className="mb-6 flex items-center gap-2 border-gray-300 text-xl font-semibold uppercase">
          <span className="h-5 w-[3px] bg-green-600"></span>
          {slice.primary.profile_title}
        </h2>

        <div className="flex flex-col items-center text-center">
          <PrismicNextImage
            field={slice.primary.profile_image}
            className="h-32 w-32 rounded-full object-cover"
          />
          <h3 className="mt-4 font-medium uppercase">
            {slice.primary.profile_name}
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-gray-600">
            <PrismicRichText field={slice.primary.profile_description} />
          </p>

          {/* Social Icons */}
          <div className="mt-4 flex gap-4 text-sm text-gray-500">
            {slice.primary.profile_social_links.map((link, i) => (
              <PrismicNextLink key={i} field={link}>
                <Facebook fill="#4267B2" className="w-4 hover:text-green-600" />
                <i className={`hover:text-green-600`}></i>
              </PrismicNextLink>
            ))}
          </div>
        </div>
      </div>

      {/* SEARCH BOX */}
      <div className="border border-gray-200 p-6 uppercase">
        <h2 className="mb-6 flex items-center gap-2 text-lg font-medium">
          <span className="h-5 w-[3px] bg-green-600"></span>
          {slice.primary.search_label}
        </h2>

        <div className="font-roboto flex overflow-hidden border border-gray-200">
          <input
            type="text"
            placeholder="Search your keyword..."
            className="flex-1 bg-gray-50 px-3 py-2.5 text-sm outline-none placeholder:text-[12px] placeholder:font-bold"
          />
          <button className="flex items-center justify-center bg-[#0D9B4D] px-4 py-2.5 text-white">
            <Search className="w-4" />
          </button>
        </div>
      </div>

      {/* POPULAR FEEDS */}
      <div className="border border-gray-200 p-6">
        <h2 className="mb-6 flex items-center gap-2 text-lg font-medium uppercase">
          <span className="h-5 w-[3px] bg-green-600"></span>
          Popular Feeds
        </h2>

        <div className="space-y-6">
          {slice.primary.feed_items.map((item, i) => (
            <div key={i} className="flex gap-4">
              <PrismicNextImage
                field={item.feed_image}
                className="h-20 w-20 object-cover"
              />
              <div className="flex flex-col justify-between text-sm">
                <h3 className="leading-snug font-semibold uppercase">
                  {item.feed_title}
                </h3>
                <p className="flex items-center gap-1 text-xs text-gray-500">
                  <CalendarIcon className="w-3 text-green-600" />{" "}
                  {item.feed_date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default ProfileSidebar;
