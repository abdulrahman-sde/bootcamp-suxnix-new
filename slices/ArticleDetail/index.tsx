import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Container from "@/componnets/Container";
// import BlogDetail from "@/componnets/BlogDetail";

/**
 * Props for `ArticleDetail`.
 */
export type ArticleDetailProps =
  SliceComponentProps<Content.ArticleDetailSlice>;

/**
 * Component for "ArticleDetail" Slices.
 */
const ArticleDetail: FC<ArticleDetailProps> = ({ slice }) => {
  // console.log(slice.primary.)
  return (
    <Container
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <>hy</>
      {/* <BlogDetail detail={slice.primary} /> */}
    </Container>
  );
};

export default ArticleDetail;
