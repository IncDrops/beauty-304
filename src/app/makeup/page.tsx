import CategoryPage from "../category/[slug]/page";

export default function MakeupPage() {
  return <CategoryPage params={{ slug: "makeup" }} />;
}
