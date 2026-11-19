import type { Metadata } from "next";
import { Suspense } from "react";
import { StudioBrief } from "@/components/studio-brief";

export const metadata: Metadata = {
  title: "Заявка",
};

export default function StudioBriefPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
      <Suspense
        fallback={
          <div
            className="h-80 animate-pulse rounded-2xl bg-secondary/70"
            aria-busy="true"
          />
        }
      >
        <StudioBriefLoader params={params} />
      </Suspense>
    </div>
  );
}

async function StudioBriefLoader({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <StudioBrief id={id} />;
}
