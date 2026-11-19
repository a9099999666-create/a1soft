import { HomePage } from "@/components/home-page";

export default async function Page({ searchParams }: PageProps<"/">) {
  const params = await searchParams;
  const visual = typeof params.visual === "string" ? params.visual : "";
  return <HomePage visualStatic={visual === "static"} />;
}
