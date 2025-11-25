import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import "swiper/css";
import "swiper/css/navigation";
import RelatedProducts from "@/componnets/RelatedProducts";

export type ProductCarouselProps =
  SliceComponentProps<Content.ProductCarouselSlice>;

const ProductCarousel: FC<ProductCarouselProps> = ({ slice }) => {
  return <RelatedProducts />;
};

export default ProductCarousel;
