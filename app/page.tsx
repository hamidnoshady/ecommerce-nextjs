import { SectionRenderer } from "@/components/sections/section-renderer";
import { getPageBySlug } from "@/lib/api/wp-client";

export default async function HomePage() {
  const home = await getPageBySlug("home");
  return <SectionRenderer sections={home.sections} />;
}
